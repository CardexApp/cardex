import { Fragment } from "react";
import "./Styles/Customers.css";
import { AdminMenu, Dock } from "./Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEye,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useOrders } from "../../Context/OrdersContext";



const ReturnRequests = () => {
    const { orders } = useOrders();

  if (!orders || !Array.isArray(orders)) {
    return (
      <div className="customersPage">
        <AdminMenu />
        <div className="customersContent">
          <h2>Return Requests</h2>
          <p>Loading or no orders available...</p>
        </div>
        <Dock />
      </div>
    );
  }

  const returnRequests = orders.filter((o) => o.returnRequested);

  return (
    <div className="customersPage">

      <div className="customersContent">
        <h2>Return Requests</h2>

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
            {returnRequests.length > 0 ? (
              returnRequests.map((order) => (
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
                    <button title="Approve Return">
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </button>
                    <button title="Decline Return">
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                  </div>
                </Fragment>
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
