import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useCart } from '../context/CartContext';
import { getOrder } from '../utils/api';
import styles from '../styles/OrderSuccess.module.css';

export default function OrderSuccess() {
  const router = useRouter();
  const { orderId } = router.query;
  const { refreshCart } = useCart();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadOrder = async () => {
    try {
      const response = await getOrder(orderId);
      if (response.success) {
        setOrder(response.data);
      }
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  // Refresh cart when component mounts to ensure it's cleared
  useEffect(() => {
    if (refreshCart) {
      // Small delay to ensure backend has cleared the cart
      setTimeout(() => {
        refreshCart();
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  if (!order) {
    return (
      <div className={styles.container}>
        <h1>Order not found</h1>
        <button onClick={() => router.push('/')} className="btn btn-primary">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Order Success - RAVYA</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          
          <h1 className={styles.title}>Thank You for Your Trust! 🙏</h1>
          
          <div className={styles.ideaStageMessage}>
            <h2 className={styles.ideaStageTitle}>🚀 We&apos;re in Idea Stage!</h2>
            <p className={styles.message}>
              We want to be completely transparent with you. RAVYA is currently in the 
              <strong> idea and validation stage</strong>. We are gathering feedback from early 
              supporters like you to bring our Ayurvedic wellness drinks to life.
            </p>
            <p className={styles.message}>
              <strong>Your payment will be fully refunded within 5-7 business days.</strong> 
              This order was placed to help us understand customer interest and gather valuable feedback.
            </p>
            <p className={styles.message}>
              Your trust and support mean everything to us! 💚
            </p>
          </div>

          <div className={styles.orderDetails}>
            <div className={styles.detailRow}>
              <span>Order ID:</span>
              <strong>{order._id}</strong>
            </div>
            <div className={styles.detailRow}>
              <span>Total Amount:</span>
              <strong>₹{order.totalAmount}</strong>
            </div>
            <div className={styles.detailRow}>
              <span>Status:</span>
              <span className={styles.statusBadge}>{order.status}</span>
            </div>
          </div>

          <div className={styles.orderItems}>
            <h3>Order Items:</h3>
            {order.items.map((item, index) => (
              <div key={index} className={styles.item}>
                <span>{item.product?.name || 'Product'}</span>
                <span>Qty: {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className={styles.shippingInfo}>
            <h3>Shipping Address:</h3>
            <p><strong>{order.customerInfo.name}</strong></p>
            <p><strong>{order.customerInfo.phone}</strong></p>
            <p style={{ whiteSpace: 'pre-line', marginTop: '0.5rem' }}>
              {order.customerInfo.address.street}
            </p>
          </div>

          <div className={styles.actions}>
            <button onClick={() => router.push('/')} className="btn btn-primary">
              Continue Shopping
            </button>
          </div>

          <div className={styles.note}>
            <p>📧 Order confirmation has been sent to your email</p>
            <p>💰 Your full refund will be processed within 5-7 business days</p>
            <p>📬 We&apos;ll keep you updated on our journey and send special launch offers!</p>
          </div>
        </div>
      </div>
    </>
  );
}

