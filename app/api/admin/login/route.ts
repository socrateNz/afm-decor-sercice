import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "@/lib/auth"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

  if (!adminEmail || !adminPasswordHash) {
    return NextResponse.json({ error: "Configuration admin manquante." }, { status: 500 })
  }

  const isValidEmail = typeof email === "string" && email.toLowerCase() === adminEmail.toLowerCase()
  const isValidPassword =
    typeof password === "string" && (await bcrypt.compare(password, adminPasswordHash))

  if (!isValidEmail || !isValidPassword) {
    return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 })
  }

  const token = await createSessionToken(adminEmail)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  })

  return NextResponse.json({ ok: true })
}
