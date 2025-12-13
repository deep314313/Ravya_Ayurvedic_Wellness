import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getCart, addToCart as addToCartAPI, updateCartItem, removeFromCart as removeFromCartAPI } from '../utils/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Load cart when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated, user]);

  const fetchCart = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await getCart(user.id);
      if (response.success) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId, quantity = 1) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const response = await addToCartAPI(user.id, productId, quantity);
      if (response.success) {
        setCart(response.data);
        setCartOpen(true);
        return response;
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) return;

    try {
      const response = await updateCartItem(user.id, productId, quantity);
      if (response.success) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  };

  const removeItem = async (productId) => {
    if (!user) return;

    try {
      const response = await removeFromCartAPI(user.id, productId);
      if (response.success) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const getItemCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCart(null);
    setCartOpen(false);
  };

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const value = {
    cart,
    loading,
    cartOpen,
    addItem,
    updateQuantity,
    removeItem,
    getItemCount,
    openCart,
    closeCart,
    refreshCart: fetchCart,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

