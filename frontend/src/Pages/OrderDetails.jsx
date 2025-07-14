import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Config";

const OrderDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!state?.orderId) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("accessToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await axios.get(`${BASE_URL}/orders/${state.orderId}`, { headers });
        setOrder(res.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [state]);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading order details...</p>;
  }

  if (!order) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>No Order Found</h2>
        <button onClick={() => navigate("/")} style={{ marginTop: "1rem" }}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>Order Confirmation</h2>
      <p><strong>Name:</strong> {order.name}</p>
      <p><strong>Email:</strong> {order.email}</p>
      <p><strong>Address:</strong> {order.address}</p>
      <hr />
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Payment Method:</strong> Card</p>
      <p><strong>Total:</strong> £{order.totalPrice}</p>

      <h4 style={{ marginTop: "2rem" }}>Items:</h4>
      <ul>
        {order.items?.map((item, idx) => (
          <li key={idx}>
            {item.productName} - {item.quantity} × {item.price}
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "2rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderDetails;
