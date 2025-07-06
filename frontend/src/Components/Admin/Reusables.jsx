import dayjs from "dayjs";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faArrowTrendUp,
  faDollarSign,
  faFileInvoice,
  faSpinner,
  faWallet,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";

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

export const SearchBar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="searchWrapper">
      <div className={`searchContainer ${expanded ? "expanded" : ""}`}>
        <input
          type="text"
          placeholder="Search"
          onFocus={() => setExpanded(true)}
          onBlur={() => setExpanded(false)}
        />
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
