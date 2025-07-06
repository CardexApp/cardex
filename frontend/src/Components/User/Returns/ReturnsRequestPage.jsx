import { useState, useEffect } from "react";
import axios from "axios";
import "./ReturnsRequestPage.css";
import { toast } from "react-toastify";

const ReturnsRequestPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("/api/order/history", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch(() => toast.error("Failed to load orders"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedItemId || !reason) {
      toast.error("Please select an item and provide a reason");
      return;
    }

    const token = localStorage.getItem("accessToken");
    axios
      .post(
        "/api/return",
        { order_item_id: selectedItemId, reason },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => toast.success("Return request submitted"))
      .catch(() => toast.error("Failed to submit return request"));
  };

  return (
    <div className="returnsPage">
      <h2>Request a Return</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedItemId || ""}
          onChange={(e) => setSelectedItemId(e.target.value)}
        >
          <option value="">Select product from past orders</option>
          {orders.flatMap((order) =>
            order.items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.product_name} - {order.id}
              </option>
            ))
          )}
        </select>
        <textarea
          placeholder="Reason for return"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button type="submit">Submit Return Request</button>
      </form>
    </div>
  );
};

export default ReturnsRequestPage;
