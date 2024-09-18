import { jwtDecode } from "jwt-decode";
import { JWTPayload } from "@/types/user";
import { getRoleString } from "@/types/role";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedPath = [
  "/farmer/booking",
  "/farmer/orders",
  "/receptionist/dashboard",
  "/sprayer/route",
  "/sprayer/order-history",
  "/sprayer/assign-orders",
];
const authPath = ["/auth/login", "auth/signup"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionToken = req.cookies.get("sessionToken");
  if (
    protectedPath.some((path) => pathname.startsWith(path)) &&
    !sessionToken
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (authPath.some((path) => pathname.startsWith(path)) && sessionToken) {
    const decodeData = jwtDecode<JWTPayload>(sessionToken.value);
    const currentRole = decodeData.userRole;
    return NextResponse.redirect(
      new URL(`/${getRoleString(currentRole)}`, req.url),
    );
  }

  if (protectedPath.some((path) => pathname.startsWith(path))) {
    if (sessionToken) {
      const urlElements = pathname.split("/");
      const decodeData = jwtDecode<JWTPayload>(sessionToken.value);
      const currentRole = decodeData.userRole;
      if (getRoleString(currentRole) !== urlElements[1]) {
        return NextResponse.rewrite(
          new URL(`/${getRoleString(currentRole)}`, req.url),
        );
      }
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
