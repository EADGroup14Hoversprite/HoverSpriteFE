import Credentials from "@auth/core/providers/credentials";
import NextAuth from "next-auth";
import { IUser, JWTPayload } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import { API } from "@/utils/utils";
import { signInSchema } from "@/schema";
import {
  CustomAuthError,
  InvalidEmailPasswordError,
  NotExistEmail,
} from "@/types/auth-error";
import { AuthRole, UserRole } from "@/types/role";

function getUserImg(authRole: AuthRole, userRole: UserRole) {
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

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Configure one or more authentication providers
  secret: process.env.AUTH_SECRET,
  providers: [
    // ...add more providers here
    Credentials({
      authorize: async (credentials) => {
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (parsedCredentials.success) {
          const res = await API.post("/auth/sign-in", {
            emailOrPhone: credentials.emailOrPhone,
            password: credentials.password,
          }).catch(function (e) {
            if (+e.status === 401) {
              throw new InvalidEmailPasswordError();
            } else if (+e.status === 404) {
              throw new NotExistEmail();
            } else {
              throw new CustomAuthError("Internal server error");
            }
          });
          const user = await res.data;
          if (user) {
            return user;
          }
          return null;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      const user = token.dto as IUser;
      const decodeData = jwtDecode<JWTPayload>(user.accessToken);
      return {
        ...session,
        user: {
          ...user,
          authRole: decodeData.authRole,
          userRole: decodeData.userRole,
          imageUrl: getUserImg(decodeData.authRole, decodeData.userRole),
        },
      };
    },
    async authorized({ auth }) {
      return !!auth;
    },
  },
});
