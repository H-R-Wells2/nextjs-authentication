import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/","/dashboard/:path*", "/admin/:path*", "/profile"],
};
