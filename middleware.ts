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
    pathname.startsWith("/reset-password") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".webp")
  ) {
    return NextResponse.next();
  }

  if (!request.cookies.has("token")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } else {
    return NextResponse.next();
  }

//   if (request.nextUrl.pathname === "/preferance-flow") {
//     // TODO get flow questions
//   }
}

// export function middleware(request: NextRequest) {
//   console.log(request.cookies.has("token"));
//   if (request.cookies.has("token")) {
//     return NextResponse.next();
//   } else {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }
// }

// export const config = {
//   // how to fix the issue of this matcher did not work in production? and image not loading?
//   matcher:
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|sign-in|sign-up|login-redirect|reset-password).*)",
// };
