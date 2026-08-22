import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main id="main-content" className="min-h-screen bg-beige-50">
      {children}
    </main>
  )
}
