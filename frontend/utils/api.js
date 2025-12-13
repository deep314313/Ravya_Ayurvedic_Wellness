import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getProduct = async (slug) => {
  const response = await api.get(`/products/${slug}`);
  return response.data;
};

// Orders
export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const getOrder = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

// Reviews
export const getReviews = async () => {
  const response = await api.get('/reviews');
  return response.data;
};

export const getProductReviews = async (productId) => {
  const response = await api.get(`/reviews/product/${productId}`);
  return response.data;
};

export const createReview = async (reviewData) => {
  const response = await api.post('/reviews', reviewData);
  return response.data;
};

// Newsletter
export const subscribeNewsletter = async (email) => {
  const response = await api.post('/newsletter/subscribe', { email });
  return response.data;
};

// Contact
export const submitContact = async (contactData) => {
  const response = await api.post('/contact', contactData);
  return response.data;
};

// Auth - Simple Login (No OTP)
export const simpleLogin = async (phone, name) => {
  const response = await api.post('/auth/login', { phone, name });
  return response.data;
};

export const getUserProfile = async (userId) => {
  const response = await api.get(`/auth/profile/${userId}`);
  return response.data;
};

export const updateUserProfile = async (userId, data) => {
  const response = await api.put(`/auth/profile/${userId}`, data);
  return response.data;
};

// Cart
export const getCart = async (userId) => {
  const response = await api.get(`/cart/${userId}`);
  return response.data;
};

export const addToCart = async (userId, productId, quantity = 1) => {
  const response = await api.post('/cart/add', { userId, productId, quantity });
  return response.data;
};

export const updateCartItem = async (userId, productId, quantity) => {
  const response = await api.put('/cart/update', { userId, productId, quantity });
  return response.data;
};

export const removeFromCart = async (userId, productId) => {
  const response = await api.delete('/cart/remove', { data: { userId, productId } });
  return response.data;
};

export const applyCoupon = async (userId, couponCode) => {
  const response = await api.post('/cart/apply-coupon', { userId, couponCode });
  return response.data;
};

export const removeCoupon = async (userId) => {
  const response = await api.post('/cart/remove-coupon', { userId });
  return response.data;
};

export const clearCart = async (userId) => {
  const response = await api.delete(`/cart/clear/${userId}`);
  return response.data;
};

// Coupons
export const getCoupons = async () => {
  const response = await api.get('/coupons');
  return response.data;
};

export const validateCoupon = async (code, orderValue) => {
  const response = await api.post('/coupons/validate', { code, orderValue });
  return response.data;
};

// Payment
export const createPaymentOrder = async (userId, shippingAddress) => {
  const response = await api.post('/payment/create-order', { userId, shippingAddress });
  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await api.post('/payment/verify-payment', paymentData);
  return response.data;
};

export const paymentFailed = async (orderId, error) => {
  const response = await api.post('/payment/payment-failed', { orderId, error });
  return response.data;
};

export default api;
