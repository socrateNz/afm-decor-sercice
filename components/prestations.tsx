"use client"

import Image from "next/image"
import { CheckCircle } from 'lucide-react'
import { cubicBezier, motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function Prestations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const prestations = [
    {
      title: "Décoration pour tout type d'événements",
      description:
        "Nous créons des ambiances uniques adaptées à chaque occasion, en utilisant des éléments décoratifs de qualité qui transforment n'importe quel espace.",
    },
    {
      title: "Planification événementielle",
      description:
        "De la conception initiale à la coordination le jour J, nous gérons tous les aspects de votre événement pour que vous puissiez profiter pleinement du moment.",
    },
    {
      title: "Décoration personnalisée",
      description:
        "Chaque détail est soigneusement pensé pour refléter votre style et votre vision, créant ainsi une expérience authentique et mémorable.",
    },
    {
      title: "Location de matériel et d'articles de décoration",
      description:
        "Accédez à notre vaste collection d'articles décoratifs, de mobilier et d'accessoires pour compléter parfaitement votre événement.",
    },
    {
      title: "Service traiteur",
      description:
        "Nous collaborons avec les meilleurs traiteurs de Montréal pour vous offrir une expérience culinaire exceptionnelle qui ravira vos invités.",
    },
  ]

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

 const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.25, 0.1, 0.25, 1) // Corrected ease definition
      }
    }
  }

  return (
    <section id="prestations" className="bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Nos Prestations</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/elegant-event-decoration.png"
              alt="Prestations de décoration événementielle"
              width={600}
              height={800}
              className="rounded-lg shadow-lg object-cover mx-auto"
            />
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {prestations.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-4"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex-shrink-0 mt-1">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle className="h-6 w-6 text-amber-500" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-amber-500" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
