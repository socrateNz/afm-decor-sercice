"use client"

import { useState, useRef } from "react"
import { motion, cubicBezier, useInView } from "framer-motion"
import { FaTiktok, FaFacebookF, FaInstagram, FaPhone, FaEnvelope, FaMapPin, FaThreads, FaWhatsapp } from "react-icons/fa6"
import { Calendar, Send, CheckCircle2 } from "lucide-react"

const EVENT_TYPES = [
  "Mariage",
  "Fiançailles",
  "Baby Shower",
  "Anniversaire",
  "Événement corporatif",
  "Autre",
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Mariage",
    date: "",
    message: "",
  })

  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const subject = encodeURIComponent(`Demande de soumission - ${formData.eventType} - ${formData.name}`)
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\nTéléphone: ${formData.phone || "Non renseigné"}\nType d'événement: ${formData.eventType}\nDate souhaitée: ${formData.date || "Non définie"}\n\nMessage / Détails du projet:\n${formData.message}`
    )
    window.location.href = `mailto:afm.decor.service@gmail.com?subject=${subject}&body=${body}`

    setSubmitMessage("Votre messagerie s'ouvre avec votre demande pré-remplie. Il ne vous reste plus qu'à l'envoyer !")
  }

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

  const whatsappMessage = encodeURIComponent(
    "Bonjour AFM Décor ! J'aimerais avoir des informations et une soumission pour mon événement à venir."
  )
  const whatsappUrl = `https://wa.me/15146227230?text=${whatsappMessage}`

  return (
    <section id="contact" className="bg-[#FAF7F2] py-20" ref={ref}>
      <div className="container-custom">
        
        <motion.div
          className="section-title text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-800 block mb-2">
            Discutons de votre projet
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#141210]">
            Contact & Soumission
          </h2>
          <p className="text-sm sm:text-base text-[#574c43] max-w-xl mx-auto mt-4 font-light">
            Partagez-nous vos envies, votre date et votre vision. Nous vous répondrons sous 24 à 48 heures avec bienveillance.
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-12 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Colonne Coordonnées & WhatsApp */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#141210] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                Parlons de votre célébration
              </h3>
              
              <p className="text-[#4a3f35] text-sm sm:text-base leading-relaxed mb-8">
                Que vous ayez une idée très précise ou que vous cherchiez encore l&apos;inspiration, nous serons ravis de vous orienter vers la scénographie idéale pour votre budget et votre lieu.
              </p>

              {/* Bouton WhatsApp Direct Très Efficace */}
              <div className="mb-8 p-5 rounded-2xl bg-white border border-emerald-200/80 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <FaWhatsapp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#141210]">Échange direct sur WhatsApp</h4>
                    <p className="text-xs text-[#736357]">Pratique pour envoyer photos et inspirations</p>
                  </div>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>Démarrer une discussion WhatsApp</span>
                </a>
              </div>

              {/* Coordonnées */}
              <div className="space-y-4 text-sm text-[#3d342c]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                    <FaPhone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#736357]">Téléphone direct</p>
                    <a href="tel:+15146227230" className="font-semibold text-[#141210] hover:text-amber-700">514 622 7230</a>
                    <span className="mx-2 text-gray-400">|</span>
                    <a href="tel:+14383964070" className="font-semibold text-[#141210] hover:text-amber-700">438 396 4070</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                    <FaEnvelope className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#736357]">Courriel</p>
                    <a href="mailto:afm.decor.service@gmail.com" className="font-semibold text-[#141210] hover:text-amber-700">
                      afm.decor.service@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                    <FaMapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#736357]">Zone d&apos;activité</p>
                    <p className="font-semibold text-[#141210]">Grand Montréal, Laval, Rive-Sud & Environs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux soignés */}
            <div className="mt-8 pt-6 border-t border-amber-200/60">
              <p className="text-xs font-semibold text-[#5e5044] uppercase tracking-wider mb-3">
                Suivez nos coulisses & réalisations :
              </p>
              <div className="flex items-center gap-3">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/afm_decor_service"
                  className="w-10 h-10 rounded-xl bg-white border border-amber-200 text-[#4a3f35] hover:text-amber-700 hover:border-amber-400 flex items-center justify-center transition-all shadow-sm"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.tiktok.com/@afmdecorservice"
                  className="w-10 h-10 rounded-xl bg-white border border-amber-200 text-[#4a3f35] hover:text-amber-700 hover:border-amber-400 flex items-center justify-center transition-all shadow-sm"
                  aria-label="TikTok"
                >
                  <FaTiktok className="w-4 h-4" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/share/1JUvixQ6mJ/"
                  className="w-10 h-10 rounded-xl bg-white border border-amber-200 text-[#4a3f35] hover:text-amber-700 hover:border-amber-400 flex items-center justify-center transition-all shadow-sm"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.threads.com/@afm_decor_service"
                  className="w-10 h-10 rounded-xl bg-white border border-amber-200 text-[#4a3f35] hover:text-amber-700 hover:border-amber-400 flex items-center justify-center transition-all shadow-sm"
                  aria-label="Threads"
                >
                  <FaThreads className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Colonne Formulaire Sobre & Efficace */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-7 sm:p-9 rounded-3xl border border-amber-200/80 shadow-md"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-[#3d342c] uppercase tracking-wider mb-2">
                    Votre Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Sarah Tremblay"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-amber-200 bg-[#FAF7F2]/50 text-[#141210] placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#3d342c] uppercase tracking-wider mb-2">
                    Votre Adresse courriel *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Ex: sarah@exemple.com"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-amber-200 bg-[#FAF7F2]/50 text-[#141210] placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="eventType" className="block text-xs font-semibold text-[#3d342c] uppercase tracking-wider mb-2">
                    Type d&apos;événement
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-amber-200 bg-[#FAF7F2]/50 text-[#141210] focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-colors"
                  >
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-xs font-semibold text-[#3d342c] uppercase tracking-wider mb-2">
                    Date estimée (facultatif)
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-amber-200 bg-[#FAF7F2]/50 text-[#141210] focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-xs font-semibold text-[#3d342c] uppercase tracking-wider mb-2">
                  Détails de votre projet *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Parlez-nous du nombre d'invités estimé, du lieu prévu ou des inspirations qui vous tiennent à cœur..."
                  className="w-full px-4 py-3 text-sm rounded-xl border border-amber-200 bg-[#FAF7F2]/50 text-[#141210] placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 !py-3.5 text-sm font-semibold shadow-lg shadow-amber-600/20"
              >
                <span>Envoyer ma demande de soumission</span>
                <Send className="w-4 h-4" />
              </button>

              {submitMessage && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-xs sm:text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{submitMessage}</span>
                </div>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}