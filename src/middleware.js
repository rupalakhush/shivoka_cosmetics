import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const publicRoutesUnderApiRoute = ["/api/auth", "/api/get_products"];

export async function middleware(req) {
  const { pathname, searchParams } = req.nextUrl;

  const token = await getToken({ req, secret });

  if (pathname === "/api/unauthorized") {
    return NextResponse.next();
  }

  if (pathname === "/auth/signup" && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if ((pathname === "/profile" && !token) || pathname === "/api/auth/signin") {
    return NextResponse.redirect(new URL("/auth/signup", req.url));
  }

  if (pathname.startsWith("/api")) {
    if (
      pathname === "/api/auth/callback/google" ||
      pathname === "/api/auth/error"
    ) {
      const error = searchParams.get("error");
      if (error === "access_denied" || error === "AccessDenied") {
        console.log(`access_denied: User cancelled login or there's an issue`);
        return NextResponse.redirect(new URL("/auth/signup", req.url));
      }
    }

    if (publicRoutesUnderApiRoute.some((route) => pathname.startsWith(route))) {
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL("/api/unauthorized", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/signup",
    "/api/auth/signin",
    "/api/auth/callback/google",
    "/api/auth/error",
    "/profile",
    "/api/:path*",
    "/api/unauthorized",
  ],
};
