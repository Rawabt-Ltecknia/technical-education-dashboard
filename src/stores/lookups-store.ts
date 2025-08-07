import {defineStore} from "pinia";
import {ref} from "vue";
import {OfficeTypeLookupResponse} from "@/repositories/lookups/lookup-models";
import {lookupRepository} from "@/repositories/lookups/lookup-repository";
import {ApiResponse} from "@/core/domain/api-response";


export const useLookupsStore = defineStore('lookups', () => {

    const officeTypes = ref<ApiResponse<OfficeTypeLookupResponse[]> | null>(null);

    async function loadOfficeTypesLookups(forceRefresh: boolean = false): Promise<void> {
        // if (forceRefresh || !officeTypes.value?.content.length <= 0) {
            officeTypes.value = await lookupRepository.getOfficeTypesLookups();
        // }
    }

});
