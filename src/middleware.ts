import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    /* extract the path from the URL.
    For example: https://youtube.com/profile/setting, path will be /profile/setting */
    const path = request.nextUrl.pathname;

    const isPublicPath =
        path === "/login" ||
        path === "/signup" ||
        path === "/verifyemail" ||
        path === "/";

    // Get the token from the cookie named "token"
    const token = request.cookies.get("token")?.value || "";

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/profile", request.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

export const config = {
    matcher: ["/", "/profile/:path*", "/login", "/signup", "/verifyemail"],
};
