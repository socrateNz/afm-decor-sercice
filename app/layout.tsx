import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "AFM Décor - Service | Décoration et Organisation d'Événements à Montréal",
  description:
    "AFM Décor - Service est votre partenaire de confiance pour la décoration et l'organisation d'événements à Montréal. Mariages, fiançailles, baby showers et anniversaires.",
  keywords:
    "décoration événementielle, organisation événements, mariage Montréal, baby shower, anniversaire, fiançailles",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-poppins">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
