import { cookies } from "next/headers"
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth"

/** Renvoie l'email de la session admin en cours, ou null si non authentifié. */
export async function getSessionEmail(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!token) return null
  return verifySessionToken(token)
}
