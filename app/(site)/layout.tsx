import type React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import ScrollToTop from "@/components/scroll-to-top"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  )
}
