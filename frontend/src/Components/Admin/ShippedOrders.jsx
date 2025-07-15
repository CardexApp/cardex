import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Styles/Customers.css";
import { toast } from "react-toastify";
import { BASE_URL } from "../../Config";
import { generateInvoice } from "./Reusables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "jspdf-autotable"; 


const ShippedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          (order) => order.status === "dispatched"
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
        setError("Failed to fetch dispatched orders");
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

  // Update order status to "delivered"
  const updateStatus = async (orderId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.patch(
        `${BASE_URL}/admin/orders/${orderId}/`,
        {
          status: "dispatched",
        },
        { headers }
      );

      toast.success(`Order ${orderId} marked as Dispatched`);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className="customersPage">
      <div className="customersContent">
        <h2>Shipped Orders</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : orders.length === 0 ? (
          <p>No shipped orders found.</p>
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
                  <div className="orderRow" key={order.id}>
                    {/* Order ID */}
                    <div>{order.id}</div>

                    {/* User Info */}
                    <div>
                      {user.username}
                      <br />
                      <span className="customerEmail">{user.email}</span>
                    </div>

                    {/* Product List */}
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

                    {/* Date */}
                    <div>
                      {order?.created_at
                        ? new Date(order.created_at).toLocaleString()
                        : "N/A"}
                    </div>

                    {/* Status */}
                    <div>{order?.status || "Pending"}</div>

                    {/* Address */}
                    <div>
                      {order?.address?.house_address
                        ? `${order.address.house_address}, ${order.address.postal_code}`
                        : "No address"}
                    </div>

                    {/* Return Request */}
                    <div>
                      {order.returnRequested === true
                        ? "Yes"
                        : order.returnRequested === false
                        ? "No"
                        : "-"}
                    </div>

                    {/* Delivery Method */}
                    <div>{order?.deliveryMethod || "-"}</div>

                    {/* Actions */}
                    <div className="actions">
                      {/* Confirm Dispatch → Delivered */}
                      <button
                        className="iconBtn"
                        title="Confirm Delivered"
                        onClick={() => updateStatus(order.id)}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>

                      {/* Invoice Button */}
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

export default ShippedOrders;
