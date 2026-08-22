import type { Metadata } from "next"
import Gallery from "@/components/gallery"

export const metadata: Metadata = {
  title: "Galerie | AFM Décor - Service",
  description:
    "Découvrez nos réalisations en photos et vidéos : mariages, fiançailles, baby showers et anniversaires décorés par AFM Décor - Service à Montréal.",
  alternates: {
    canonical: "/galerie",
  },
}

export default function GaleriePage() {
  return <Gallery />
}
