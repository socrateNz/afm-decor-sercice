import { NextResponse } from "next/server"
import { listGalleryPhotos } from "@/lib/cloudinary"

export const revalidate = 300

export async function GET() {
  try {
    const photos = await listGalleryPhotos()
    return NextResponse.json(photos)
  } catch (error) {
    console.error("Erreur Cloudinary:", error)
    return NextResponse.json([])
  }
}
