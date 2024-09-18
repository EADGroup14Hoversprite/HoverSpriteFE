export enum AuthRole {
  ROLE_USER = "ROLE_USER",
  ROLE_ADMIN = "ROLE_ADMIN",
}

export enum UserRole {
  ROLE_FARMER = "ROLE_FARMER",
  ROLE_RECEPTIONIST = "ROLE_RECEPTIONIST",
  ROLE_SPRAYER = "ROLE_SPRAYER",
}

const dictRoleString: Record<string, string> = {
  ROLE_FARMER: "farmer",
  ROLE_RECEPTIONIST: "receptionist",
  ROLE_SPRAYER: "sprayer",
};

export function getRoleString(userRole: UserRole) {
  return dictRoleString[userRole];
}
