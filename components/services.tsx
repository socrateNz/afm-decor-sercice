"use client"

import { Heart, Wine, Baby, PartyPopper } from 'lucide-react'
import { cubicBezier, motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      title: "Mariages d'Exception",
      description:
        "Arches florales monumentales, allée d'honneur, table royale et mise en lumière féerique orchestrées avec passion pour votre grand jour.",
      icon: <Heart className="h-6 w-6 text-amber-700" />,
      detail: "Scénographie complète & Coordination",
    },
    {
      title: "Fiançailles & Réceptions",
      description:
        "Création d'une atmosphère intime et raffinée : art de la table soigné, ciel étoilé et décors personnalisés pour éblouir vos convives.",
      icon: <Wine className="h-6 w-6 text-amber-700" />,
      detail: "Banquets & Espaces cocktails",
    },
    {
      title: "Baby Showers & Naissances",
      description:
        "Un cocon de tendresse aux teintes poudrées avec photobooth sur-mesure, arches de ballons organiques et détails poétiques.",
      icon: <Baby className="h-6 w-6 text-amber-700" />,
      detail: "Thématiques sur-mesure & Candy bar",
    },
    {
      title: "Anniversaires & Galas",
      description:
        "Des scénographies audacieuses et élégantes, mêlant or brossé, lettrages lumineux et décors immersifs pour marquer les grands moments.",
      icon: <PartyPopper className="h-6 w-6 text-amber-700" />,
      detail: "Ambiance VIP & Réceptions privées",
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
    <section id="services" className="bg-[#FAF7F2] py-20" ref={ref}>
      <div className="container-custom">
        <motion.div 
          className="section-title text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-800 block mb-2">
            Notre Savoir-Faire
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#141210]">
            Nos Services Événementiels
          </h2>
          <p className="text-sm sm:text-base text-[#574c43] max-w-xl mx-auto mt-4 font-light">
            Chaque projet est conçu avec un soin artisanal minutieux, alliant fleurs haut de gamme, mobilier de prestige et sens aigu du détail.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-7"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-7 rounded-2xl border border-amber-200/70 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col justify-between group"
              variants={cardVariants}
              whileHover={{ 
                y: -6,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-100/60 border border-amber-200/80 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-amber-600 group-hover:border-amber-600">
                  <span className="transition-colors duration-300 group-hover:text-white [&>svg]:group-hover:text-white">
                    {service.icon}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-[#141210] mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {service.title}
                </h3>
                
                <p className="text-[#574c43] text-sm leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-amber-100 flex items-center justify-between text-xs text-amber-800 font-medium">
                <span>{service.detail}</span>
                <span className="text-amber-500 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
