import {DirectiveBinding} from 'vue';
import {authenticationService} from "@/core/services/authentications/authentication.service";



export const HasPermissionsDirective = {
  async mounted(el: HTMLElement, binding: DirectiveBinding) {
    const user = await authenticationService.user;
    const {arg, value} = binding;

    let hasPermissions = false;
    if (value instanceof Array) {
      hasPermissions = hasRequired(user?.roles, value, arg ?? "all")
    } else {
      hasPermissions = hasRequired(user?.roles, [value],
        arg ?? "all")
    }
    if (!hasPermissions)
      el.remove()

  },

};


function hasRequired(userPermissions : any, requiredPermissions : any, strategy = 'any') {

  const userPerms = Array.isArray(userPermissions) ? userPermissions : [];
  const required = Array.isArray(requiredPermissions) ? requiredPermissions : [];

  if (userPerms.length === 0) return true;

  if (strategy.toLowerCase() === 'all' && (userPerms.length !== required.length)) {
    return false;
  }

  switch (strategy.toLowerCase()) {
    case 'any':
      return required.some(role => userPerms.includes(role));
    case 'all': {
      return required.every(role => userPerms.includes(role));
    }
    default:
      console.warn('إستراتيجية غير صالحة. يجب أن تكون "any" أو "all".');
      return false;
  }
}
