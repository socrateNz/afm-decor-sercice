"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

const FALLBACK_IMAGE = {
  src: "/elegant-wedding-flowers-lights.png",
  alt: "Décoration d'événement élégante",
}

const SLIDE_DURATION_MS = 6000
const MAX_SLIDES = 5

interface Slide {
  src: string
  alt: string
}

export default function Hero() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch("/api/gallery/photos")
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          setSlides(
            data.slice(0, MAX_SLIDES).map((photo: { url: string; alt: string }) => ({
              src: photo.url,
              alt: photo.alt || FALLBACK_IMAGE.alt,
            }))
          )
        }
      } catch {
        // Le visuel par défaut reste affiché si la galerie est indisponible.
      }
    }
    fetchPhotos()
  }, [])

  useEffect(() => {
    if (slides.length < 2) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, SLIDE_DURATION_MS)
    return () => clearInterval(interval)
  }, [slides.length])

  const activeSlide = slides.length > 0 ? slides[activeIndex] : FALLBACK_IMAGE

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={activeSlide.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Image
              src={activeSlide.src}
              alt={activeSlide.alt}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container-custom relative z-10 text-center text-white">
        <motion.h1
          className="mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Créons ensemble vos moments inoubliables
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Spécialiste en décoration et organisation d'événements à Montréal
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Link
            href="#contact"
            className="btn-primary text-lg px-8 py-3 inline-block hover:scale-105 transition-transform duration-300"
          >
            Nous contacter
          </Link>
        </motion.div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Aller à la photo ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}

      <motion.a
        href="#about"
        aria-label="Découvrir la suite"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1, duration: 0.8 }, y: { delay: 1, duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
      >
        <ChevronDown className="h-8 w-8" />
      </motion.a>
    </section>
  )
}
