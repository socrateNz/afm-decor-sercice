"use client"

import Image from "next/image"
import { Phone } from 'lucide-react'
import { cubicBezier, motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
    <section id="about" className="bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2>À propos</h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <Image
              src="/elegant-event-planner.png"
              alt="AFM Décor - Service en action"
              width={600}
              height={800}
              className="rounded-lg shadow-lg object-cover"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-amber-500 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Votre partenaire événementiel à Montréal
            </h3>
            <p className="mb-6 text-gray-700">
              Fondée avec passion et dévouement, AFM Décor - Service est une entreprise montréalaise spécialisée dans la
              décoration et l'organisation d'événements qui transforme vos rêves en réalités mémorables.
            </p>
            <p className="mb-6 text-gray-700">
              Notre mission est simple : créer des expériences uniques qui reflètent votre personnalité et dépassent vos
              attentes. Que ce soit pour un mariage féerique, des fiançailles romantiques, un baby shower attendrissant
              ou un anniversaire festif, notre équipe créative s'engage à faire de votre événement un moment
              inoubliable.
            </p>
            <p className="mb-8 text-gray-700">
              Basée à Montréal, nous servons la grande région métropolitaine avec notre touche d'élégance et notre souci
              du détail qui font notre réputation.
            </p>

            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Phone className="text-amber-500 mr-2" />
              <span className="text-xl" style={{ fontFamily: 'var(--font-playfair)' }}>514 622 7230</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
