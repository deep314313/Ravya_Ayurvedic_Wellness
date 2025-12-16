import '../styles/globals.css'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import { Analytics } from '@vercel/analytics/react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />

        {/* Floating social icons (Instagram + WhatsApp) */}
        <div className="floating-social">
          <a
            href="https://instagram.com/ravya.health"
            target="_blank"
            rel="noopener noreferrer"
            className="floating-social-icon instagram"
            aria-label="Visit RAVYA on Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://wa.me/919868314313"
            target="_blank"
            rel="noopener noreferrer"
            className="floating-social-icon whatsapp"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>

        <Analytics />
      </CartProvider>
    </AuthProvider>
  )
}

export default MyApp

