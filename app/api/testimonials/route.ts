import { NextResponse } from "next/server"
import { ensureTestimonialsTable, getSql, type Testimonial } from "@/lib/db"

const MAX_NAME_LENGTH = 80
const MAX_MESSAGE_LENGTH = 600

export async function GET() {
  try {
    await ensureTestimonialsTable()
    const sql = getSql()
    const rows = await sql<Testimonial[]>`
      SELECT id, name, rating, message, status, created_at
      FROM testimonials
      WHERE status = 'approved'
      ORDER BY created_at DESC
      LIMIT 30
    `
    return NextResponse.json(rows)
  } catch (error) {
    console.error("Erreur lecture témoignages:", error)
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 })
  }

  const { name, rating, message, website } = body as {
    name?: unknown
    rating?: unknown
    message?: unknown
    website?: unknown
  }

  // Honeypot : un champ que seuls les bots remplissent. On feint le succès sans rien enregistrer.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true })
  }

  if (typeof name !== "string" || name.trim().length === 0 || name.trim().length > MAX_NAME_LENGTH) {
    return NextResponse.json({ error: "Le nom est requis (80 caractères maximum)." }, { status: 400 })
  }
  if (typeof message !== "string" || message.trim().length === 0 || message.trim().length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: "Le message est requis (600 caractères maximum)." },
      { status: 400 }
    )
  }
  if (typeof rating !== "number" || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "La note doit être comprise entre 1 et 5." }, { status: 400 })
  }

  try {
    await ensureTestimonialsTable()
    const sql = getSql()
    await sql`
      INSERT INTO testimonials (name, rating, message, status)
      VALUES (${name.trim()}, ${rating}, ${message.trim()}, 'pending')
    `
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Erreur enregistrement témoignage:", error)
    return NextResponse.json({ error: "Une erreur est survenue. Réessaie plus tard." }, { status: 500 })
  }
}
