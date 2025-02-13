import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.cookies.has("token")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } else {
    return NextResponse.next();
  }

//   if (request.nextUrl.pathname === "/preferance-flow") {
//     // TODO get flow questions
//   }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|sign-in|sign-up|login-redirect|reset-password).*)",
  ],
};
