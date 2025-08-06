"use client"

import { Heart, GlassWater, Baby, Cake } from 'lucide-react'
import { cubicBezier, motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      title: "Mariages",
      description:
        "Transformez le jour le plus important de votre vie en un conte de fées avec nos décorations élégantes et notre organisation impeccable.",
      icon: <Heart className="h-12 w-12 text-pink-300" />,
    },
    {
      title: "Fiançailles",
      description:
        "Créez le cadre parfait pour votre demande ou votre célébration de fiançailles avec une ambiance romantique et personnalisée.",
      icon: <GlassWater className="h-12 w-12 text-amber-400" />,
    },
    {
      title: "Baby Showers",
      description:
        "Accueillez votre petit trésor dans un environnement chaleureux et adorable, conçu spécialement pour célébrer cette nouvelle vie.",
      icon: <Baby className="h-12 w-12 text-blue-300" />,
    },
    {
      title: "Anniversaires",
      description:
        "Marquez une autre année mémorable avec des décorations festives qui reflètent la personnalité et les goûts du célébrant.",
      icon: <Cake className="h-12 w-12 text-purple-400" />,
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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.25, 0.1, 0.25, 1)
      }
    }
  }


  return (
    <section id="services" className="bg-beige-50" ref={ref}>
      <div className="container-custom">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Nos Services</h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <motion.div 
                className="flex justify-center mb-4"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
