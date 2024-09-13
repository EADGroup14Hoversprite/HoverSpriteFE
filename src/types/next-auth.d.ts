import { DefaultSession } from "next-auth";
import { IUser, ResIUser } from "@/types/user";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    access_token: string;
    refresh_token: string;
    user: ResIUser & DefaultSession["user"];
    access_expire: number;
    error: string;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IUser & DefaultSession["user"];
    access_token: string;
    refresh_token: string;
    access_expire: number;
    error: string;
  }
}
