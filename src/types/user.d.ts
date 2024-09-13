import { Expertise } from "@/types/expertise";
import { AuthRole } from "@/types/role";

export interface IUser {
  id: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  homeAddress: Location;
  expertise?: Expertise | undefined;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  authRole: "ROLE_USER" | "ROLE_ADMIN";
  userRole: "ROLE_FARMER" | "ROLE_RECEPTIONIST" | "ROLE_SPRAYER";
  accessToken: string;
}

export interface ResIUser {
  message: string;
  error?: string;
  dto: IUser;
}

export interface JWTPayload {
  authRole: AuthRole;
  userRole: UserRole;
  sub: string;
  iat: number;
  exp: number;
}
