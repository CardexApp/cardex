import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../Config";
import "./OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [returnData, setReturnData] = useState({});
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("accessToken");

  // Fetch all orders
  useEffect(() => {
    axios
      .get(`${BASE_URL}/orders/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to fetch orders", err));
  }, []);

  // Request return with reason input
  const requestReturn = async (orderId) => {
    const reason = prompt("Please enter your reason for the return:");
    if (!reason) return;

    setLoading(true);

    try {
      const response = await axios.patch(
        `${BASE_URL}/orders/${orderId}/return/`,
        { reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReturnData((prev) => ({
        ...prev,
        [orderId]: response.data,
      }));
    } catch (error) {
      console.error("Return request failed:", error);
      setReturnData((prev) => ({
        ...prev,
        [orderId]: { error: true },
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ordersPage">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="ordersList">
          {orders.map((order) => (
            <li key={order.id} className="orderItem">
              {/* Car Info */}
              {order.product && (
                <div className="orderInfo">
                  <img
                    src={order.product.image}
                    alt={order.product.name}
                    className="carImage"
                  />
                  <div className="carDetails">
                    <p><strong>{order.product.name}</strong></p>
                  </div>
                </div>
              )}

              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Status:</strong> {order.status}</p>

              <button
                onClick={() => requestReturn(order.id)}
                disabled={order.status === "Delivered"}
              >
                Request Return
              </button>

              {order.status === "Delivered" && (
                <p style={{ color: "gray", fontSize: "0.9rem" }}>
                  Return not allowed after delivery.
                </p>
              )}

              {loading && <p>Processing return...</p>}

              {returnData[order.id] && !returnData[order.id].error && (
                <div className="returnInfo">
                  <p><strong>Return Status:</strong> {returnData[order.id].status}</p>
                  {/* <p><strong>Reason:</strong> {returnData[order.id].reason}</p> */}
                </div>
              )}

              {returnData[order.id]?.error && (
                <p style={{ color: "red" }}>
                  Return request failed.
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
