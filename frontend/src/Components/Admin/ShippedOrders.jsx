import "./Styles/Customers.css";
import { generateInvoice } from "../Admin/Reusables";
import { AdminMenu, Dock } from "./Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEye,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import { useOrders } from "../../Context/OrdersContext";

const ShippedOrders = () => {
  const { orders } = useOrders();

  if (!orders || !Array.isArray(orders)) {
    return (
      <div className="customersPage">
        <AdminMenu />
        <div className="customersContent">
          <h2>Shipped Orders</h2>
          <p>Loading or no orders available...</p>
        </div>
        <Dock />
      </div>
    );
  }

  const shippedOrders = orders.filter((o) => o.status === "Shipped");

  return (
    <div className="customersPage">
      <div className="customersContent">
        <h2>Shipped Orders</h2>

        <div className="customerTableWrapper">
          <div className="customerTableHeader shippedGrid">
            <div>Order ID</div>
            <div>Customer</div>
            <div>Products</div>
            <div>Date/Time</div>
            <div>Status</div>
            <div>Delivery</div>
            <div>Return Req</div>
            <div>Total</div>
            <div>Actions</div>
          </div>

          <div className="customerTableBody shippedGrid">
            {shippedOrders.length > 0 ? (
              shippedOrders.map((order) => (
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
                  <div>{order.deliveryMethod || "-"}</div>
                  <div>{order.returnRequested ? "Yes" : "No"}</div>
                  <div>${Number(order.totalPrice).toLocaleString()}</div>

                  <div className="actions">
                    <button title="View">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      title="Invoice"
                      onClick={() => generateInvoice(order)}
                    >
                      <FontAwesomeIcon icon={faFileInvoice} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No shipped orders found.</p>
            )}
          </div>
        </div>
      </div>

      <Dock />
    </div>
  );
};

export default ShippedOrders;
