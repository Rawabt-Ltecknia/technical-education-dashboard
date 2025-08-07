import {RouteRecordRaw} from "vue-router";
import defaults from "@/plugins/vuetify/defaults";


const dashboardRoutes: Array<RouteRecordRaw> = [

    {
        path: "/dashboard",
        name: "dashboard",
        redirect: "/dashboard/main",
        meta: {requiresAuth: true},
        children: [
            {
                path: "main",
                name: "main-page",
                component: () => import("./main/pages/MainPage.vue"),
                meta :{
                    requiresAuth :true,
                    // guest:false,
                    roles:["Test"]
                }
            },
            {
                path: "demos",
                name: "DemosPage",
                component: () => import("./../z-demo/Demos.vue"),
            }
        ]
    }
];
export default dashboardRoutes;

