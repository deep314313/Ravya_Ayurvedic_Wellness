import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LoginModal from './LoginModal';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { getItemCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
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

        <button 
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <button onClick={() => scrollToSection('products')} className={styles.navLink}>
            Shop
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className={styles.navLink}>
            How it works
          </button>
          <button onClick={() => scrollToSection('ayurvedic-science')} className={styles.navLink}>
            Ayurvedic Science
          </button>
          <button onClick={() => scrollToSection('reviews')} className={styles.navLink}>
            Reviews
          </button>
          <button onClick={() => scrollToSection('about')} className={styles.navLink}>
            About
          </button>
          <button onClick={() => scrollToSection('contact')} className={styles.navLink}>
            Contact
          </button>
          
          {isAuthenticated ? (
            <>
              <button onClick={openCart} className={styles.cartButton}>
                🛒 Cart
                {getItemCount() > 0 && (
                  <span className={styles.cartBadge}>{getItemCount()}</span>
                )}
              </button>
              <div className={styles.userMenu}>
                <span className={styles.userName}>Hi, {user?.name?.split(' ')[0]}</span>
                <button onClick={logout} className={styles.logoutButton}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <button onClick={() => setLoginModalOpen(true)} className={styles.navLink}>
                Login
              </button>
              <button onClick={() => scrollToSection('products')} className="btn btn-primary">
                Buy Now
              </button>
            </>
          )}
        </div>
      </div>
      
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </nav>
  );
};

export default Navbar;

