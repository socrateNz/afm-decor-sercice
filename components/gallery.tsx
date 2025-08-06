"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const galleryImages = [
    {
      src: "/placeholder-v06jx.png",
      alt: "Décoration de mariage élégante",
    },
    {
      src: "/romantic-engagement-party.png",
      alt: "Décoration de fiançailles romantique",
    },
    {
      src: "/pastel-baby-shower.png",
      alt: "Baby shower aux couleurs pastel",
    },
    {
      src: "/luxury-gold-birthday.png",
      alt: "Décoration d'anniversaire luxueuse",
    },
    {
      src: "/elegant-table-setting.png",
      alt: "Décoration de table élégante",
    },
    {
      src: "/outdoor-wedding-ceremony.png",
      alt: "Cérémonie de mariage en extérieur",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

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

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group"
              variants={imageVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
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
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
