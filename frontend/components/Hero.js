import { useEffect, useState } from 'react';
import styles from '../styles/Hero.module.css';

const Hero = ({ products }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} id="home">
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <div className={`${styles.heroLeft} ${mounted ? styles.fadeIn : ''}`}>
            <div className={styles.badge}>
              <span>🌿</span>
              <span style={{ display: 'inline-block' }}>100% Ayurvedic • No Artificial Ingredients</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              Sip Daily Ayurveda,
              <br />
              <span className="text-gradient">Straight From the Bottle</span>
            </h1>
            
            {/* Price Badge - USP */}
            <div className={styles.priceBanner}>
              <span className={styles.priceTag}>Starting at just</span>
              <span className={styles.priceAmount}>₹69/-</span>
              <span className={styles.priceSubtext}>per bottle</span>
            </div>
            
            <p className={styles.heroSubtitle}>
              Ready-to-drink Ayurvedic wellness blends for immunity, sugar balance, 
              and heart health. Made with real herbs, zero artificial junk. 
              Ancient wisdom, modern convenience.
            </p>

            <div className={styles.heroCtas}>
              <button onClick={scrollToProducts} className="btn btn-primary">
                Shop All Drinks
              </button>
              <button onClick={() => document.getElementById('ayurvedic-science')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-secondary">
                See Ingredients
              </button>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10,000+</span>
                <span className={styles.statLabel}>Bottles Enjoyed</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Natural Herbs</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>3</span>
                <span className={styles.statLabel}>Wellness Blends</span>
              </div>
            </div>
          </div>

          <div className={`${styles.heroRight} ${mounted ? styles.fadeIn : ''}`}>
            <div className={styles.bannerContainer}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/Banner_3.png" 
                alt="RAVYA Ayurvedic Wellness Drinks" 
                className={styles.bannerImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

