import {createPinia} from "pinia";
import {i18n, setLocale} from "@/plugins/i18n";
import vuetify from "@/plugins/vuetify";
import {HasRolesDirective} from "@/core/directive/roles-directive";
import {HasPermissionsDirective} from "@/core/directive/permissions-directive";


async function registerPlugins(app: any) {

    setLocale("ar")


    app.directive('has-roles', HasRolesDirective);
    app.directive('has-permissions', HasPermissionsDirective);

    app.use(createPinia())
        .use(vuetify)
        .use(i18n)
}
export default registerPlugins;

