import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

import { getSessionCookie } from "better-auth/cookies";
const protectedRoutes = ["/profile"];

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname } = nextUrl;
  // const session = await auth.api.getSession({ headers: req.headers }); //validation of cookie
  const session = getSessionCookie(req); // existence or presence of cookie
  const isProtectedRoute =
    protectedRoutes.includes(pathname) ||
    protectedRoutes.some((path) => pathname.startsWith(path));
  const isAuthRoute = pathname.startsWith("/auth");
  const isLoggedIn = !!session;

  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth", nextUrl));
  }
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/profile", nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
