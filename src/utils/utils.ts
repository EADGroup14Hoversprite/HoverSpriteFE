import { AuthRole, UserRole } from "@/types/role";

export function getUserImg(authRole: AuthRole, userRole: UserRole) {
  switch (authRole) {
    case AuthRole.ROLE_USER:
      switch (userRole) {
        case UserRole.ROLE_FARMER:
          return "/avatar/farmer.png";
        case UserRole.ROLE_RECEPTIONIST:
          return "/avatar/receptionist.png";
        case UserRole.ROLE_SPRAYER:
          return "/avatar/sprayer.png";
        default:
          return "/avatar/farmer.png";
      }
    case AuthRole.ROLE_ADMIN:
      return "/avatar/admin.png";
  }
}
