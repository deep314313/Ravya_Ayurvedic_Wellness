import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/CartDrawer.module.css';

const CartDrawer = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, cartOpen, closeCart, updateQuantity, removeItem } = useCart();

  if (!cartOpen) return null;

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    // If quantity becomes 0, remove the item
    if (newQuantity < 1) {
      await handleRemove(productId);
      return;
    }
    try {
      await updateQuantity(productId, newQuantity);
    } catch (error) {
      alert('Failed to update quantity');
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeItem(productId);
    } catch (error) {
      alert('Failed to remove item');
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={closeCart}></div>
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2>Your Cart</h2>
          <button className={styles.closeButton} onClick={closeCart}>✕</button>
        </div>

        <div className={styles.content}>
          {!cart || cart.items.length === 0 ? (
            <div className={styles.emptyCart}>
              <div className={styles.emptyIcon}>🛒</div>
              <p>Your cart is empty</p>
              <button onClick={closeCart} className="btn btn-secondary">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className={styles.items}>
                {cart.items.map((item) => (
                  <div key={item.product._id} className={styles.cartItem}>
                    <div 
                      className={styles.productImage}
                      style={{ backgroundColor: item.product.color }}
                    ></div>
                    
                    <div className={styles.itemDetails}>
                      <h4>{item.product.name}</h4>
                      <p className={styles.price}>₹{item.product.price}</p>
                      
                      <div className={styles.quantity}>
                        <button
                          onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                          className={styles.quantityBtn}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                          className={styles.quantityBtn}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className={styles.itemActions}>
                      <p className={styles.itemTotal}>₹{item.price * item.quantity}</p>
                      <button 
                        onClick={() => handleRemove(item.product._id)}
                        className={styles.removeButton}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>₹{cart.subtotal}</span>
                </div>
                
                {cart.discount > 0 && (
                  <>
                    <div className={`${styles.summaryRow} ${styles.discount}`}>
                      <span>Discount ({cart.couponCode})</span>
                      <span>-₹{cart.discount}</span>
                    </div>
                  </>
                )}
                
                <div className={`${styles.summaryRow} ${styles.total}`}>
                  <span>Total</span>
                  <span>₹{cart.total}</span>
                </div>

                <button onClick={handleCheckout} className="btn btn-primary" style={{ width: '100%' }}>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;

