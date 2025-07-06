import { Fragment } from "react";
import "./Styles/Customers.css"
import { AdminMenu, Dock } from "./Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEye,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";

const ShippedOrders = ({ orders }) => {
  const shippedOrders = orders.filter((o) => o.status === "Shipped");

  return (
    <div className="customersPage">
      <AdminMenu />

      <div className="customersContent">
        <h2>Shipped Orders</h2>

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
