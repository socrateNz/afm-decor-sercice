import { SignJWT } from "jose/jwt/sign"
import { jwtVerify } from "jose/jwt/verify"

export const SESSION_COOKIE_NAME = "afm_admin_session"
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 jours

function getSecretKey() {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error("AUTH_SECRET n'est pas défini")
  }
  return new TextEncoder().encode(secret)
}

export async function createSessionToken(email: string): Promise<string> {
  return new SignJWT({ sub: email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getSecretKey())
}

export async function verifySessionToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    return typeof payload.sub === "string" ? payload.sub : null
  } catch {
    return null
  }
}
