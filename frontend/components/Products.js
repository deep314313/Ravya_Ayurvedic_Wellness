import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LoginModal from './LoginModal';
import ProductDetailModal from './ProductDetailModal';
import styles from '../styles/Products.module.css';

const Products = ({ products = [] }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [addingToCart, setAddingToCart] = useState(null);
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();

  const benefitIcons = {
    'Strengthens immune system': '🛡️',
    'Anti-inflammatory properties': '🔥',
    'Rich in antioxidants': '💪',
    'Supports digestive health': '🌿',
    'Supports healthy blood sugar levels': '📊',
    'Improves metabolism': '⚡',
    'Digestive health support': '🌱',
    'Supports heart health': '❤️',
    'Improves blood circulation': '🔄',
    'Rich in nitrates': '💚',
    'Enhances stamina': '🏃'
  };

  // Map product names to image files
  const getProductImage = (productName) => {
    if (productName.includes('Golden Turmeric')) {
      return '/GoldenTurmericImmunity_Transparent.png';
    } else if (productName.includes('Jamun')) {
      return '/JamunLemonJuice_Transparent.png';
    } else if (productName.includes('Beetroot')) {
      return '/Beetroot_transparent.png';
    }
    return null;
  };

  return (
    <section className={styles.products} id="products">
      <div className={`container ${styles.productsContainer}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Our Wellness <span className="text-gradient">Drinks</span>
          </h2>
          <p className={styles.subtitle}>
            Three delicious blends, each crafted for a specific wellness goal. 
            Choose your focus, or enjoy all three for complete Ayurvedic support.
          </p>
        </div>

        <div className={styles.productGrid}>
          {products.map((product, index) => (
            <div
              key={product._id || index}
              className={`${styles.productCard} ${hoveredProduct === index ? styles.hovered : ''}`}
              onMouseEnter={() => setHoveredProduct(index)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{ 
                '--product-color': product.color,
                '--animation-delay': `${index * 0.1}s`
              }}
            >
              {/* Animated Background Glow */}
              <div className={styles.cardGlow} style={{ backgroundColor: product.color }}></div>
              
              {/* Liquid Wave Effect */}
              <div className={styles.liquidWave} style={{ backgroundColor: `${product.color}15` }}>
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                    style={{ fill: product.color, opacity: 0.1 }}></path>
                </svg>
              </div>

              <div className={styles.cardHeader}>
                <button 
                  className={styles.knowMoreButton}
                  onClick={() => setSelectedProduct(product)}
                  style={{ 
                    backgroundColor: product.color,
                    boxShadow: `0 4px 15px ${product.color}40`
                  }}
                >
                  Know More +
                </button>
              </div>

              {/* Real Product Bottle with 3D Effect */}
              <div className={styles.productBottle}>
                <div className={styles.bottleContainer3D}>
                  {/* Real Transparent Bottle Image */}
                  <div className={styles.bottleImageWrapper}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={getProductImage(product.name)}
                      alt={product.name}
                      className={styles.realBottleImage}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    {/* Animated Glow Behind Bottle */}
                    <div className={styles.bottleBackGlow} style={{ backgroundColor: product.color }}></div>
                  </div>
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.tagline}>{product.tagline}</p>

                {/* Visual Benefits Grid - Preview */}
                <div className={styles.benefits}>
                  <h4 className={styles.benefitsTitle}>✨ Key Benefits</h4>
                  <div className={styles.benefitsPreview}>
                    {product.benefits?.slice(0, 3).map((benefit, i) => (
                      <div key={i} className={styles.benefitPreviewItem}>
                        <span className={styles.checkIcon}>✓</span>
                        <span className={styles.benefitPreviewText}>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.priceSection}>
                    <div className={styles.price}>
                      <span className={styles.priceAmount}>₹{product.price}</span>
                      <span className={styles.priceUnit}>/ 250ml</span>
                    </div>
                    {product.inStock && (
                      <span className={styles.stockBadge} style={{ backgroundColor: `${product.color}20`, color: product.color }}>
                        ✓ In Stock
                      </span>
                    )}
                  </div>
                  
                  <button 
                    className={`${styles.addToCartBtn}`}
                    onClick={() => handleAddToCart(product._id)}
                    disabled={addingToCart === product._id}
                    style={{ backgroundColor: product.color }}
                  >
                    {addingToCart === product._id ? (
                      <>
                        <span className={styles.btnLoader}></span>
                        Adding...
                      </>
                    ) : (
                      <>
                        <span className={styles.cartIcon}>🛒</span>
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Not sure which one to choose?</h3>
            <p className={styles.ctaSubtitle}>Click &quot;Know More&quot; on any product to see complete details</p>
            <button className="btn btn-accent" style={{ marginTop: '1rem' }}>
              🎁 Buy Bundle & Save 20%
            </button>
          </div>
        </div>
      </div>
      
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
      <ProductDetailModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCartFromModal}
      />
    </section>
  );

  async function handleAddToCart(productId) {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      return;
    }

    try {
      setAddingToCart(productId);
      await addItem(productId, 1);
    } catch (error) {
      alert('Failed to add to cart');
    } finally {
      setAddingToCart(null);
    }
  }

  async function handleAddToCartFromModal(product) {
    if (!isAuthenticated) {
      setSelectedProduct(null);
      setLoginModalOpen(true);
      return;
    }

    try {
      await addItem(product._id, 1);
    } catch (error) {
      alert('Failed to add to cart');
    }
  }
};

export default Products;

