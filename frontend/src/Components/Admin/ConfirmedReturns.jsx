import "./Styles/Customers.css";
import { Fragment, useState } from "react";
import { AdminMenu, Dock } from "./Admin";
import { SearchBar } from "./Reusables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEye,
  faEdit,
  faTrash,
  faBan,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import { useOrders } from "../../Context/OrdersContext";

const ShippedOrders = () => {
  const { orders, updateOrder, removeOrder } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");

  const shippedOrders = orders.filter(
    (order) =>
      order.status.toLowerCase() === "shipped" &&
      `${order.name} ${order.email} ${order.address}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;

    const newName = prompt("Update Name:", order.name) || order.name;
    const newEmail = prompt("Update Email:", order.email) || order.email;
    const newAddress =
      prompt("Update Address:", order.address) || order.address;

    updateOrder(id, { name: newName, email: newEmail, address: newAddress });
  };

  const handleBlock = (id) => {
    const order = orders.find((o) => o.id === id);
    updateOrder(id, { isBlocked: !order.isBlocked });
  };

  return (
    <div className="customersPage">
      <AdminMenu />

      <div className="customersContent">
        <div className="customersHeader">
          <h2>Shipped Orders</h2>
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
            <div>Total</div>
            <div>Actions</div>
          </div>

          <div className="customerTableBody">
            {shippedOrders.map((order) => (
              <Fragment key={order.id}>
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
                <div>{order.totalPrice}</div>
                <div className="actions">
                  <button title="View">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button title="Edit" onClick={() => handleEdit(order.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button title="Delete" onClick={() => removeOrder(order.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button title="Block" onClick={() => handleBlock(order.id)}>
                    <FontAwesomeIcon icon={faBan} />
                  </button>
                  <button title="Invoice">
                    <FontAwesomeIcon icon={faFileInvoice} />
                  </button>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <Dock />
    </div>
  );
};

export default ShippedOrders;
