import { useEffect } from 'react';
import { FaTimes, FaShoppingCart, FaLeaf, FaCheck } from 'react-icons/fa';
import styles from '../styles/ProductDetailModal.module.css';

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  // Get product image
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

  return (
    <>
      {/* Backdrop Overlay */}
      <div className={styles.modalOverlay} onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className={styles.modalContainer}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>

        <div className={styles.modalContent}>
          {/* LEFT SIDE - Product Bottle */}
          <div className={styles.leftSection}>
            <div className={styles.productShowcase}>
              {/* Glowing Background */}
              <div 
                className={styles.glowingBg} 
                style={{ backgroundColor: product.color }}
              ></div>
              
              {/* Product Image */}
              <img 
                src={getProductImage(product.name)}
                alt={product.name}
                className={styles.bottleImage}
              />
            </div>

            {/* Product Badge */}
            <div className={styles.productBadge} style={{ backgroundColor: product.color }}>
              <FaLeaf /> {product.tag}
            </div>
          </div>

          {/* RIGHT SIDE - Product Details */}
          <div className={styles.rightSection}>
            {/* Product Title */}
            <h2 className={styles.productTitle}>{product.name}</h2>
            <p className={styles.productTagline}>{product.tagline}</p>

            {/* Benefits Section */}
            <div className={styles.detailSection}>
              <h3 className={styles.sectionTitle}>
                <FaCheck className={styles.sectionIcon} /> Key Benefits
              </h3>
              <div className={styles.benefitsList}>
                {product.benefits.map((benefit, idx) => (
                  <div key={idx} className={styles.benefitItem}>
                    <span className={styles.benefitIcon}>
                      {benefitIcons[benefit] || '✓'}
                    </span>
                    <span className={styles.benefitText}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ingredients Section */}
            <div className={styles.detailSection}>
              <h3 className={styles.sectionTitle}>
                <FaLeaf className={styles.sectionIcon} /> Ayurvedic Ingredients
              </h3>
              <div className={styles.ingredientsList}>
                {product.keyIngredients.map((ingredient, idx) => (
                  <span key={idx} className={styles.ingredientChip}>
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutritional Info */}
            <div className={styles.detailSection}>
              <h3 className={styles.sectionTitle}>Nutritional Information</h3>
              <div className={styles.nutritionGrid}>
                <div className={styles.nutritionItem}>
                  <span className={styles.nutritionLabel}>Calories</span>
                  <span className={styles.nutritionValue}>{product.nutritionalInfo.calories}</span>
                </div>
                <div className={styles.nutritionItem}>
                  <span className={styles.nutritionLabel}>Sugar</span>
                  <span className={styles.nutritionValue}>{product.nutritionalInfo.sugar}</span>
                </div>
                <div className={styles.nutritionItem}>
                  <span className={styles.nutritionLabel}>Carbs</span>
                  <span className={styles.nutritionValue}>{product.nutritionalInfo.carbs}</span>
                </div>
                <div className={styles.nutritionItem}>
                  <span className={styles.nutritionLabel}>Protein</span>
                  <span className={styles.nutritionValue}>{product.nutritionalInfo.protein}</span>
                </div>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className={styles.priceSection}>
              <div className={styles.priceInfo}>
                <span className={styles.priceLabel}>Price:</span>
                <span className={styles.priceAmount}>₹{product.price}</span>
                <span className={styles.priceUnit}>/ 250ml</span>
              </div>
              
              <button 
                className={styles.addToCartButton}
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                style={{ backgroundColor: product.color }}
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

