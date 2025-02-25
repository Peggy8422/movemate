import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log(request.cookies.has("token"));
  if (request.cookies.has("token")) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  // how to fix the issue of this matcher did not work in production? and image not loading?
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|sign-in|sign-up|login-redirect|reset-password).*)",
};
