import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Poppins } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

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

const siteUrl = "https://afm-decor-sercice.vercel.app"
const title = "AFM Décor - Service | Décoration et Organisation d'Événements à Montréal"
const description =
  "AFM Décor - Service est votre partenaire de confiance pour la décoration et l'organisation d'événements à Montréal. Mariages, fiançailles, baby showers et anniversaires."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords:
    "décoration événementielle, organisation événements, mariage Montréal, baby shower, anniversaire, fiançailles",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: siteUrl,
    siteName: "AFM Décor - Service",
    title,
    description,
    images: [
      {
        url: "/elegant-wedding-flowers-lights.png",
        width: 1200,
        height: 630,
        alt: "AFM Décor - Service - Décoration d'événement élégante",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/elegant-wedding-flowers-lights.png"],
  },
  generator: "v0.dev",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "AFM Décor - Service",
  description,
  url: siteUrl,
  telephone: ["+15146227230", "+14383964070"],
  email: "afm.decor.service@gmail.com",
  image: `${siteUrl}/elegant-wedding-flowers-lights.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Montréal",
    addressRegion: "QC",
    addressCountry: "CA",
  },
  areaServed: "Grand Montréal",
  sameAs: [
    "https://www.instagram.com/afm_decor_service",
    "https://www.facebook.com/share/1JUvixQ6mJ/",
    "https://www.tiktok.com/@afmdecorservice",
    "https://www.threads.com/@afm_decor_service",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-poppins">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:top-2 focus:left-2 focus:bg-amber-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Aller au contenu principal
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
