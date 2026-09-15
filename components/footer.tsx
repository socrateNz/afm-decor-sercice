import Link from "next/link"
import { FaInstagram, FaTiktok, FaFacebookF, FaThreads } from "react-icons/fa6"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#141210] text-[#ded7ce] py-14 border-t border-amber-900/30">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-10">
          
          <div className="md:col-span-2">
            <h3 className="text-2xl text-amber-500 font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
              AFM Décor <span className="text-white font-normal italic">& Service</span>
            </h3>
            <p className="text-sm text-[#a89b8d] mb-6 max-w-sm leading-relaxed">
              Maison de scénographie et décoration d&apos;événements de prestige à Montréal. Nous transformons vos moments précieux en souvenirs inoubliables.
            </p>
            
            <div className="flex items-center gap-3">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/afm_decor_service"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-amber-400 hover:border-amber-400/40 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tiktok.com/@afmdecorservice"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-amber-400 hover:border-amber-400/40 flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok className="w-4 h-4" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/share/1JUvixQ6mJ/"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-amber-400 hover:border-amber-400/40 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.threads.com/@afm_decor_service"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-amber-400 hover:border-amber-400/40 flex items-center justify-center transition-colors"
                aria-label="Threads"
              >
                <FaThreads className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-500 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#a89b8d]">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-amber-400 transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-amber-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#prestations" className="hover:text-amber-400 transition-colors">
                  Prestations
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="hover:text-amber-400 transition-colors">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-500 mb-4">
              Contact & Secteur
            </h4>
            <div className="space-y-2.5 text-sm text-[#a89b8d]">
              <p className="text-white font-medium">Grand Montréal & Alentours</p>
              <div className="flex flex-col">
                <a href="tel:+15146227230" className="hover:text-amber-400 transition-colors">514 622 7230</a>
                <a href="tel:+14383964070" className="hover:text-amber-400 transition-colors">438 396 4070</a>
              </div>
              <a href="mailto:afm.decor.service@gmail.com" className="block hover:text-amber-400 transition-colors truncate">
                afm.decor.service@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#786b5e] gap-4">
          <p>&copy; {currentYear} AFM Décor - Service. Tous droits réservés.</p>
          <p>
            Conception et développement web par{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://portfolio-socrate.vercel.app/en"
              className="text-amber-500 hover:text-amber-400 transition-colors"
            >
              Etarcos Dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
