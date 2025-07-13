import dayjs from "dayjs";
import "./Styles/Reusables.css";
import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

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

export const generateInvoice = (order) => {
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

  // 👇 Make sure autoTable is attached here correctly
  autoTable(doc, {
    head: [["#", "Product", "SKU", "Qty", "Unit Price", "Total"]],
    body: tableRows,
    startY: 65,
  });

  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.text(`Total: $${Number(order.totalPrice).toFixed(2)}`, 14, finalY);

  doc.save(`Invoice_Order_${order.id}.pdf`);
};
