
import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import authenticationRoutes from "@/features/authentication/routers";
import dashboardRoutes from "@/features/dashboard/routers";
import {authenticationGuard} from "@/router/guards/authentication-guard";
import {permissionGuard} from "@/router/guards/permissions-guards";
import {documentTitleGuard} from "@/router/guards/document-title-guard";


const routes: Array<RouteRecordRaw> = [
    {
        path: "/:pathMatch(.*)*",
        name: "ErrorPage",
        component: () => import("../features/error/ErrorPage.vue"),
    },
    {
        path: "",
        name: "DefaultPage",
        redirect: "/dashboard/main",
    },
    ...dashboardRoutes,
    ...authenticationRoutes
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: "active",
    scrollBehavior() {
        return {top: 0, behavior: "smooth"};
    },
});

export const guards = [
    documentTitleGuard,
    authenticationGuard,
    permissionGuard,
];

router.beforeEach(async (to, from, next) => {
    for (const guard of guards) {
        const result = await guard(to, from, next);
        if (result === true) continue;
        if (typeof result === "string") {
            return next(result);
        }
        return next(false); // إلغاء التوجيه
    }

    next();
});

export default router;
