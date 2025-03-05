// import { NextResponse, NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//     const path = request.nextUrl.pathname;

//     const isPublicPath =
//         path === "/login" || path === "/signup" || path === "/verifyemail" || path === "/";

//     const token = request.cookies.get("token")?.value || "";

//     if (isPublicPath && token) {
//         return NextResponse.redirect(new URL("/profile", request.nextUrl));
//     }

//     if (!isPublicPath && !token) {
//         return NextResponse.redirect(new URL("/login", request.nextUrl));
//     }
// }

// export const config = {
//     matcher: ["/", "/profile/:path*", "/login", "/signup", "/verifyemail"],
// };

//FIXME: for rdeployment


import { NextResponse, NextRequest } from "next/server";

// Define the matcher configuration
export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup", "/verifyemail"],
};

// Remove the runtime declaration - it's causing issues
// export const runtime = 'experimental-edge';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || 
    path === "/signup" || 
    path === "/verifyemail" || 
    path === "/";

  // Get the token safely
  const token = request.cookies.get("token")?.value || "";

  // Use nextUrl instead of url for redirects
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}