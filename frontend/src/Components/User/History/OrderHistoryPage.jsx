import { useEffect, useState } from "react";
import "./OrderHistoryPage.css";
import axios from "axios";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("/api/order/history", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch(() => console.error("Failed to load orders"));
  }, []);

  return (
    <div className="orderHistoryPage">
      <h2>Your Order History</h2>
      {orders.length === 0 ? (
        <p>No past orders</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="orderCard">
            <h3>
              Order #{order.id} - {order.status}
            </h3>
            <p>Total: £{order.total_price}</p>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.product_name} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistoryPage;
