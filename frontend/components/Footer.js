import { useState } from 'react';
import { subscribeNewsletter } from '../utils/api';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await subscribeNewsletter(email);
      setStatus({ type: 'success', message: response.message });
      setEmail('');
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to subscribe. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerTop}>
          <div className={styles.footerColumn}>
            <div className={styles.logo}>
              <img 
                src="/Ravya_Logo_Transparent.png" 
                alt="RAVYA Logo" 
                className={styles.logoImage}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className={styles.logoTextWrapper}>
                <span className={styles.logoText}>RAVYA</span>
                <span className={styles.logoSubtext}>Ayurvedic Wellness</span>
              </div>
            </div>
            <p className={styles.description}>
              Ancient Ayurveda in modern ready-to-drink format. 
              Sip daily wellness, straight from the bottle.
            </p>
            <div className={styles.contactInfo}>
              <a href="mailto:ravya.health@gmail.com" className={styles.contactLink}>
                📧 ravya.health@gmail.com
              </a>
              <a href="tel:+919868314313" className={styles.contactLink}>
                📞 +91 98683 14313
              </a>
              <a 
                href="https://wa.me/919868314313?text=Hello%20RAVYA%2C%20I%20would%20like%20to%20know%20more%20about%20your%20Ayurvedic%20wellness%20drinks%21" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.whatsappLink}
              >
                💬 WhatsApp Us
              </a>
            </div>
            <div className={styles.social}>
              <a href="#" className={styles.socialIcon} aria-label="Facebook">📘</a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">📷</a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter">🐦</a>
              <a href="#" className={styles.socialIcon} aria-label="YouTube">📺</a>
            </div>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Shop</h4>
            <ul className={styles.linkList}>
              <li><button onClick={() => scrollToSection('products')}>All Products</button></li>
              <li><button onClick={() => scrollToSection('products')}>Immunity Drinks</button></li>
              <li><button onClick={() => scrollToSection('products')}>Sugar Balance</button></li>
              <li><button onClick={() => scrollToSection('products')}>Heart Health</button></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Learn</h4>
            <ul className={styles.linkList}>
              <li><button onClick={() => scrollToSection('about')}>About Us</button></li>
              <li><button onClick={() => scrollToSection('ayurvedic-science')}>Ayurvedic Science</button></li>
              <li><button onClick={() => scrollToSection('how-it-works')}>How It Works</button></li>
              <li><button onClick={() => scrollToSection('faq')}>FAQ</button></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Support</h4>
            <ul className={styles.linkList}>
              <li><button onClick={() => scrollToSection('contact')}>Contact Us</button></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Returns & Refunds</a></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Newsletter</h4>
            <p className={styles.newsletterText}>
              Get Ayurvedic wellness tips & launch offers
            </p>
            <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                disabled={isSubmitting}
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? '...' : '→'}
              </button>
            </form>
            {status.message && (
              <div className={`${styles.status} ${styles[status.type]}`}>
                {status.message}
              </div>
            )}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.bottomLeft}>
            <p>&copy; 2026 RAVYA. All rights reserved.</p>
          </div>
          <div className={styles.bottomRight}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

