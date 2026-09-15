"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { Sparkles, ArrowRight, Star, Heart, CheckCircle2 } from "lucide-react"

interface ThemeUniverse {
  id: string
  label: string
  icon: string
  tagline: string
  title: string
  subtitle: string
  image: string
  detailImage: string
  detailTitle: string
  detailTag: string
}

const UNIVERSES: ThemeUniverse[] = [
  {
    id: "mariage",
    label: "Mariages Féeriques",
    icon: "💍",
    tagline: "Scénographies & Arches Royales",
    title: "L'art de sublimer",
    subtitle: "vos plus beaux serments d'amour",
    image: "/elegant-wedding-flowers-lights.png",
    detailImage: "/outdoor-wedding-ceremony.png",
    detailTitle: "Arche florale & Allée d'honneur",
    detailTag: "Sur-mesure de A à Z",
  },
  {
    id: "anniversaire",
    label: "Anniversaires & Galas",
    icon: "✨",
    tagline: "Célébrations de Prestige",
    title: "Une scénographie d'éclat",
    subtitle: "pour marquer les grands jalons",
    image: "/luxury-gold-birthday.png",
    detailImage: "/elegant-event-decoration.png",
    detailTitle: "Or brossé, ballons & néons",
    detailTag: "Ambiance VIP",
  },
  {
    id: "babyshower",
    label: "Baby Showers Chics",
    icon: "🍼",
    tagline: "Douceur Pastel & Poésie",
    title: "Un écrin de tendresse",
    subtitle: "pour accueillir votre nouveau trésor",
    image: "/pastel-baby-shower.png",
    detailImage: "/elegant-event-planner.png",
    detailTitle: "Photobooth pastel & décors nuages",
    detailTag: "Thématique personnalisée",
  },
  {
    id: "fiancailles",
    label: "Fiançailles & Réceptions",
    icon: "🥂",
    tagline: "Élégance & Intimité Festives",
    title: "Des décors immersifs",
    subtitle: "qui éblouiront vos invités",
    image: "/romantic-engagement-party.png",
    detailImage: "/elegant-table-setting.png",
    detailTitle: "Art de la table & ciel étoilé",
    detailTag: "Montréal & Environs",
  },
]

const SLIDE_DURATION_MS = 6500

const MARQUEE_ITEMS = [
  "SCÉNOGRAPHIE FLORALE SUR-MESURE",
  "MARIAGES DE PRESTIGE",
  "ARCHES MONUMENTALES",
  "ANNIVERSAIRES & GALAS",
  "BABY SHOWERS FÉERIQUES",
  "ART DE LA TABLE RAFFINÉ",
  "MONTRÉAL & GRAND MONTRÉAL",
  "ÉVÉNEMENTS PRIVÉS DE LUXE",
]

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [progress, setProgress] = useState(0)

  // Gestion du timer automatique avec barre de progression
  useEffect(() => {
    if (isPaused) return

    const stepMs = 50
    const increment = (stepMs / SLIDE_DURATION_MS) * 100

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((current) => (current + 1) % UNIVERSES.length)
          return 0
        }
        return prev + increment
      })
    }, stepMs)

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current)
    }
  }, [isPaused, activeIndex])

  const handleSelectUniverse = (index: number) => {
    setActiveIndex(index)
    setProgress(0)
  }

  const activeTheme = UNIVERSES[activeIndex]

  return (
    <section 
      className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-[#FAF7F2] transition-colors duration-700"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Halos lumineux dorés d'ambiance en arrière-plan */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] md:w-[1100px] h-[450px] bg-gradient-to-tr from-amber-200/40 via-amber-100/30 to-rose-100/20 blur-[130px] rounded-full"
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/3 -right-32 w-80 h-80 bg-amber-200/30 blur-[100px] rounded-full"
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute bottom-12 -left-20 w-72 h-72 bg-amber-100/40 blur-[90px] rounded-full"
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ============================================================ */}
          {/* COLONNE GAUCHE : ÉDITORIAL HAUTE COUTURE & CONVERSION         */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Badge Prestige (contrasté et lumineux) */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 border border-amber-300/80 shadow-sm backdrop-blur-md w-fit mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-semibold text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Scénographie & Décors d&apos;Exception • Montréal
              </span>
            </motion.div>

            {/* Titre Principal Éditorial (Très fort contraste noir ébène + or chaud) */}
            <motion.div
              key={activeTheme.id + "-title"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.65rem] xl:text-[4.2rem] font-bold text-[#141210] leading-[1.14] tracking-tight mb-5">
                {activeTheme.title}{" "}
                <span className="block font-normal italic bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 bg-clip-text text-transparent">
                  {activeTheme.subtitle}.
                </span>
              </h1>
            </motion.div>

            {/* Sous-titre & promesse de valeur (Gris chaud profond, très lisible) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl text-[#3d342c] font-normal max-w-2xl leading-relaxed mb-8"
            >
              <strong className="font-semibold text-[#141210]">AFM Décor</strong> donne vie à vos rêves les plus précieux. Nous concevons des scénographies sur-mesure féeriques qui transforment chaque instant en souvenir impérissable.
            </motion.p>

            {/* CTA Group Prestige */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Link
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-white shadow-xl shadow-amber-600/25 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-600/40 hover:-translate-y-0.5 active:translate-y-0 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-700 hover:via-amber-600 hover:to-amber-800"
              >
                <span>Obtenir une soumission gratuite</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/galerie"
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full font-semibold text-[#141210] bg-white hover:bg-amber-50/80 border border-amber-300/80 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <span>Découvrir la galerie</span>
              </Link>
            </motion.div>

            {/* ============================================================ */}
            {/* LE FLOATING GLASS DOCK (Sélecteur d'ambiances interactif)    */}
            {/* ============================================================ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              className="w-full"
            >
              <div className="flex items-center justify-between mb-2.5 px-1">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-950 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                  Explorez nos univers scénographiques :
                </span>
                <span className="text-xs font-medium text-[#736357]">
                  {activeIndex + 1} sur {UNIVERSES.length}
                </span>
              </div>

              {/* Barre de navigation des univers (Fond clair doux et boutons hyper lisibles) */}
              <div className="p-2 rounded-2xl bg-white/90 border border-amber-200 shadow-md shadow-amber-950/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar backdrop-blur-md">
                {UNIVERSES.map((universe, index) => {
                  const isActive = index === activeIndex
                  return (
                    <button
                      key={universe.id}
                      type="button"
                      onClick={() => handleSelectUniverse(index)}
                      className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                        isActive
                          ? "text-white shadow-md bg-gradient-to-r from-amber-600 to-amber-700"
                          : "text-[#4a3f35] hover:text-[#141210] hover:bg-amber-100/60"
                      }`}
                    >
                      <span className="text-base leading-none">{universe.icon}</span>
                      <span>{universe.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Preuve sociale & réassurance (Haute lisibilité) */}
              <div className="flex flex-wrap items-center gap-6 mt-6 pt-5 border-t border-amber-200/70 text-xs text-[#4a3f35]">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="font-bold text-[#141210]">5.0</span>
                  <span className="text-[#5e5044] font-medium">(100% Satisfaction)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="font-medium text-[#3d342c]">Plus de 150 événements conçus</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="font-medium text-[#3d342c]">Installation & Désinstallation incluses</span>
                </div>
              </div>

            </motion.div>

          </div>

          {/* ============================================================ */}
          {/* COLONNE DROITE : COMPOSITION ASYMÉTRIQUE EN ARCHE & DÉTAILS  */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Grand Cadre Principal façon Arche Royale */}
              <div className="relative mx-auto w-full aspect-[4/5] sm:aspect-[3/4] max-w-[430px] rounded-t-[140px] sm:rounded-t-[180px] rounded-b-[2.5rem] overflow-hidden shadow-2xl ring-2 ring-amber-300/60 bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTheme.image}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeTheme.image}
                      alt={activeTheme.label}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 480px"
                    />
                    {/* Filtre dégradé chaleureux pour préserver l'éclat */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85" />
                  </motion.div>
                </AnimatePresence>

                {/* Légende basse intégrée à l'arche */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10 text-white">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTheme.id + "-caption"}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-amber-500 text-white shadow-sm mb-2">
                        {activeTheme.tagline}
                      </span>
                      <h3 className="text-xl font-bold font-playfair drop-shadow-md text-white">
                        {activeTheme.label}
                      </h3>
                    </motion.div>
                  </AnimatePresence>

                  {/* Barre de progression fluide de la slide */}
                  <div className="w-full bg-white/30 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-75 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

              </div>

              {/* Vignette Satellite Flottante (Détail Scénographique, fond blanc immaculé et bordure or) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-6 -left-3 sm:-bottom-8 sm:-left-8 z-20 w-52 sm:w-60 p-2.5 rounded-2xl bg-white border border-amber-300/80 shadow-2xl backdrop-blur-xl flex items-center gap-3"
              >
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 ring-1 ring-amber-300">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTheme.detailImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeTheme.detailImage}
                        alt="Détail décor"
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-amber-700">
                    <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                    <span>Détail d&apos;art</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeTheme.detailTitle}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs font-bold text-[#141210] truncate"
                    >
                      {activeTheme.detailTitle}
                    </motion.p>
                  </AnimatePresence>
                  <span className="text-[10px] font-medium text-[#5e5044] block truncate">
                    {activeTheme.detailTag}
                  </span>
                </div>
              </motion.div>

              {/* Badge d'excellence Flottant en haut à droite (Fond blanc + texte or sombre) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-4 -right-2 sm:-right-4 z-20 px-4 py-2 rounded-full bg-white border border-amber-300/80 shadow-xl backdrop-blur-md flex items-center gap-2"
              >
                <span className="text-amber-600 text-sm">✦</span>
                <span className="text-xs font-bold tracking-wide text-amber-950">
                  Créations Exclusives
                </span>
              </motion.div>

            </div>

          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* RUBAN DÉFILANT PRESTIGE (Marquee continu sans coupure)       */}
      {/* ============================================================ */}
      <div className="relative mt-12 md:mt-16 py-4 bg-amber-100/50 border-y border-amber-200 overflow-hidden">
        {/* Masques de fondu sur les côtés */}
        <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-6 px-6 text-xs md:text-sm tracking-widest font-bold uppercase text-amber-950"
            >
              <span>{item}</span>
              <span className="text-amber-600 text-base">✦</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
