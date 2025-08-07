/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: ImportMetaEnv
}
interface ImportMetaEnv {
    VUE_APP_API_URL?: string;
    VUE_APP_API_VERSION?: string;
    VUE_APP_APP_NAME?: string;
    VUE_APP_APP_DESC?: string;
    VUE_APP_APP_VERSION?: string;
}
