import postgres from "postgres"

let client: ReturnType<typeof postgres> | null = null

export function getSql() {
  if (!client) {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
    if (!connectionString) {
      throw new Error("DATABASE_URL n'est pas défini")
    }
    client = postgres(connectionString, { ssl: "require", prepare: false })
  }
  return client
}

let tableReady: Promise<void> | null = null

export function ensureTestimonialsTable(): Promise<void> {
  if (!tableReady) {
    const sql = getSql()
    tableReady = sql`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `.then(() => undefined)
  }
  return tableReady
}

export interface Testimonial {
  id: number
  name: string
  rating: number
  message: string
  status: "pending" | "approved" | "rejected"
  created_at: string
}
