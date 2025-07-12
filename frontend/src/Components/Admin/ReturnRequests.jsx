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

const ReturnRequests = () => {
  const { orders } = useOrders();

  const returns = (orders || []).filter((o) => o.returnRequested);

  return (
    <div className="customersPage">
      {/* <AdminMenu /> */}
      <div className="customersContent">
        <h2>Return Requests</h2>
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
            {returns.length > 0 ? (
              returns.map((order) => (
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
              <p>No return requests found.</p>
            )}
          </div>
        </div>
      </div>
      <Dock />
    </div>
  );
};

export default ReturnRequests;
