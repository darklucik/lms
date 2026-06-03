import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/api/webhook"],
  afterAuth(auth, req) {
    const url = req.nextUrl;

    // If user is logged in and on sign-in/sign-up page, hard redirect to home
    if (auth.userId && (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up"))) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // If not logged in and on protected route, redirect to sign-in
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
