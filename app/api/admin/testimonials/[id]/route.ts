import { NextResponse } from "next/server"
import { getSessionEmail } from "@/lib/session"
import { ensureTestimonialsTable, getSql } from "@/lib/db"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const email = await getSessionEmail()
  if (!email) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json().catch(() => null)
  const status = body?.status

  if (status !== "approved" && status !== "rejected") {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 })
  }

  await ensureTestimonialsTable()
  const sql = getSql()
  await sql`UPDATE testimonials SET status = ${status} WHERE id = ${id}`

  return NextResponse.json({ ok: true })
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const email = await getSessionEmail()
  if (!email) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 })
  }

  const { id } = await params

  await ensureTestimonialsTable()
  const sql = getSql()
  await sql`DELETE FROM testimonials WHERE id = ${id}`

  return NextResponse.json({ ok: true })
}
