import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { applyCoupon, removeCoupon, getCoupons, createPaymentOrder, verifyPayment, paymentFailed } from '../utils/api';
import styles from '../styles/Checkout.module.css';

export default function Checkout() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { cart, refreshCart, clearCart } = useCart();
  
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    address: ''
  });
  
  // Pre-fill user details when component mounts
  useEffect(() => {
    if (user) {
      setShippingAddress(prev => ({
        ...prev,
        name: user.name || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);
  
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    // Don't redirect if order is being placed
    if (orderPlaced) return;
    
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    if (!cart || cart.items.length === 0) {
      router.push('/');
      return;
    }

    // Load available coupons
    loadCoupons();
  }, [isAuthenticated, cart, router, orderPlaced]);

  const loadCoupons = async () => {
    try {
      const response = await getCoupons();
      if (response.success) {
        setAvailableCoupons(response.data);
      }
    } catch (error) {
      console.error('Error loading coupons:', error);
    }
  };

  const handleApplyCoupon = async (code = couponCode) => {
    if (!code) return;
    
    setCouponLoading(true);
    setCouponError('');

    try {
      const response = await applyCoupon(user.id, code);
      if (response.success) {
        await refreshCart();
        setCouponCode('');
      }
    } catch (error) {
      setCouponError(error.response?.data?.message || 'Invalid coupon');
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      await removeCoupon(user.id);
      await refreshCart();
    } catch (error) {
      console.error('Error removing coupon:', error);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    // Validate only name, phone, and address
    if (!shippingAddress.name || !shippingAddress.phone || !shippingAddress.address) {
      alert('Please fill in all required fields: Name, Phone, and Address');
      return;
    }
    
    // Validate name (minimum 2 characters)
    if (shippingAddress.name.trim().length < 2) {
      alert('Please enter a valid name');
      return;
    }
    
    // Validate phone (10 digits, starts with 6-9)
    if (!/^[6-9]\d{9}$/.test(shippingAddress.phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    
    // Simple address check - just ensure it's not empty
    if (shippingAddress.address.trim().length < 5) {
      alert('Please enter your delivery address');
      return;
    }

    setProcessing(true);

    try {
      // IDEA STAGE: Direct order creation without payment
      // Create order
      const orderResponse = await createPaymentOrder(user.id, shippingAddress);
      
      if (!orderResponse.success) {
        alert('Failed to create order');
        setProcessing(false);
        return;
      }

      const { orderId } = orderResponse.data;

      // Mark order as placed to prevent redirect
      setOrderPlaced(true);
      
      // Clear cart from frontend
      clearCart();
      
      // Redirect to thank you page
      router.push(`/order-success?orderId=${orderId}`);

      // RAZORPAY CODE - COMMENTED OUT FOR IDEA STAGE
      /*
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load payment gateway. Please try again.');
        setProcessing(false);
        return;
      }

      const { orderId, razorpayOrderId, amount, currency, razorpayKeyId } = orderResponse.data;

      // Razorpay options
      const options = {
        key: razorpayKeyId,
        amount: amount,
        currency: currency,
        name: 'RAVYA',
        description: 'Ayurvedic Wellness Drinks',
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await verifyPayment({
              orderId: orderId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            });

            if (verifyResponse.success) {
              // Clear cart from frontend
              clearCart();
              // Payment successful
              router.push(`/order-success?orderId=${orderId}`);
            }
          } catch (error) {
            alert('Payment verification failed');
            await paymentFailed(orderId, error.message);
            setProcessing(false);
          }
        },
        prefill: {
          name: shippingAddress.name,
          contact: shippingAddress.phone,
          email: user.email || ''
        },
        notes: {
          customer_name: user.name,
          delivery_address: `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}`
        },
        theme: {
          color: '#F4B942'
        },
        modal: {
          ondismiss: async function() {
            await paymentFailed(orderId, 'Payment cancelled by user');
            setProcessing(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      */
    } catch (error) {
      console.error('Order error:', error);
      alert('Failed to place order. Please try again.');
      setProcessing(false);
    }
  };

  if (!cart) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <>
      <Head>
        <title>Checkout - RAVYA</title>
      </Head>

      <div className={styles.checkout}>
        <div className="container">
          <button onClick={() => router.push('/')} className={styles.backButton}>
            ← Back to Shop
          </button>

          <h1 className={styles.title}>Checkout</h1>

          <div className={styles.checkoutGrid}>
            {/* Left Column - Shipping & Payment */}
            <div className={styles.leftColumn}>
              {/* Shipping Address */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Delivery Details</h2>
                <p className={styles.sectionNote}>
                  📦 Simple & Fast Checkout - Just 3 fields!
                </p>
                <div className={styles.form}>
                  <div className={styles.formGroup}>
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={shippingAddress.name}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                    />
                    <small>You can edit if needed</small>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      pattern="[0-9]{10}"
                      maxLength="10"
                      required
                    />
                    <small>You can edit if needed</small>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Complete Delivery Address *</label>
                    <textarea
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                      placeholder="Enter your complete delivery address (e.g., House No, Street, Area, City, State, Pincode)"
                      rows="4"
                      required
                      className={styles.textarea}
                    />
                    <small>Write your full address as you would on a package</small>
                  </div>
                  
                  <p className={styles.requiredNote}>
                    * All fields are mandatory
                  </p>
                </div>
              </div>

              {/* Available Coupons */}
              {availableCoupons.length > 0 && !cart.couponCode && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Available Offers</h2>
                  <div className={styles.coupons}>
                    {availableCoupons.map((coupon) => (
                      <div key={coupon.code} className={styles.couponCard}>
                        <div className={styles.couponInfo}>
                          <h4>{coupon.code}</h4>
                          <p>{coupon.description}</p>
                        </div>
                        <button
                          onClick={() => handleApplyCoupon(coupon.code)}
                          className="btn btn-secondary"
                          disabled={couponLoading}
                        >
                          Apply
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className={styles.rightColumn}>
              <div className={styles.orderSummary}>
                <h2 className={styles.sectionTitle}>Order Summary</h2>

                <div className={styles.orderItems}>
                  {cart.items.map((item) => (
                    <div key={item.product._id} className={styles.orderItem}>
                      <div 
                        className={styles.itemImage}
                        style={{ backgroundColor: item.product.color }}
                      ></div>
                      <div className={styles.itemInfo}>
                        <h4>{item.product.name}</h4>
                        <p>Qty: {item.quantity}</p>
                      </div>
                      <p className={styles.itemPrice}>₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                {/* Coupon Input */}
                {!cart.couponCode && (
                  <div className={styles.couponInput}>
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter coupon code"
                    />
                    <button
                      onClick={() => handleApplyCoupon()}
                      disabled={couponLoading || !couponCode}
                    >
                      {couponLoading ? '...' : 'Apply'}
                    </button>
                  </div>
                )}

                {couponError && (
                  <div className={styles.couponError}>{couponError}</div>
                )}

                {/* Order Totals */}
                <div className={styles.totals}>
                  <div className={styles.totalRow}>
                    <span>Subtotal</span>
                    <span>₹{cart.subtotal}</span>
                  </div>

                  {cart.discount > 0 && (
                    <div className={`${styles.totalRow} ${styles.discount}`}>
                      <span>
                        Discount ({cart.couponCode})
                        <button onClick={handleRemoveCoupon} className={styles.removeCoupon}>
                          ✕
                        </button>
                      </span>
                      <span>-₹{cart.discount}</span>
                    </div>
                  )}

                  <div className={styles.totalRow}>
                    <span>Delivery Charge</span>
                    <span className={styles.freeDelivery}>FREE ✅</span>
                  </div>

                  <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                    <span>Total</span>
                    <span>₹{cart.total}</span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  className="btn btn-primary"
                  disabled={processing}
                  style={{ width: '100%' }}
                >
                  {processing ? 'Processing...' : `Place Order - ₹${cart.total}`}
                </button>

                <div className={styles.paymentNote}>
                  <p>🔒 Secure payment via Razorpay</p>
                  <p>All major cards accepted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

