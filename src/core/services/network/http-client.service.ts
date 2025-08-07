import axios, { AxiosResponse, type AxiosRequestConfig, type AxiosInstance} from "axios";
import {appConfig} from "@/core/utils/app-config";
import responseInterceptor from "@/core/services/network/interceptors/response-interceptor";
import requestInterceptor from "@/core/services/network/interceptors/request-interceptor";

class HttpClientService {
  private readonly axios: AxiosInstance;

  constructor() {
      // alert(appConfig.apiConfig.baseUrl);
    this.axios = axios.create({
      baseURL: "https://jsonplaceholder.typicode.com/posts",
      // baseURL: appConfig.apiConfig.baseUrl,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    requestInterceptor(this.axios).then();
    responseInterceptor(this.axios).then();

  }

  public get instance(): AxiosInstance {
    return this.axios;
  }

  public request<T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.request(config);
  }

  public get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.get(url, config);
  }

  public delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.delete(url, config);
  }

  public post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.post(url, data, config);
  }

  public put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.put(url, data, config);
  }

  public patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.patch(url, data, config);
  }

  public head<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.head(url, config);
  }

  public options<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axios.options(url, config);
  }

}

export const httpClient = new HttpClientService();
