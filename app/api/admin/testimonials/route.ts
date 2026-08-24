import { NextResponse } from "next/server"
import { getSessionEmail } from "@/lib/session"
import { ensureTestimonialsTable, getSql, type Testimonial } from "@/lib/db"

export async function GET() {
  const email = await getSessionEmail()
  if (!email) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 })
  }

  await ensureTestimonialsTable()
  const sql = getSql()
  const rows = await sql<Testimonial[]>`
    SELECT id, name, rating, message, status, created_at
    FROM testimonials
    ORDER BY (status = 'pending') DESC, created_at DESC
  `
  return NextResponse.json(rows)
}
