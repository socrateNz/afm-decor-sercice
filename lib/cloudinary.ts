import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export const GALLERY_TAG = "afm-gallery"

export interface GalleryPhoto {
  publicId: string
  url: string
  alt: string
}

export async function listGalleryPhotos(): Promise<GalleryPhoto[]> {
  const result = await cloudinary.api.resources_by_tag(GALLERY_TAG, {
    context: true,
    max_results: 100,
  })

  return result.resources.map((resource: any) => ({
    publicId: resource.public_id,
    url: resource.secure_url as string,
    alt: resource.context?.custom?.alt ?? "",
  }))
}

export default cloudinary
