import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import BrandStory from '../components/BrandStory';
import Story from '../components/Story';
import Products from '../components/Products';
import HowItWorks from '../components/HowItWorks';
import AyurvedicScience from '../components/AyurvedicScience';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { getProducts, getReviews } from '../utils/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, reviewsData] = await Promise.all([
          getProducts(),
          getReviews()
        ]);
        
        if (productsData.success) {
          setProducts(productsData.data);
        }
        
        if (reviewsData.success) {
          setReviews(reviewsData.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Use default data if API fails (for development)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get base URL for absolute image paths (for SEO meta tags)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ravyahealth.in';
  const logoUrl = `${siteUrl}/Ravya_Logo.png`;

  return (
    <>
      <Head>
        {/* Primary SEO - "Ravya" keyword focused */}
        <title>Ravya | Ayurvedic Wellness Drinks | Ready-to-Drink Functional Beverages</title>
        <meta name="description" content="Ravya - Ancient Ayurveda in modern ready-to-drink format. Shop Ravya immunity, sugar balance, and heart health drinks made with real herbs. Ravya wellness beverages." />
        <meta name="keywords" content="ravya, ravya health, ravya drinks, ravya ayurvedic, ravya wellness, ayurvedic drinks, wellness beverages, immunity drinks, functional beverages, ready to drink, India" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Brand Name Meta */}
        <meta name="application-name" content="Ravya" />
        <meta name="apple-mobile-web-app-title" content="Ravya" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="Ravya - Ayurvedic Wellness Drinks" />
        <meta property="og:description" content="Ravya - Sip Daily Ayurveda, Straight From the Bottle. Ancient Ayurveda in modern ready-to-drink format by Ravya." />
        <meta property="og:image" content={logoUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Ravya Logo - Ayurvedic Wellness Drinks" />
        <meta property="og:site_name" content="Ravya" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content="Ravya - Ayurvedic Wellness Drinks" />
        <meta name="twitter:description" content="Ravya - Sip Daily Ayurveda, Straight From the Bottle. Ancient Ayurveda in modern ready-to-drink format." />
        <meta name="twitter:image" content={logoUrl} />
        <meta name="twitter:image:alt" content="Ravya Logo - Ayurvedic Wellness Drinks" />
        
        {/* Additional SEO */}
        <meta name="author" content="Ravya" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href="/Ravya_Logo.png" />
        <meta name="theme-color" content="#4A7C59" />
        
        {/* Structured Data (JSON-LD) - Enhanced for "Ravya" */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Ravya",
              "alternateName": "Ravya Health",
              "url": siteUrl,
              "logo": logoUrl,
              "image": logoUrl,
              "description": "Ravya - Ancient Ayurveda in modern ready-to-drink format. Shop Ravya immunity, sugar balance, and heart health drinks made with real herbs.",
              "brand": {
                "@type": "Brand",
                "name": "Ravya"
              },
              "sameAs": [
                "https://instagram.com/ravya.health",
                "https://wa.me/919868314313"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "email": "ravya.health@gmail.com",
                "availableLanguage": ["English", "Hindi"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Ravya",
              "url": siteUrl,
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${siteUrl}/?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>

      <Navbar />
      <CartDrawer />
      
      <main>
        <Hero products={products} />
        <TrustStrip />
        <BrandStory />
        <Story />
        <Products products={products} />
        <HowItWorks />
        <AyurvedicScience />
        <Reviews reviews={reviews} />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

