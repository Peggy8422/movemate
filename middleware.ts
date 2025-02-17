import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // console.log("Middleware Path:", request.nextUrl.pathname); // 記錄請求路徑
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/login-redirect") ||
    pathname.startsWith("/reset-password")
  ) {
    return NextResponse.next();
  }

  if (!request.cookies.has("token")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } else {
    return NextResponse.next();
  }
}

// export const config = {
//   matcher: [
//     "/((?!api/|_next/|favicon.ico|sitemap.xml|robots.txt|sign-in|sign-up|login-redirect|reset-password).*)",
//   ],
// };
