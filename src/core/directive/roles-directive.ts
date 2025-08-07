import {DirectiveBinding} from 'vue';
import {authenticationService} from "@/core/services/authentications/authentication.service";

export const HasRolesDirective = {
  async mounted(el: HTMLElement, binding: DirectiveBinding) {
    const user = await authenticationService.user;
    const {arg, value} = binding;

    let hasRole = false;
    if (value instanceof Array) {
      hasRole = hasRequired(user?.roles, value, arg ?? "all")
    } else {
      hasRole = hasRequired(user?.roles, [value],
        arg ?? "all")
    }
    if (!hasRole)
      el.remove()
  },

};

function hasRequired(userRoles : any, requiredRoles : any, strategy = 'any') {

  const user = Array.isArray(userRoles) ? userRoles : [];
  const required = Array.isArray(requiredRoles) ? requiredRoles : [];

  if (user.length === 0) return true;

  if (strategy.toLowerCase() === 'all' && (user.length !== required.length)) {
    return false;
  }

  switch (strategy.toLowerCase()) {
    case 'any':
      return required.some(role => user.includes(role));
    case 'all': {
      return required.every(role => user.includes(role));
    }
    default:
      console.warn('إستراتيجية غير صالحة. يجب أن تكون "any" أو "all".');
      return false;
  }
}
