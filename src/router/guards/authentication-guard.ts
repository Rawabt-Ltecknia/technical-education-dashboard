// roles.guard.ts
import {RouteLocationNormalized, NavigationGuardNext} from "vue-router";
import {authenticationService} from "@/core/services/authentications/authentication.service";

export const authenticationGuard = async (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
): Promise<void> => {
    if (to.name === "sign-in" || to.meta?.guest || !to.meta?.requiresAuth) {
        next();
        return;
    }

    const isAuthenticated = await authenticationService.isAuthenticated()
    if (isAuthenticated) {
        // if (!isAuthenticated) {
        next({name: "sign-in"});
        return;
    }


    const userRoles = ["Test"];
    let reqRoles = to.meta?.roles
    // || ["Test1", "Test2", "Test3"];
    if (!reqRoles) {
        next();
        return;
    }
    if (typeof reqRoles === "string") {
        reqRoles = [reqRoles];
    }

    if (!hasRequired(userRoles, reqRoles)) {
        console.warn("Access denied. Redirecting to sign-in.");
        next({name: "sign-in"});
        return;
    }

    next();
};


const hasRequired = (userRoles: string[], requiredRoles: any, strategy = "any") => {
    const required = Array.isArray(requiredRoles) ? requiredRoles : [];
    if (userRoles.length === 0) return false;

    if (strategy.toLowerCase() === "any") {
        return required.some((role) => userRoles.includes(role));
    }

    if (strategy.toLowerCase() === "all") {
        return required.every((role) => userRoles.includes(role));
    }

    return false;
};
