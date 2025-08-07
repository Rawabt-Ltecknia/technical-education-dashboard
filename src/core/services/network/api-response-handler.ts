import  { AxiosResponse ,AxiosError} from "axios";

import {ApiPagedResponse, ApiResponse} from "@/core/domain/api-response";


export class ApiResponseHandler {

    static pagedNormalizeResponse<T>(
        response: AxiosResponse<ApiPagedResponse<T>> | ApiPagedResponse<T>
    ): ApiPagedResponse<T> {
        return this.pagedIsAxiosResponse(response) ? response.data : response;
    }


    static handleResponse<T>(
        response: AxiosResponse<ApiResponse<T>> | ApiResponse<T>
    ): ApiResponse<T> {
        if (this.isAxiosResponse(response)) {
            if (response.status >= 200 && response.status < 300)
                return this.getRequiredData(response.data);
            throw new Error('No data available in response');
        } else {
            return response;
        }
    }

    static pagedHandleResponse<T>(
        response: AxiosResponse<ApiPagedResponse<T>> | ApiPagedResponse<T>
    ): ApiPagedResponse<T> {
        const apiResponse = this.pagedNormalizeResponse(response);

        if (this.isAxiosResponse(response)) {
            if (response.status >= 200 && response.status < 300)
                return this.pagedGetRequiredData(apiResponse);
            throw new Error('No data available in response');
        } else {
            return apiResponse;
        }
    }

    static handleError(error: any): ApiResponse {
        if (this.isApiResponse(error)) {
            return error;
        }

        return {
            traceId: "UNKNOWN",
            message: this.getErrorMessage(error),
            additionalData: new Map(),
        };
    }

    static getData<T>(response: ApiResponse<T>): T | undefined {
        return response.content;
    }

    static getRequiredData<T>(response: ApiResponse<T>): ApiResponse<T> {
        if (!response.content) {
            throw new Error('No data available in response');
        }
        return response;
    }

    static pagedGetRequiredData<T>(response: ApiPagedResponse<T>): ApiPagedResponse<T> {
        if (!response.content) {
            throw new Error('No data available in response');
        }
        return response;
    }

    static getMessage(response: ApiResponse): string | undefined {
        return response.message;
    }

    // تحويل الـ Map إلى object لسهولة الاستخدام
    static additionalDataToObject(response: ApiResponse): Record<string, any> {
        return Object.fromEntries(response.additionalData);
    }

    // private helpers
    private static isAxiosResponse(
        response: any
    ): response is AxiosResponse<ApiResponse> {
        return (response as AxiosResponse).config !== undefined;
    }

    private static pagedIsAxiosResponse(
        response: any
    ): response is AxiosResponse<ApiPagedResponse> {
        return (response as AxiosResponse).config !== undefined;
    }

    private static isApiResponse(error: any): error is ApiResponse {
        return error && typeof error === 'object' && 'traceId' in error && 'statusCode' in error;
    }

    private static generateTraceId(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    private static getErrorMessage(error: any): string {
        if (error instanceof AxiosError) {
            return error.response?.data?.message || error.message;
        }
        if (error instanceof Error) {
            return error.message;
        }
        return 'Unknown error occurred';
    }

    private static getErrorStatusCode(error: any): number {
        if (error instanceof AxiosError) {
            return error.response?.status || 500;
        }
        return 500;
    }
}
