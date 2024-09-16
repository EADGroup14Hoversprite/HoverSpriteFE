import { jwtDecode } from "jwt-decode";
import { JWTPayload } from "@/types/user";
import { UserRole } from "@/types/role";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedPath = ["/booking", "/orders", "/dashboard"];
const authPath = ["/auth/login", "auth/signup"];
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionToken = req.cookies.get("sessionToken");
  if (protectedPath.some((path) => pathname.startsWith(path))) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL("auth/login", req.url));
    }
  }
  if (authPath.some((path) => pathname.startsWith(path)) && sessionToken) {
    const decodeData = jwtDecode<JWTPayload>(sessionToken.value);
    if (decodeData.userRole === UserRole.ROLE_FARMER) {
      return NextResponse.redirect(new URL("/orders", req.url));
    }
    if (decodeData.userRole === UserRole.ROLE_SPRAYER) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
