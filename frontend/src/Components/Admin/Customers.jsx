import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Styles/Customers.css";
import { BASE_URL } from "../../Config";
import { generateInvoice } from "./Reusables";
import { toast } from "react-toastify";

const Customers = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch everything in parallel
        const [orderRes, productRes, userRes] = await Promise.all([
          axios.get(`${BASE_URL}/admin/orders/`, { headers }),
          axios.get(`${BASE_URL}/admin/products/`, { headers }),
          axios.get(`${BASE_URL}/admin/users/`, { headers }),
        ]);

        const ordersData = Array.isArray(orderRes.data)
          ? orderRes.data
          : orderRes.data.results || [];

        // Map product ID to { name, price }
        const productMap = {};
        productRes.data.forEach((product) => {
          productMap[product.id] = {
            name: product.name,
            price: product.price,
          };
        });

        // Map user ID to { username, email }
        const userMap = {};
        userRes.data.forEach((user) => {
          userMap[user.id] = {
            username: user.username,
            email: user.email,
          };
        });

        setOrders(ordersData);
        setProducts(productMap);
        setUsers(userMap);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch admin orders or data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserInfo = (userId) =>
    users[userId] || { username: "N/A", email: "N/A" };
  const getProductInfo = (productId) =>
    products[productId] || { name: "N/A", price: "N/A" };

  return (
    <div className="customersPage">
      <div className="customersContent">
        <h2>Your Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
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
                    <div>{order?.id ?? "N/A"}</div>

                    {/* User Info */}
                    <div>
                      {user.username} <br />
                      <span className="customerEmail">{user.email}</span>
                    </div>

                    {/* Product Items */}
                    <div>
                      {Array.isArray(order.items) && order.items.length > 0 ? (
                        <ul className="itemList">
                          {order.items.map((item, idx) => {
                            const product = getProductInfo(item.product);
                            return (
                              <li key={idx}>
                                {product.name} (x{item.quantity}) – $
                                {product.price}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <span>No items</span>
                      )}
                    </div>

                    {/* Created At */}
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

                    {/* Return Request – placeholder if missing */}
                    <div>
                      {order.returnRequested === true
                        ? "Yes"
                        : order.returnRequested === false
                        ? "No"
                        : "-"}
                    </div>

                    {/* Delivery Method – optional */}
                    <div>{order?.deliveryMethod ?? "-"}</div>

                    {/* Actions */}
                    <div className="actions">
                      <button
                        className="viewBtn"
                        onClick={() => generateInvoice(order, users, products)}
                      >
                        Invoice
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

export default Customers;
