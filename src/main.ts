import { createApp } from "vue";
import App from "./App.vue";
    import router from "@/router/index";
// import VueApexCharts from "vue3-apexcharts";
import { QuillEditor } from "@vueup/vue-quill";

// Import styles
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "remixicon/fonts/remixicon.css";

import "./../public/assets/scss/styles.css";
import "./../public/assets/scss/custom.scss";
import registerPlugins from "@/plugins";


import '@/core/extensions/index';


await bootstrap();


async function bootstrap() {
    try {
        const app = createApp(App);
        app.use(router);
        await registerPlugins(app);
        app.component("QuillEditor", QuillEditor);
        app.mount("#app");




    } catch (error) {
        console.error('Failed to initialize application:', error);
    }
}


