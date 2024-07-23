// middleware.ts

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {
    const session = await auth()
    const user = session?.user
    const { pathname } = req.nextUrl;

    // Define protected routes
    const protectedRoutes = ["/admin", "/profile", "/settings"];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    const prev = req.headers.get("referer")

    // If the route is protected and there's no token, redirect to sign in
    if (isProtectedRoute && !user) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // If the user does not have the required role, redirect to home
    if (user && pathname.startsWith("/admin") && user.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
    }
    // If the user signed in , and try to access login or register route
    if (user && (pathname.startsWith("/login") || pathname.startsWith("register"))) {
        if (user.role === "ADMIN") {
            return NextResponse.redirect(new URL("/admin", req.url))
        } else return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/profile/:path*", "/settings/:path*", "/login"], // Protect these routes
};
