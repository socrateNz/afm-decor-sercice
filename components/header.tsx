"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuVariants = {
    closed: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] 
      }
    }
  },
    open: {
    hidden: { opacity: 1, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] 
      }
    }
  }
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
              AFM Décor
            </span>
            <span className="ml-1 text-pink-300">- Service</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {["Accueil", "À propos", "Services", "Prestations", "Galerie", "Témoignages"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={item === "Accueil" ? "/" : `#${item.toLowerCase().replace("à propos", "about").replace("témoignages", "testimonials")}`}
                className="text-gray-800 hover:text-amber-500 transition-colors relative group"
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              href="#contact"
              className="btn-primary hover:scale-105 transition-transform duration-300"
            >
              Contact
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
              {["Accueil", "À propos", "Services", "Prestations", "Galerie", "Témoignages", "Contact"].map((item, index) => (
                <motion.div
                  key={item}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item === "Accueil" ? "/" : item === "Contact" ? "#contact" : `#${item.toLowerCase().replace("à propos", "about").replace("témoignages", "testimonials")}`}
                    className={`${item === "Contact" ? "btn-primary w-full text-center" : "text-gray-800 hover:text-amber-500 transition-colors"}`}
                    onClick={toggleMenu}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
