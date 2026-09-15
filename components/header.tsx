"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogIn, Menu, X, Sparkles } from 'lucide-react'
import { motion, AnimatePresence, cubicBezier } from "framer-motion"

const navItems = [
  { label: "Accueil", href: "/", sectionId: "" },
  { label: "À propos", href: "/#about", sectionId: "about" },
  { label: "Services", href: "/#services", sectionId: "services" },
  { label: "Prestations", href: "/#prestations", sectionId: "prestations" },
  { label: "Galerie", href: "/galerie", sectionId: null },
  { label: "Témoignages", href: "/#testimonials", sectionId: "testimonials" },
]

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.sectionId).filter((id): id is string => Boolean(id))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [pathname])

  const isItemActive = (item: (typeof navItems)[number]) => {
    if (item.href === "/galerie") return pathname === "/galerie"
    if (pathname !== "/") return false
    return item.sectionId === "" ? activeSection === "" : activeSection === item.sectionId
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.25,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.25,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    },
  }

  const linkVariants = {
    closed: { opacity: 0, y: -8 },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <motion.header
      className="bg-[#FAF7F2]/95 backdrop-blur-md sticky top-0 z-50 border-b border-amber-200/50 shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container-custom flex justify-between items-center py-3.5">
        
        {/* Logo noble et typographique */}
        <Link href="/" className="flex flex-col group">
          <span style={{ fontFamily: 'var(--font-playfair)' }} className="text-xl sm:text-2xl font-bold tracking-tight text-[#141210]">
            AFM Décor <span className="text-amber-600 font-normal italic">& Service</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#736357] font-semibold -mt-0.5">
            Scénographie Événementielle • Montréal
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navItems.map((item, index) => {
            const isActive = isItemActive(item)
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors py-1 ${
                    isActive 
                      ? "text-amber-700 font-semibold" 
                      : "text-[#3d342c] hover:text-amber-700"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 hover:w-full"
                    }`}
                  />
                </Link>
              </motion.div>
            )
          })}

          {/* CTA Devis Sobre */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <Link
              href="/#contact"
              className="btn-primary text-sm !py-2 !px-5 inline-block"
            >
              Demander une soumission
            </Link>
          </motion.div>

          {/* Accès discret backoffice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            <Link
              href="/admin"
              aria-label="Connexion au backoffice"
              title="Connexion au backoffice"
              className="flex items-center justify-center h-8 w-8 rounded-full text-gray-400 hover:text-amber-600 hover:bg-amber-100/60 transition-colors"
            >
              <LogIn className="h-4 w-4" />
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden text-[#141210] p-1.5 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden bg-[#FAF7F2] border-t border-amber-200/60 overflow-hidden shadow-lg"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="container-custom py-4 flex flex-col space-y-3.5">
              {[...navItems, { label: "Demander une soumission", href: "/#contact", sectionId: null }].map((item, index) => {
                const isContact = item.label === "Demander une soumission"
                const isActive = !isContact && isItemActive(item)
                return (
                  <motion.div
                    key={item.label}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={
                        isContact
                          ? "btn-primary w-full text-center block text-sm font-semibold !py-2.5 mt-2"
                          : `text-sm transition-colors py-1 block ${
                              isActive ? "text-amber-700 font-bold" : "text-[#3d342c] hover:text-amber-700"
                            }`
                      }
                      onClick={toggleMenu}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div
                variants={linkVariants}
                initial="closed"
                animate="open"
                transition={{ delay: (navItems.length + 1) * 0.05 }}
                className="border-t border-amber-200/60 pt-3"
              >
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-xs text-[#736357] hover:text-amber-700 transition-colors"
                  onClick={toggleMenu}
                >
                  <LogIn className="h-3.5 w-3.5" />
                  Connexion backoffice
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
