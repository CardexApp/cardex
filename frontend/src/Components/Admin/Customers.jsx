import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Styles/Customers.css";
import { BASE_URL } from "../../Config";

const Customers = () => {
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

        const response = await axios.get(`${BASE_URL}/orders/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(
          Array.isArray(response.data)
            ? response.data
            : response.data.results || []
        );
      } catch (err) {
        console.error(
          "Error fetching orders:",
          err.response || err.message || err
        );
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="customersPage">
      <div className="customersContent">
        <h2>Customer Orders</h2>

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
              <div>User ID</div>
              <div>Products</div>
              <div>Date</div>
              <div>Status</div>
              <div>Delivery</div>
              <div>Return Req</div>
              <div>Total</div>
              <div>Actions</div>
            </div>

            <div className="customerTableBody shippedGrid">
              {orders.map((order) => (
                <div className="orderRow" key={order.id}>
                  <div>{order.id}</div>
                  <div>{order.user}</div>

                  <div>
                    <ul className="itemList">
                      {order.items?.map((item, idx) => (
                        <li key={idx}>
                          Product ID: {item.product}, Qty: {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>{new Date(order.created_at).toLocaleString()}</div>
                  <div>{order.status}</div>
                  <div>{order.deliveryMethod || "-"}</div>
                  <div>{order.returnRequested ? "Yes" : "No"}</div>
                  <div>{order.items?.length || 0}</div>

                  <div className="actions">
                    <button className="viewBtn">View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
