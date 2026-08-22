import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { getSessionEmail } from "@/lib/session"
import cloudinary from "@/lib/cloudinary"

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ publicId: string[] }> }
) {
  const email = await getSessionEmail()
  if (!email) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 })
  }

  const { publicId: segments } = await params
  const publicId = segments.join("/")

  await cloudinary.uploader.destroy(publicId)

  revalidatePath("/api/gallery/photos")

  return NextResponse.json({ ok: true })
}
