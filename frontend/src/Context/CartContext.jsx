import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== indexToRemove));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

