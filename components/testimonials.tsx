"use client"

import { useEffect, useState } from "react"
import { Star } from 'lucide-react'
import { cubicBezier, motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import TestimonialForm from "@/components/testimonial-form"

interface Testimonial {
  id: number
  name: string
  rating: number
  message: string
}

const getInitials = (name: string) => {
  const parts = name.split(/[\s-]+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials")
        const data = await res.json()
        if (Array.isArray(data)) setTestimonials(data)
      } catch {
        // La section reste vide si l'API est indisponible.
      } finally {
        setHasLoaded(true)
      }
    }
    fetchTestimonials()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.25, 0.1, 0.25, 1)
      }
    }
  }

  if (hasLoaded && testimonials.length === 0) {
    return (
      <section id="testimonials" className="bg-white">
        <div className="container-custom text-center">
          <h2 className="mb-4">Témoignages</h2>
          <p className="mb-6 text-gray-600">Soyez le premier à partager votre expérience avec AFM Décor - Service.</p>
          <TestimonialForm />
        </div>
      </section>
    )
  }

  return (
    <section id="testimonials" className="bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Témoignages</h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-beige-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={cardVariants}
              whileHover={{
                y: -5,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <motion.div
                className="flex mb-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
              >
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{
                      delay: index * 0.2 + 0.7 + i * 0.1,
                      type: "spring",
                      stiffness: 300
                    }}
                  >
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  </motion.div>
                ))}
              </motion.div>
              <p className="text-gray-700 italic mb-6">"{testimonial.message}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-400 text-white font-semibold">
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <TestimonialForm />
        </div>
      </div>
    </section>
  )
}
