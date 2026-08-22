"use client"

import { motion } from "framer-motion"
import { FaWhatsapp } from "react-icons/fa"

export default function WhatsAppButton() {
  const phoneNumber = "15146227230"
  const message = encodeURIComponent(
    "Bonjour, je souhaite avoir des informations sur vos services de décoration."
  )

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactez-nous sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp className="h-7 w-7" />
    </motion.a>
  )
}
