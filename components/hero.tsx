"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/elegant-wedding-flowers-lights.png"
          alt="Décoration d'événement élégante"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container-custom relative z-10 text-center text-white">
        <motion.h1 
          className="mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Créons ensemble vos moments inoubliables
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Spécialiste en décoration et organisation d'événements à Montréal
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Link 
            href="#contact" 
            className="btn-primary text-lg px-8 py-3 inline-block hover:scale-105 transition-transform duration-300"
          >
            Nous contacter
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
