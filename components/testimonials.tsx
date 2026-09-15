"use client"

import { useEffect, useState } from "react"
import { Star, Quote } from 'lucide-react'
import { cubicBezier, motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import TestimonialForm from "@/components/testimonial-form"

interface Testimonial {
  id: number
  name: string
  rating: number
  message: string
  created_at?: string
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
        if (Array.isArray(data)) {
          setTestimonials(data)
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error)
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
        staggerChildren: 0.15,
        duration: 0.6
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: cubicBezier(0.25, 0.1, 0.25, 1)
      }
    }
  }

  return (
    <section id="testimonials" className="bg-[#FAF7F2] py-20" ref={ref}>
      <div className="container-custom">
        
        <motion.div
          className="section-title text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-800 block mb-2">
            Avis Vérifiés
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#141210]">
            Témoignages de nos Clients
          </h2>
          <p className="text-sm sm:text-base text-[#574c43] max-w-xl mx-auto mt-4 font-light">
            Retours d&apos;expérience authentiques de nos clients après la réalisation de leur scénographie.
          </p>
        </motion.div>

        {/* Cas 1 : Aucun témoignage validé par l'admin pour l'instant */}
        {hasLoaded && testimonials.length === 0 && (
          <div className="max-w-md mx-auto text-center p-8 bg-white rounded-3xl border border-amber-200/80 shadow-sm">
            <Quote className="w-10 h-10 text-amber-400/60 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#141210] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              Partagez votre expérience
            </h3>
            <p className="text-sm text-[#574c43] mb-6">
              Soyez parmi les premiers à laisser un avis sur nos scénographies. Chaque retour est précieux pour nous !
            </p>
            <TestimonialForm />
          </div>
        )}

        {/* Cas 2 : Témoignages réels validés par l'admin */}
        {testimonials.length > 0 && (
          <>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-white p-7 rounded-2xl border border-amber-200/70 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex text-amber-400 gap-0.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <Quote className="h-6 w-6 text-amber-200" />
                    </div>

                    <p className="text-[#3d342c] text-sm leading-relaxed mb-6 italic">
                      &ldquo;{testimonial.message}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3.5 pt-4 border-t border-amber-100">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 to-amber-700 text-white font-bold text-xs shadow-sm">
                      {getInitials(testimonial.name)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#141210]">{testimonial.name}</p>
                      <span className="text-[10px] text-amber-800 font-medium">Avis vérifié</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-12 text-center">
              <TestimonialForm />
            </div>
          </>
        )}

      </div>
    </section>
  )
}
