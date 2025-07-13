import React, { createContext, useState, useContext, useEffect } from "react";

// Key used for localStorage
const STORAGE_KEY = "cardex_orders";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // Load from localStorage on first mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setOrders(JSON.parse(stored));
      } catch {
        console.warn("Failed to parse saved orders");
      }
    }
  }, []);

  // Save to localStorage when orders change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const updateOrder = (id, updates) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, ...updates } : order))
    );
  };

  const addOrder = (newOrder) => {
    setOrders((prev) => [...prev, newOrder]);
  };

  const removeOrder = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <OrdersContext.Provider
      value={{ orders, setOrders, updateOrder, addOrder, removeOrder }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
