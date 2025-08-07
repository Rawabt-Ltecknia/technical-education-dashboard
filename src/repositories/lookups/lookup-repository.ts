import {OfficeTypeLookupResponse} from "@/repositories/lookups/lookup-models";
import {httpClient} from "@/core/services/network/http-client.service";
import {ApiResponse} from "@/core/domain/api-response";


export class LookupRepository {

    async getOfficeTypesLookups() : Promise<ApiResponse<OfficeTypeLookupResponse[]>>{
        const {data} = await  httpClient.get<ApiResponse<OfficeTypeLookupResponse[]>>("/api/lookups/office-types");
        return data
    }


}

export const lookupRepository = new LookupRepository();
