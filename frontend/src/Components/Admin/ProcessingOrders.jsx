import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Styles/Customers.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Config";
import { generateInvoice } from "./Reusables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFileInvoice } from "@fortawesome/free-solid-svg-icons";

const ProcessingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const [orderRes, productRes, userRes] = await Promise.all([
          axios.get(`${BASE_URL}/admin/orders/`, { headers }),
          axios.get(`${BASE_URL}/admin/products/`, { headers }),
          axios.get(`${BASE_URL}/admin/users/`, { headers }),
        ]);

        const allOrders = Array.isArray(orderRes.data)
          ? orderRes.data
          : orderRes.data.results || [];

        const filtered = allOrders.filter(
          (order) => order.status === "processing"
        );

        const productMap = {};
        productRes.data.forEach((p) => {
          productMap[p.id] = { name: p.name, price: p.price };
        });

        const userMap = {};
        userRes.data.forEach((u) => {
          userMap[u.id] = { username: u.username, email: u.email };
        });

        setOrders(filtered);
        setProducts(productMap);
        setUsers(userMap);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch processing orders");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserInfo = (userId) =>
    users[userId] || { username: "Unknown", email: "Unknown" };

  const getProductInfo = (productId) =>
    products[productId] || { name: "Unknown", price: 0 };

  // Update order status to "dispatched"
  const updateStatus = async (orderId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.patch(
        `${BASE_URL}/admin/orders/${orderId}/`,
        {
          status: "processing",
        },
        { headers }
      );

      toast.success(`Order ${orderId} marked as Processed`);
      setOrders(
        (prev) => prev.filter((order) => order.id !== orderId) // Remove from current view
      );
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className="customersPage">
      <div className="customersContent">
        <h2>Processing Orders</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : orders.length === 0 ? (
          <p>No processing orders found.</p>
        ) : (
          <div className="customerTableWrapper">
            <div className="customerTableHeader shippedGrid">
              <div>Order ID</div>
              <div>Customer</div>
              <div>Products</div>
              <div>Date</div>
              <div>Status</div>
              <div>Address</div>
              <div>Return Req</div>
              <div>Delivery</div>
              <div>Actions</div>
            </div>

            <div className="customerTableBody shippedGrid">
              {orders.map((order) => {
                const user = getUserInfo(order.user);
                return (
                  <div
                    className="orderRow"
                    key={order.id}
                    id={`order-${order.id}`}
                  >
                    <div>{order.id}</div>

                    <div>
                      {user.username}
                      <br />
                      <span className="customerEmail">{user.email}</span>
                    </div>

                    <div>
                      {Array.isArray(order.items) && order.items.length > 0 ? (
                        <ul className="itemList">
                          {order.items.map((item, idx) => {
                            const product = getProductInfo(item.product);
                            return (
                              <li key={idx}>
                                {product.name} (x{item.quantity}) – ₦
                                {product.price}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <span>No items</span>
                      )}
                    </div>

                    <div>
                      {order?.created_at
                        ? new Date(order.created_at).toLocaleString()
                        : "N/A"}
                    </div>

                    <div>{order?.status || "Pending"}</div>

                    <div>
                      {order?.address?.house_address
                        ? `${order.address.house_address}, ${order.address.postal_code}`
                        : "No address"}
                    </div>

                    <div>
                      {order.returnRequested === true
                        ? "Yes"
                        : order.returnRequested === false
                        ? "No"
                        : "-"}
                    </div>

                    <div>{order?.deliveryMethod || "-"}</div>

                    <div className="actions">
                      {/* ✅ Confirm Processing → Dispatched */}
                      <button
                        className="iconBtn"
                        title="Confirm Processing"
                        onClick={() => updateStatus(order.id)}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>

                      {/* 📄 Generate Invoice */}
                      <button
                        className="iconBtn"
                        title="Invoice"
                        onClick={() => generateInvoice(order, users, products)}
                      >
                        <FontAwesomeIcon icon={faFileInvoice} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingOrders;
