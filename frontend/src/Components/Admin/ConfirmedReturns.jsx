import "./Styles/Customers.css";
import { useState } from "react";
import {  Dock } from "./Admin";
import { SearchBar } from "./Reusables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEye,
  faFileInvoice,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useOrders } from "../../Context/OrdersContext";

const ConfirmedReturns = () => {
  const { orders, updateOrder } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");

  const confirmedReturns = orders.filter(
    (order) =>
      order.status.toLowerCase() === "returned" &&
      `${order.name} ${order.email} ${order.address}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleMarkResolved = (id) => {
    updateOrder(id, { status: "Return Resolved" });
    alert(`Order ${id} marked as resolved.`);
  };

  return (
    <div className="customersPage">
      <div className="customersContent">
        <div className="customersHeader">
          <h2>Confirmed Returns</h2>
          <SearchBar
            type="text"
            placeholder="Search by name, email, address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="customerTableWrapper">
          <div className="customerTableHeader shippedGrid">
            <div>Order ID</div>
            <div>Customer</div>
            <div>Products</div>
            <div>Date/Time</div>
            <div>Status</div>
            <div>Total</div>
            <div>Actions</div>
          </div>

          <div className="customerTableBody shippedGrid">
            {confirmedReturns.length > 0 ? (
              confirmedReturns.map((order) => (
                <div className="orderRow" key={order.id}>
                  <div>{order.id}</div>
                  <div className="userInfo">
                    <FontAwesomeIcon className="avatar" icon={faUser} />
                    <div className="nameEmail">
                      <p>{order.name}</p>
                      <p className="subText">{order.email}</p>
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
                  <div>{order.totalPrice}</div>
                  <div className="actions">
                    <button title="View">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button title="Invoice">
                      <FontAwesomeIcon icon={faFileInvoice} />
                    </button>
                    <button
                      title="Mark Resolved"
                      onClick={() => handleMarkResolved(order.id)}
                    >
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No confirmed returns found.</p>
            )}
          </div>
        </div>
      </div>

      <Dock />
    </div>
  );
};

export default ConfirmedReturns;
