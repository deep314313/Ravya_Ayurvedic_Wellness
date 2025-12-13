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

  return (
    <>
      <Head>
        <title>RAVYA - Ayurvedic Wellness Drinks | Ready-to-Drink Functional Beverages</title>
        <meta name="description" content="Ancient Ayurveda in modern ready-to-drink format. Shop immunity, sugar balance, and heart health drinks made with real herbs." />
        <meta name="keywords" content="ayurvedic drinks, wellness beverages, immunity drinks, functional beverages, ready to drink, India" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="RAVYA - Ayurvedic Wellness Drinks" />
        <meta property="og:description" content="Sip Daily Ayurveda, Straight From the Bottle" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
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

