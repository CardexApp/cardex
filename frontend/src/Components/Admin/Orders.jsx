import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Styles/Customers.css";
import { BASE_URL } from "../../Config";
import { generateInvoice } from "./Reusables";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${BASE_URL}/admin/orders/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(Array.isArray(res.data) ? res.data : res.data.results || []);
      } catch (err) {
        setError("Failed to fetch admin orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.patch(
        `${BASE_URL}/admin/orders/${id}/`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`Order #${id} marked as ${newStatus}`);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, ...res.data } : order
        )
      );
    } catch (err) {
      toast.error("Failed to update order status");
      console.error(err);
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div style={{ padding: "2rem" }} className="customersPage">
      <h2>All Orders</h2>

      <div className="orderRow heading">
        <div>Order ID</div>
        <div>Customer</div>
        <div>Items</div>
        <div>Status</div>
        <div>Date</div>
        <div className="actions">Actions</div>
      </div>

      {orders.map((order) => (
        <div key={order.id} className="orderRow">
          <div>#{order.id}</div>
          <div>User #{order.user}</div>
          <div>
            {order.items?.map((item, i) => (
              <div key={i}>
                Product #{item.product} × {item.quantity}
              </div>
            ))}
          </div>
          <div>{order.status}</div>
          <div>{new Date(order.created_at).toLocaleString()}</div>
          <div className="actions">
            <button onClick={() => updateOrderStatus(order.id, "shipped")}>
              Mark Shipped
            </button>
            <button onClick={() => updateOrderStatus(order.id, "delivered")}>
              Mark Delivered
            </button>
            <button onClick={() => generateInvoice(order)}>Invoice</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
