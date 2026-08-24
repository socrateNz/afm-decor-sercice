"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface GalleryPhoto {
  publicId: string
  url: string
  alt: string
}

export default function PhotoManager() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [files, setFiles] = useState<File[]>([])
  const [alt, setAlt] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ done: number; total: number } | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const loadPhotos = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/gallery/photos", { cache: "no-store" })
      const data = await res.json()
      setPhotos(Array.isArray(data) ? data : [])
    } catch {
      toast.error("Impossible de charger les photos.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadPhotos()
  }, [])

  const removeSelectedFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (files.length === 0) {
      toast.error("Choisis au moins une image à envoyer.")
      return
    }

    setIsUploading(true)
    setUploadProgress({ done: 0, total: files.length })

    const failedFiles: string[] = []

    for (const currentFile of files) {
      try {
        const formData = new FormData()
        formData.append("file", currentFile)
        formData.append("alt", alt)

        const res = await fetch("/api/admin/photos", { method: "POST", body: formData })
        if (!res.ok) failedFiles.push(currentFile.name)
      } catch {
        failedFiles.push(currentFile.name)
      } finally {
        setUploadProgress((prev) => (prev ? { ...prev, done: prev.done + 1 } : prev))
      }
    }

    const successCount = files.length - failedFiles.length
    if (successCount > 0) {
      toast.success(
        successCount === 1 ? "Photo ajoutée à la galerie." : `${successCount} photos ajoutées à la galerie.`
      )
    }
    if (failedFiles.length > 0) {
      toast.error(`Échec de l'envoi pour : ${failedFiles.join(", ")}`)
    }

    setFiles([])
    setAlt("")
    const fileInput = document.getElementById("photo-file") as HTMLInputElement | null
    if (fileInput) fileInput.value = ""
    setIsUploading(false)
    setUploadProgress(null)
    await loadPhotos()
  }

  const handleDelete = async (publicId: string) => {
    setDeletingId(publicId)
    try {
      const path = publicId.split("/").map(encodeURIComponent).join("/")
      const res = await fetch(`/api/admin/photos/${path}`, { method: "DELETE" })

      if (!res.ok) {
        toast.error("Échec de la suppression.")
        return
      }

      toast.success("Photo supprimée.")
      setPhotos((prev) => prev.filter((p) => p.publicId !== publicId))
    } catch {
      toast.error("Une erreur est survenue pendant la suppression.")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <form
        onSubmit={handleUpload}
        className="mb-10 grid gap-4 rounded-lg border bg-white p-6 shadow-sm sm:grid-cols-[1fr_1fr_auto] sm:items-end"
      >
        <div>
          <Label htmlFor="photo-file" className="mb-1 block">
            Photos
          </Label>
          <Input
            id="photo-file"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            required
          />
          {files.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-2">
              {files.map((f, index) => (
                <li
                  key={`${f.name}-${index}`}
                  className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs text-gray-700"
                >
                  {f.name}
                  <button
                    type="button"
                    onClick={() => removeSelectedFile(index)}
                    aria-label={`Retirer ${f.name}`}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <Label htmlFor="photo-alt" className="mb-1 block">
            Description
          </Label>
          <Input
            id="photo-alt"
            type="text"
            placeholder="Ex: Décoration de mariage au Château Vaudreuil"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            required
          />
          {files.length > 1 && (
            <p className="mt-1 text-xs text-gray-500">
              Cette description sera appliquée aux {files.length} photos.
            </p>
          )}
        </div>
        <Button type="submit" disabled={isUploading}>
          {isUploading && uploadProgress
            ? `Envoi ${uploadProgress.done}/${uploadProgress.total}...`
            : files.length > 1
              ? `Ajouter ${files.length} photos`
              : "Ajouter la photo"}
        </Button>
      </form>

      {isLoading ? (
        <p className="text-gray-600">Chargement des photos...</p>
      ) : photos.length === 0 ? (
        <p className="text-gray-600">Aucune photo ajoutée pour le moment.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo) => (
            <div key={photo.publicId} className="overflow-hidden rounded-lg border bg-white shadow-sm">
              <div className="relative h-40 w-full">
                <Image src={photo.url} alt={photo.alt} fill className="object-cover" />
              </div>
              <div className="p-3">
                <p className="mb-2 line-clamp-2 text-sm text-gray-700">{photo.alt}</p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      disabled={deletingId === photo.publicId}
                      className="w-full"
                    >
                      Supprimer
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Supprimer cette photo ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action est irréversible. La photo sera retirée de Cloudinary et de la
                        galerie du site.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(photo.publicId)}>
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
