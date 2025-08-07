import {RouteLocationNormalized} from "vue-router";
import {appConfig} from "@/core/utils/app-config";

export const documentTitleGuard = async (
    to: RouteLocationNormalized
): Promise<boolean> => {
    const appName = appConfig.appInformationConfig.appName;
    const pageTitle = to.meta?.title ? to.meta.title +" | " +appName: (appConfig.appInformationConfig.appName);
    document.title = pageTitle + " " + appConfig.apiConfig.version
    return true;
};
