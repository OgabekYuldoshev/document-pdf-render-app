import { type NextRequest, NextResponse } from "next/server";
import jwt from "./lib/jwt";

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")

    const isAuthUrl = request.url.endsWith('/auth')

    if (isAuthUrl) {
        if (accessToken) {
            const validToken = await jwt.verify(accessToken.value)
            if (!validToken.success) {
                request.cookies.delete("accessToken")
                return NextResponse.next()
            }
            return NextResponse.redirect(new URL("/", request.url))
        }
        return NextResponse.next()
    }

    if (!accessToken) {
        return NextResponse.redirect(new URL("/auth", request.url))
    }

    const validToken = await jwt.verify(accessToken.value)

    if (!validToken.success) {
        request.cookies.delete("accessToken")
        return NextResponse.redirect(new URL("/auth", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
