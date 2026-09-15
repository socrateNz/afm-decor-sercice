"use client"

import Image from "next/image"
import { Phone, CheckCircle2 } from 'lucide-react'
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
        staggerChildren: 0.15,
        duration: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
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
    <section id="about" className="bg-white py-20" ref={ref}>
      <div className="container-custom">
        
        <motion.div
          className="section-title text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-800 block mb-2">
            Notre Philosophie
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#141210]">
            À Propos d&apos;AFM Décor
          </h2>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-12 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Visuel avec composition soignée */}
          <motion.div variants={itemVariants} className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-200/80">
              <Image
                src="/elegant-event-planner.png"
                alt="AFM Décor - Service en pleine création événementielle"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>
            {/* Petite pastille artisanale */}
            <div className="absolute -bottom-4 right-2 sm:right-6 bg-[#FAF7F2] border border-amber-300 px-5 py-3 rounded-2xl shadow-xl">
              <span className="text-xs font-bold text-amber-900 block">✦ Fait avec passion</span>
              <span className="text-[11px] text-[#736357]">À Montréal & Environs</span>
            </div>
          </motion.div>

          {/* Contenu textuel humain et chaleureux */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#141210] mb-5 leading-snug" style={{ fontFamily: 'var(--font-playfair)' }}>
              Donner vie à vos émotions à travers la beauté des décors.
            </h3>
            
            <p className="mb-5 text-[#4a3f35] text-base leading-relaxed">
              Fondée avec une passion sincère pour l&apos;art de recevoir, <strong className="font-semibold text-[#141210]">AFM Décor - Service</strong> est une maison de scénographie montréalaise qui imagine et installe des décors sur-mesure pour tous les temps forts de votre vie.
            </p>

            <p className="mb-8 text-[#4a3f35] text-base leading-relaxed">
              Nous savons combien l&apos;organisation d&apos;un mariage ou d&apos;une fête intime peut être prenante. Notre rôle est de vous libérer de tout stress logistique pour que vous puissiez profiter pleinement de vos proches dans un cadre inoubliable.
            </p>

            {/* Les 3 piliers concrets */}
            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#141210]">Écoute & Moodboard personnalisé</h4>
                  <p className="text-xs text-[#5e5044]">Nous cernons votre style, votre palette de couleurs et vos inspirations pour un projet unique.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#141210]">Conception & Artisanat floral</h4>
                  <p className="text-xs text-[#5e5044]">Sélection rigoureuse des fleurs, des nappages précieux, de la vaisselle et des structures lumineuses.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#141210]">Installation & Démontage le jour J</h4>
                  <p className="text-xs text-[#5e5044]">Notre équipe s&apos;occupe de tout sur place, de l&apos;arrivée matinale jusqu&apos;à la restitution de la salle.</p>
                </div>
              </div>
            </div>

            {/* Coordonnées téléphoniques cliquables */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-amber-100">
              <span className="text-xs text-[#736357] font-medium">Une question ou envie d&apos;échanger directement ?</span>
              <div className="flex items-center gap-4">
                <a
                  href="tel:+15146227230"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>514 622 7230</span>
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="tel:+14383964070"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>438 396 4070</span>
                </a>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
