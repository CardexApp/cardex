import dayjs from "dayjs";
import "./Styles/Reusables.css";
import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; 


import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faArrowTrendUp,
  faDollarSign,
  faFileInvoice,
  faSpinner,
  faWallet,
  faSearch,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";
import { text } from "@fortawesome/fontawesome-svg-core";

export const DateDisplay = () => {
  const now = dayjs();
  return <p>{now.format("DD-MM-YYYY")}</p>;
};

export const TotalRevenue = () => {
  return (
    <div>
      <div className="dashCards">
        <div className="dashTitle">
          <p>Total Revenue</p>
          <p className="totalAmount">$25,789</p>
        </div>
        <div className="info">
          <FontAwesomeIcon icon={faArrowTrendUp} />
          <p>from last month</p>
        </div>
      </div>
    </div>
  );
};

export const ActiveUsers = () => {
  return (
    <div>
      <div className="dashCards">
        <div className="dashTitle">
          <p>Active Users</p>
          <p className="totalAmount">325</p>
        </div>
        <div className="info">
          <FontAwesomeIcon icon={faArrowTrendUp} />
          <p>from last month</p>
        </div>
      </div>
    </div>
  );
};

export const TotalUsers = () => {
  return (
    <div>
      <div className="dashCards">
        <div className="dashTitle">
          <p>Total Users</p>
          <p className="totalAmount">325</p>
        </div>
        <div className="info">
          <FontAwesomeIcon icon={faArrowTrendUp} />
          <p>from last month</p>
        </div>
      </div>
    </div>
  );
};

export const PaidInvoice = () => {
  return (
    <div className="invoiceContainer">
      <div className="paidInvoice">
        <div className="dashTitleInvoice">
          <FontAwesomeIcon icon={faFileInvoice} />
          <FontAwesomeIcon icon={faSpinner} />
        </div>
        <div className="info">
          <p>Paid Invoices</p>
          <div className="detailAmount">
            <FontAwesomeIcon icon={faDollarSign} />
            <p>30435.66</p>
          </div>
          <p>Current Financial Year</p>
        </div>
      </div>
    </div>
  );
};

export const FundsReceived = () => {
  return (
    <div className="invoiceContainer">
      <div className="paidInvoice">
        <div className="dashTitleInvoice">
          <FontAwesomeIcon icon={faFileInvoice} />
          <FontAwesomeIcon icon={faWallet} />
        </div>
        <div className="info">
          <p>Funds Received</p>
          <div className="detailAmount">
            <FontAwesomeIcon icon={faDollarSign} />
            <p>30435.66</p>
          </div>
          <p>Current Financial Year</p>
        </div>
      </div>
    </div>
  );
};

export const SearchBar = ({
  placeholder = "Search...",
  type = "text",
  value,
  onChange,
  onSortNameOrId,
  onSortPrice,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (query.trim() === "") {
      console.log("Empty search query");
      return;
    }

    try {
      const response = await axios.get(
        `/api/products?search=${encodeURIComponent(query)}`
      );
      console.log("Search results:", response.data);
      setResults(response.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="searchWrapper">
      <div className={`searchContainer ${expanded ? "expanded" : ""}`}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onFocus={() => setExpanded(true)}
          onBlur={() => {
            if (!value || value.trim() === "") {
              setExpanded(false);
            }
          }}
          onChange={onChange}
        />
        <button
          className="searchIconButton"
          onClick={() => console.log("Place search term of the page")}
          type="button"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div className={`bubbles ${expanded ? "show" : ""}`}>
        <button
          className="bubble"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onSortNameOrId}
        >
          <FontAwesomeIcon icon={faArrowDownWideShort} />
        </button>
        <button
          className="bubble"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onSortPrice}
        >
          <FontAwesomeIcon icon={faSort} />
        </button>
      </div>
    </div>
  );
};


export const generateInvoice = (order, userMap, productMap) => {
  const doc = new jsPDF();
  const margin = 14;

  const user = userMap[order.user] || {};
  const username = user.username || "N/A";
  const email = user.email || "N/A";

  const title = `Invoice for Order #${order.id}`;
  doc.setFontSize(16);
  doc.text(title, margin, 20);

  doc.setFontSize(12);
  doc.text(`Customer ID: ${order.user}`, margin, 30);
  doc.text(`Username: ${username}`, margin, 36);
  doc.text(`Email: ${email}`, margin, 42);
  doc.text(
    `Order Date: ${new Date(order.created_at).toLocaleString()}`,
    margin,
    52
  );
  doc.text(`Status: ${order.status}`, margin, 58);

  const tableRows = [];
  let total = 0;

  order.items.forEach((item, index) => {
    const product = productMap[item.product] || {};
    const name = product.name || `Product #${item.product}`;
    const price = parseFloat(product.price) || 0;
    const qty = item.quantity || 0;
    const subtotal = price * qty;

    total += subtotal;

    tableRows.push([
      index + 1,
      name,
      `₦${price.toFixed(2)}`,
      qty,
      `₦${subtotal.toFixed(2)}`,
    ]);
  });

  // Call as a method on doc
  doc.autoTable({
    head: [["#", "Product", "Unit Price", "Quantity", "Subtotal"]],
    body: tableRows,
    startY: 70,
    theme: "striped",
  });

  doc.text(
    `Total: ₦${total.toFixed(2)}`,
    margin,
    doc.lastAutoTable.finalY + 10
  );
  doc.save(`invoice_order_${order.id}.pdf`);
};
