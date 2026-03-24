import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token");

    const { pathname } = req.nextUrl;

    const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

    // Not authenticated → redirect to login
    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Authenticated → prevent access to auth pages
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Protect all routes except:
         * - API routes
         * - static files
         * - Next internals
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};