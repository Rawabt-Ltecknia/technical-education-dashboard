import {defineStore} from "pinia";
import {translation} from "@/plugins/i18n";

export interface LoadingState {
    loading: boolean;
    loadingMessage: string | null;
}

export const useLoadingStore = defineStore('loading', {
    state: (): LoadingState => ({
        loading: false,
        loadingMessage: translation("LOADING"),
    }),

    actions: {
        async start(loadingMessage: string | null = null) {
            this.loading = true;
            if (!loadingMessage) {
                loadingMessage = translation("LOADING");
            }else {
                this.loadingMessage = loadingMessage;
            }
        },
        async stop() {
            this.loading = false;
        }
    }
});
