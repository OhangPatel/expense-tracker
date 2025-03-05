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

export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup", "/verifyemail"],
};

// Explicitly specify the runtime
export const runtime = 'edge';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || 
    path === "/signup" || 
    path === "/verifyemail" || 
    path === "/";

  // Get the token more safely
  const token = request.cookies.get("token")?.value ?? "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}