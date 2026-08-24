"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, cubicBezier } from "framer-motion"
import { useInView } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GalleryImage {
  src: string
  alt: string
}

interface Video {
  url: string
  title: string
}

function getYouTubeVideoId(urlString: string) {
  try {
    const url = new URL(urlString)
    const id = url.searchParams.get("v")
    if (id) return id
    const segments = url.pathname.split("/")
    return segments[segments.length - 1]
  } catch {
    return ""
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.25, 0.1, 0.25, 1),
    },
  },
}

interface GalleryProps {
  /** Limite le nombre d'éléments affichés par onglet (aperçu). Sans limite : tout est affiché. */
  limit?: number
  /** Si fourni, affiche un bouton "Voir toute la galerie" pointant vers cette URL. */
  viewAllHref?: string
}

export default function Gallery({ limit, viewAllHref }: GalleryProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [uploadedImages, setUploadedImages] = useState<GalleryImage[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const allImages = uploadedImages;
  const images = limit ? allImages.slice(0, limit) : allImages
  const displayedVideos = limit ? videos.slice(0, limit) : videos

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch("/api/gallery/photos")
        const data = await res.json()
        if (Array.isArray(data)) {
          setUploadedImages(data.map((photo) => ({ src: photo.url, alt: photo.alt })))
        }
      } catch {
        // La galerie statique reste affichée si Cloudinary est indisponible.
      }
    }
    fetchPhotos()
  }, [])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos")
        const data = await res.json()
        if (Array.isArray(data)) setVideos(data)
      } catch {
        // L'onglet vidéos reste vide si YouTube est indisponible.
      }
    }
    fetchVideos()
  }, [])

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length))
  }, [images.length])

  const showNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % images.length))
  }, [images.length])

  useEffect(() => {
    if (selectedIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") showPrev()
      if (e.key === "ArrowRight") showNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, showPrev, showNext])

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null

  return (
    <section id="gallery" className="bg-beige-50" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Notre Galerie</h2>
        </motion.div>

        <Tabs defaultValue="photos" className="items-center">
          <TabsList>
            <TabsTrigger value="photos" className="data-[state=active]:text-amber-600">
              Photos
            </TabsTrigger>
            <TabsTrigger value="videos" className="data-[state=active]:text-amber-600">
              Vidéos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="w-full">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {images.map((image, index) => (
                <motion.div
                  key={`${image.src}-${index}`}
                  className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                  variants={cardVariants}
                  whileHover={{
                    y: -10,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  onClick={() => setSelectedIndex(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Agrandir la photo : ${image.alt}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setSelectedIndex(index)
                    }
                  }}
                >
                  <div className="relative h-64 sm:h-72 md:h-80">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="h-8 w-8 text-white drop-shadow-lg" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="videos" className="w-full">
            {displayedVideos.length === 0 ? (
              <p className="text-center text-gray-600">Aucune vidéo pour le moment.</p>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {displayedVideos.map((video, index) => (
                  <motion.div
                    key={`${video.url}-${index}`}
                    className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group"
                    variants={cardVariants}
                    whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
                  >
                    <div className="relative h-64 sm:h-72 md:h-80">
                      <iframe
                        className="w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(video.url)}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="mt-2 text-center font-medium text-gray-800 px-2">{video.title}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>
        </Tabs>

        {viewAllHref && (
          <div className="mt-10 text-center">
            <Link href={viewAllHref} className="btn-primary inline-block">
              Voir toute la galerie
            </Link>
          </div>
        )}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent
          showCloseButton
          className="w-[calc(100%-2rem)] max-w-[95vw] sm:max-w-6xl border-none bg-transparent p-0 shadow-none [&>button]:text-white [&>button]:opacity-80 [&>button]:hover:opacity-100"
        >
          <DialogTitle className="sr-only">{selectedImage?.alt ?? "Image de la galerie"}</DialogTitle>
          {selectedImage && (
            <div className="relative">
              <div className="relative h-[80vh] max-h-[85vh] w-full overflow-hidden rounded-lg">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  sizes="95vw"
                  className="object-contain"
                />
              </div>
              <button
                type="button"
                onClick={showPrev}
                aria-label="Photo précédente"
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Photo suivante"
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <p className="mt-3 text-center text-white">{selectedImage.alt}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
