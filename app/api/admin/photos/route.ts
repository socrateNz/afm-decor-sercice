import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { getSessionEmail } from "@/lib/session"
import cloudinary, { GALLERY_TAG } from "@/lib/cloudinary"

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024 // 8 Mo

export async function POST(request: Request) {
  const email = await getSessionEmail()
  if (!email) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file")
  const alt = formData.get("alt")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 })
  }
  if (typeof alt !== "string" || alt.trim().length === 0) {
    return NextResponse.json({ error: "La description de la photo est requise." }, { status: 400 })
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Le fichier doit être une image." }, { status: 400 })
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json({ error: "L'image dépasse la taille maximale de 8 Mo." }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  const uploadResult = await new Promise<{ public_id: string; secure_url: string }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: GALLERY_TAG,
        tags: [GALLERY_TAG],
        context: { alt: alt.trim() },
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Échec de l'upload Cloudinary."))
          return
        }
        resolve(result)
      }
    )
    uploadStream.end(buffer)
  })

  revalidatePath("/api/gallery/photos")

  return NextResponse.json({
    publicId: uploadResult.public_id,
    url: uploadResult.secure_url,
    alt: alt.trim(),
  })
}
