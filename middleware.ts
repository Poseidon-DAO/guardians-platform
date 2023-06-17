import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isConnected = request.cookies.get("userId")?.value;

  if (
    (pathname.startsWith("/analytics") ||
      pathname.startsWith("/collection") ||
      pathname.startsWith("/my-votes")) &&
    !isConnected
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
