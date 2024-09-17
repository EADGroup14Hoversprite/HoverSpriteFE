import { Expertise } from "@/types/expertise";
import { AuthRole, UserRole } from "@/types/role";
import { ILocation } from "@/types/location";

export interface IUser {
  id: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  homeAddress: string;
  expertise?: Expertise | undefined;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  authRole: "ROLE_USER" | "ROLE_ADMIN";
  userRole: "ROLE_FARMER" | "ROLE_RECEPTIONIST" | "ROLE_SPRAYER";
  accessToken: string;
  googleId: string | null;
  facebookId: string | null;
  location: ILocation;
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
