import dayjs from "dayjs";
import "./Styles/Reusables.css";
import { useState } from "react";
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

export const SearchBar = ({ placeholder = "Search...", type = "text" }) => {
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
          value={query}
          onFocus={() => setExpanded(true)}
          onBlur={() => setExpanded(false)}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="searchIconButton"
          onClick={handleSearch}
          type="button"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div className={`bubbles ${expanded ? "show" : ""}`}>
        <button className="bubble">
          <FontAwesomeIcon icon={faArrowDownWideShort} />
        </button>
        <button className="bubble">
          <FontAwesomeIcon icon={faSort} />
        </button>
      </div>
    </div>
  );
};
