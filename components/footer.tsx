import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl text-amber-400 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>AFM Décor - Service</h3>
            <p className="text-gray-300 mb-4">
              Votre partenaire de confiance pour la décoration et l'organisation d'événements à Montréal.
            </p>
            <p className="text-gray-300">
              <span className="block">Téléphone: 514 622 7230</span>
              <span className="block">Email: contact@afmdecor.com</span>
            </p>
          </div>

          <div>
            <h3 className="text-xl text-amber-400 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-300 hover:text-amber-400 transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl text-amber-400 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Nos Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Mariages</li>
              <li className="text-gray-300">Fiançailles</li>
              <li className="text-gray-300">Baby Showers</li>
              <li className="text-gray-300">Anniversaires</li>
              <li className="text-gray-300">Événements d'entreprise</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} AFM Décor - Service. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
