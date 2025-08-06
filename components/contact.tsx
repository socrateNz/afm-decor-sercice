"use client"

import { useState, useRef } from "react"
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react'
import { motion, cubicBezier, useInView } from "framer-motion"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitMessage("Merci pour votre message! Nous vous contacterons bientôt.")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setSubmitMessage("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

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
    <section id="contact" className="bg-beige-50" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Contactez-nous</h2>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl mb-6 text-amber-500" style={{ fontFamily: 'var(--font-playfair)' }}>
              Parlons de votre événement
            </h3>
            <p className="mb-8 text-gray-700">
              Vous avez un événement à organiser? Nous serions ravis de vous aider à le rendre inoubliable.
              Contactez-nous pour discuter de vos idées et obtenir un devis personnalisé.
            </p>

            <div className="space-y-4">
              <motion.div
                className="flex items-center"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="h-5 w-5 text-amber-500 mr-3" />
                <span>514 622 7230</span>
              </motion.div>

              <motion.div
                className="flex items-center"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="h-5 w-5 text-amber-500 mr-3" />
                <span>contact@afmdecor.com</span>
              </motion.div>

              <motion.div
                className="flex items-center"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="h-5 w-5 text-amber-500 mr-3" />
                <span>Montréal, QC, Canada</span>
              </motion.div>

              <div className="flex space-x-4 mt-6">
                <motion.a
                  href="#"
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isSubmitting ? { scale: [1, 1.05, 1] } : {}}
                transition={{ repeat: isSubmitting ? Infinity : 0, duration: 1 }}
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer"}
              </motion.button>

              {submitMessage && (
                <motion.p
                  className="mt-4 text-center text-green-600"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {submitMessage}
                </motion.p>
              )}
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}