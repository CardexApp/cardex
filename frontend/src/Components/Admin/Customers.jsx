import "./Styles/Customers.css";
import { useState, useEffect } from "react";
import { Dock } from "./Admin";
import { SearchBar } from "./Reusables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTrash,
  faEdit,
  faEye,
  faBan,
  faTruck,
  faFileInvoice,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_URL } from "../../Config";

const Customers = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/orders/`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const adjustInventory = async (productId, quantityChange) => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/products/${productId}/`);
      const currentQuantity = res.data.quantity;
      const updatedQuantity = currentQuantity + quantityChange;
      if (updatedQuantity < 0) return;

      await axios.put(`${BASE_URL}/admin/products/${productId}/`, {
        ...res.data,
        quantity: updatedQuantity,
      });
    } catch (error) {
      console.error("Error adjusting inventory:", error);
    }
  };

  const handleStatusChange = async (id) => {
    const updated = orders.map((o) => {
      if (o.id !== id) return o;
      let next = o.status;
      if (o.status === "Processing") next = "Shipped";
      else if (o.status === "Shipped") next = "Delivered";
      else if (o.status === "Delivered") next = "Returned";
      else next = "Processing";
      return { ...o, status: next };
    });
    setOrders(updated);

    try {
      const newStatus = updated.find((o) => o.id === id).status;
      await axios.patch(`${BASE_URL}/admin/orders/${id}/`, {
        status: newStatus,
      });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleManageReturn = async (id, approve) => {
    const updated = orders.map((o) => {
      if (o.id !== id) return o;
      if (approve) {
        o.items.forEach((item) => {
          adjustInventory(item.productId, item.quantity);
        });
      }
      return {
        ...o,
        returnRequested: false,
        status: approve ? "Returned" : o.status,
      };
    });
    setOrders(updated);

    try {
      await axios.patch(`${BASE_URL}/admin/orders/${id}/`, {
        status: approve ? "Returned" : undefined,
        returnRequested: false,
      });
    } catch (err) {
      console.error("Failed to update return status:", err);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/admin/orders/${id}/`);
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  const handleToggleBlock = async (id, currentState) => {
    try {
      const updated = !currentState;
      await axios.patch(`${BASE_URL}/admin/orders/${id}/`, {
        isBlocked: updated,
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, isBlocked: updated } : o))
      );
    } catch (err) {
      console.error("Error toggling block status:", err);
    }
  };

  const filteredOrders = orders.filter((order) =>
    `${order.name} ${order.email} ${order.address}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customersPage">
      <div className="customersContent">
        <div className="customersHeader">
          <h2>Customer Orders</h2>
          <SearchBar
            type="text"
            placeholder="Search by name, email, address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="customerTableWrapper">
          <div className="customerTableHeader">
            <div>Order ID</div>
            <div>Customer</div>
            <div>Products</div>
            <div>Date/Time</div>
            <div>Status</div>
            <div>Delivery</div>
            <div>Return</div>
            <div>Total</div>
            <div>Actions</div>
          </div>

          <div className="customerTableBody">
            {filteredOrders.map((order) => (
              <div className="orderRow" key={order.id}>
                <div>{order.id}</div>
                <div className="userInfo">
                  <FontAwesomeIcon className="avatar" icon={faUser} />
                  <div className="nameEmail">
                    <p>{order.name}</p>
                    <p className="subText">{order.email}</p>
                    {order.isBlocked && (
                      <span className="blockedTag">Blocked</span>
                    )}
                  </div>
                </div>
                <div>
                  {order.items.map((item, idx) => (
                    <p key={idx}>
                      {item.productName} ({item.sku}) x {item.quantity}
                    </p>
                  ))}
                </div>
                <div>{order.dateOfPurchase}</div>
                <div>{order.status}</div>
                <div>{order.delivery}</div>
                <div>{order.returnRequested ? "Yes" : "No"}</div>
                <div>${Number(order.totalPrice).toLocaleString()}</div>
                <div className="actions">
                  <button title="View">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button title="Edit">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    title="Delete"
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    title="Block"
                    onClick={() => handleToggleBlock(order.id, order.isBlocked)}
                  >
                    <FontAwesomeIcon icon={faBan} />
                  </button>
                  <button title="Invoice">
                    <FontAwesomeIcon icon={faFileInvoice} />
                  </button>
                  <button
                    title="Change Status"
                    onClick={() => handleStatusChange(order.id)}
                  >
                    <FontAwesomeIcon icon={faTruck} />
                  </button>
                  {order.returnRequested && (
                    <>
                      <button
                        title="Approve Return"
                        onClick={() => handleManageReturn(order.id, true)}
                      >
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </button>
                      <button
                        title="Decline Return"
                        onClick={() => handleManageReturn(order.id, false)}
                      >
                        <FontAwesomeIcon icon={faBan} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dock />
    </div>
  );
};

export default Customers;
