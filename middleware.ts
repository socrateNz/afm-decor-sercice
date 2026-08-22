import { NextRequest, NextResponse } from "next/server"
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value
  const email = token ? await verifySessionToken(token) : null
  const isAuthenticated = email !== null
  const isLoginPage = pathname === "/admin/login"

  if (isLoginPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
    return NextResponse.next()
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
