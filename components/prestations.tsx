"use client"

import Image from "next/image"
import { CheckCircle2 } from 'lucide-react'
import { cubicBezier, motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function Prestations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const prestations = [
    {
      title: "Scénographie & Décors de salle",
      description:
        "Création d'atmosphères sur-mesure combinant drapés fluides, structures florales, miroirs et éclairages tamisés adaptés à votre lieu de réception.",
    },
    {
      title: "Coordination & Direction artistique",
      description:
        "De la conception de la palette visuelle à l'installation le jour J, nous orchestrons chaque détail esthétique en parfaite harmonie.",
    },
    {
      title: "Art de la table & Papeterie coordonnée",
      description:
        "Nappages raffinés, centres de table floraux, vaisselle soignée et marque-places personnalisés qui magnifient l'expérience de vos invités.",
    },
    {
      title: "Location de mobilier & Pièces de prestige",
      description:
        "Arches géométriques, fauteuils trônes, néons d'ambiance, photobooths et accessoires décoratifs sélectionnés pour leur cachet.",
    },
    {
      title: "Collaboration traiteurs & Partenaires locaux",
      description:
        "Coordination étroite avec vos prestataires culinaires pour agencer buffets et tables avec une fluidité visuelle irréprochable.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        duration: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section id="prestations" className="bg-white py-20" ref={ref}>
      <div className="container-custom">
        
        <motion.div
          className="section-title text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-800 block mb-2">
            Notre Gamme Complète
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#141210]">
            Nos Prestations & Expertises
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-200/80">
              <Image
                src="/elegant-event-decoration.png"
                alt="Prestations de décoration événementielle haut de gamme à Montréal"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {prestations.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-4 p-4 rounded-2xl border border-transparent hover:border-amber-200 hover:bg-[#FAF7F2]/60 transition-all duration-300"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-[#141210]" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#4a3f35] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
