import {RouteLocationNormalized, NavigationGuardNext} from "vue-router";
import {container} from "inversify-props";
export const permissionGuard = async (to: RouteLocationNormalized,
                                      _: RouteLocationNormalized,
                                      next: NavigationGuardNext): Promise<boolean> => {

  // const authService = container.get<IAuthenticationService>(AuthenticationService.key);
  // const appToRouteMeta =AppRoutes.getAsAppRoutes(to);
  //
  // const payload = await authService.decode();
  //
  // const permissions = payload.permissions;


  return true
}
