"use client"

import { Star } from 'lucide-react'
import { cubicBezier, motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const testimonials = [
    {
      name: "Sophie et Marc",
      event: "Mariage",
      text: "AFM Décor a transformé notre mariage en un conte de fées! Chaque détail était parfait, et nos invités n'arrêtent pas d'en parler. Un grand merci pour avoir rendu notre journée si spéciale.",
      rating: 5,
    },
    {
      name: "Isabelle",
      event: "Baby Shower",
      text: "Je suis tellement reconnaissante pour le magnifique baby shower organisé par AFM Décor. La décoration était exactement comme je l'avais imaginée, et le service était impeccable du début à la fin.",
      rating: 5,
    },
    {
      name: "Jean-Philippe",
      event: "Anniversaire",
      text: "Pour les 40 ans de ma femme, je voulais quelque chose de vraiment spécial. AFM Décor a dépassé toutes mes attentes avec une soirée élégante et personnalisée qui restera gravée dans nos mémoires.",
      rating: 5,
    },
  ]

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
              key={index}
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
              <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.event}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
