import '../styles/globals.css'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
        <Analytics />
      </CartProvider>
    </AuthProvider>
  )
}

export default MyApp

