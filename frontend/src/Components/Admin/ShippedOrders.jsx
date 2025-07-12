import "./Styles/Customers.css";
import { AdminMenu, Dock } from "./Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEye,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import { useOrders } from "../../Context/OrdersContext";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ShippedOrders = () => {
  const { orders } = useOrders();

  const handleGenerateInvoice = (order) => {
    const doc = new jsPDF();
    const date = new Date().toLocaleString();

    doc.setFontSize(18);
    doc.text("INVOICE", 14, 20);

    doc.setFontSize(11);
    doc.text(`Order ID: ${order.id}`, 14, 30);
    doc.text(`Date: ${date}`, 14, 36);
    doc.text(`Customer: ${order.name}`, 14, 42);
    doc.text(`Email: ${order.email}`, 14, 48);
    doc.text(`Address: ${order.address}`, 14, 54);

    const tableRows = order.items.map((item, index) => [
      index + 1,
      item.productName,
      item.sku,
      item.quantity,
      `$${Number(item.price).toFixed(2)}`,
      `$${(item.quantity * item.price).toFixed(2)}`,
    ]);

    doc.autoTable({
      head: [["#", "Product", "SKU", "Qty", "Unit Price", "Total"]],
      body: tableRows,
      startY: 65,
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total: $${Number(order.totalPrice).toFixed(2)}`, 14, finalY);

    doc.save(`Invoice_Order_${order.id}.pdf`);
  };

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
                  <div>${Number(order.totalPrice).toLocaleString()}</div>
                  <div className="actions">
                    <button title="View">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      title="Invoice"
                      onClick={() => handleGenerateInvoice(order)}
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
// END
