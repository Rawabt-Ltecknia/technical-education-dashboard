import {RouteRecordRaw} from "vue-router";


const authenticationRoutes: Array<RouteRecordRaw> = [

    {
        path: "/authentication",
        name: "authentication",
        redirect: "/authentication/sign-in",
        children: [
            {
                path: "sign-in",
                name: "sign-in",
                component: () => import("./sign-in/pages/SignInPage.vue"),
            }
        ]
    }


];
export default authenticationRoutes;

