import "./Admin.css";
import { Fragment } from "react";
import asset from "../../assets/asset";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  TotalRevenue,
  DateDisplay,
  ActiveUsers,
  TotalUsers,
  PaidInvoice,
  FundsReceived,
  SearchBar,
} from "./Reusables";

import {
  faArrowRightArrowLeft,
  faEnvelope,
  faHomeUser,
  faMagnifyingGlass,
  faTruckFast,
  faRotate,
  faUser,
  faBell,
  faChalkboardUser,
} from "@fortawesome/free-solid-svg-icons";
import Customers from "./Customers";

const icons = [
  {
    id: 1,
    icon: <FontAwesomeIcon icon={faHomeUser} size="2x" />,
    alt: "Home",
    p: "Home",
  },
  {
    id: 2,
    icon: <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />,
    alt: "Search",
    p: "Search",
  },
  {
    id: 3,
    icon: <FontAwesomeIcon icon={faArrowRightArrowLeft} size="2x" />,
    alt: "Processing",
    p: "Analytics",
  },

  {
    id: 4,
    icon: <FontAwesomeIcon icon={faEnvelope} size="2x" />,
    alt: "Messages",
    p: "Mails",
  },
  {
    id: 5,
    icon: <FontAwesomeIcon icon={faTruckFast} size="2x" />,
    alt: "Deliveries",
    p: "Status",
  },
];

const data = [
  {
    id: "1",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Okem",
    address: "Aston University",
    dateOfPurchase: "24/01/2025",
    status: "In Transit",
    price: "$23564.69",
  },
  {
    id: "2",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Rosemary",
    address: "Aston University",
    dateOfPurchase: "24/01/2025",
    status: "In Transit",
    price: "$23564.69",
  },
  {
    id: "3",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Mariya",
    address: "Aston University",
    dateOfPurchase: "24/01/2025",
    status: "In Transit",
    price: "$23564.69",
  },

  {
    id: "4",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Prince",
    address: "Aston University",
    dateOfPurchase: "24/01/2025",
    status: "In Transit",
    price: "$23564.69",
  },

  {
    id: "5",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Faisal",
    address: "Aston University",
    dateOfPurchase: "24/01/2025",
    status: "In Transit",
    price: "$23564.69",
  },
  {
    id: "6",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Johnpaul",
    address: "Aston University",
    dateOfPurchase: "24/01/2025",
    status: "In Transit",
    price: "$23564.69",
  },
];

export const AdminMenu = () => {
  return (
    <div>
      {/* Admin Side Menu */}
      <section className="adminMenu">
        <Link className="adminLink" to="/dashboard">
          Dashboard
        </Link>
        <Link to="/orders" className="adminLink">
          Orders
        </Link>
        <Link to="/returns" className="adminLink">
          Returns
        </Link>
        <Link to="/orders" className="adminLink">
          Processing
        </Link>
        <Link to="/querries" className="adminLink">
          Deliveries
        </Link>
        <Link to="/profile" className="adminLink">
          Inventories
        </Link>
      </section>
    </div>
  );
};

export const AdminStatus = () => {
  return (
    <div>
      <section className="adminStatus">
        {/* Top part */}
        <div className="adminProfile">
          <div className="adminAvatar">
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <h2>Admin name</h2>
          <h3>Cars Posted</h3>
          <h3>Cars Sold</h3>
        </div>

        {/* Bottom part */}
        <div className="userProfile">
          <div className="userAvatar">
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <h2>User name</h2>
          <h3>Cars Bought</h3>
          <h3>Cars Returned</h3>
        </div>
      </section>
    </div>
  );
};

const Admin = () => {
  return (
    <div className="landingPage">
      <div className="navAdmin">
        <div className="icon">
          <img className="logo" src={asset.LOGO} alt="CARDEX logo" />
        </div>
        <div className="dashBoard">
          <h3>Admin Page</h3>
          <h4>
            <DateDisplay />
          </h4>
        </div>
        <div className="services">
          <div className="adminSearch">
            <SearchBar />
          </div>
          <div className="notifiers">
            <FontAwesomeIcon className="fontIcon" icon={faBell} />
            <FontAwesomeIcon className="fontIcon" icon={faChalkboardUser} />
          </div>
        </div>
      </div>

      {/* Main Area */}

      <div className="overview">
        {/* Left section - Menu */}
        <AdminMenu />

        {/* Mid-section Top Overview */}
        <section className="adminDashBoard">
          <div className="quickInfo">
            <TotalRevenue />
            <ActiveUsers />
            <TotalUsers />
          </div>

          {/* Mid-section Bottom Overview */}
          <div className="adminView">
            <Customers />

            {/* Admin Details */}
            <div className="adminDetails">
              <PaidInvoice />
              <FundsReceived />
            </div>
          </div>
        </section>

        {/* Right section - Specific details */}
        <AdminStatus />
      </div>

      {/* Dock */}
      <div className="dock">
        {icons.map((icon) => (
          <div key={icon.id} className="dock-icon">
            {icon.icon}
            <p className="dock-label">{icon.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Admin;
