"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogIn, Menu, X } from 'lucide-react'
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
        duration: 0.3,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    },
  }

  const linkVariants = {
    closed: { opacity: 0, y: -10 },
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
      className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container-custom flex justify-between items-center py-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link href="/" className="flex items-center">
            <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', fontWeight: 'bold' }} className="text-amber-500">
              AFM Décor & Service
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item, index) => {
            const isActive = isItemActive(item)
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`relative group transition-colors ${isActive ? "text-amber-500" : "text-gray-800 hover:text-amber-500"}`}
                >
                  {item.label}
                  <motion.span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-amber-500 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                    whileHover={{ width: "100%" }}
                  />
                </Link>
              </motion.div>
            )
          })}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              href="/#contact"
              className="btn-primary hover:scale-105 transition-transform duration-300"
            >
              Contact
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link
              href="/admin"
              aria-label="Connexion au backoffice"
              title="Connexion au backoffice"
              className="flex items-center justify-center h-9 w-9 rounded-full text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
            >
              <LogIn className="h-5 w-5" />
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden text-gray-800"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
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
            className="lg:hidden bg-white border-t overflow-hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="container-custom py-4 flex flex-col space-y-4">
              {[...navItems, { label: "Contact", href: "/#contact", sectionId: null }].map((item, index) => {
                const isContact = item.label === "Contact"
                const isActive = !isContact && isItemActive(item)
                return (
                  <motion.div
                    key={item.label}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={
                        isContact
                          ? "btn-primary w-full text-center block"
                          : `transition-colors ${isActive ? "text-amber-500 font-medium" : "text-gray-800 hover:text-amber-500"}`
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
                transition={{ delay: (navItems.length + 1) * 0.1 }}
                className="border-t pt-4"
              >
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-amber-500 transition-colors"
                  onClick={toggleMenu}
                >
                  <LogIn className="h-4 w-4" />
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
