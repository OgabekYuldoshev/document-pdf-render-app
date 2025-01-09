import { type NextRequest, NextResponse } from "next/server";
import jwt from "./lib/jwt";

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")

    if (!accessToken) {
        return NextResponse.redirect(new URL("/auth", request.url))
    }

    const validToken = await jwt.verify(accessToken.value)

    if (!validToken.success) {
        return NextResponse.redirect(new URL("/auth", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!auth|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
