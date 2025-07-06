import "./Admin.css";
import "./Styles/Dock.css";
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
  faBoxes,
  faUserGroup,
  faMagnifyingGlass,
  faTruckFast,
  faBell,
  faChalkboardUser,
  faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";
import Customers from "./Customers";
import Dashboard from "./Dashboard";

const icons = [
  {
    id: 1,
    icon: <FontAwesomeIcon icon={faHomeUser} size="2x" />,
    p: "Dashboard",
    to: "/dashboard",
  },
  {
    id: 2,
    icon: <FontAwesomeIcon icon={faBoxes} size="2x" />,
    p: "Inventory",
    to: "/inventory",
  },
  {
    id: 3,
    icon: <FontAwesomeIcon icon={faUserGroup} size="2x" />,
    p: "Customers",
    to: "/customers",
  },
  {
    id: 4,
    icon: <FontAwesomeIcon icon={faTruckFast} size="2x" />,
    p: "Orders",
    to: "/orders", // lead to an overview with tabs or sub-filters
  },
  {
    id: 5,
    icon: <FontAwesomeIcon icon={faArrowRightArrowLeft} size="2x" />,
    p: "Returns",
    to: "/returns",
  },
  {
    id: 6,
    icon: <FontAwesomeIcon icon={faFlagCheckered} size="2x" />,
    p: "Reports",
    to: "/reports",
  },
];


export const AdminMenu = () => {
  return (
    <div>
      {/* Admin Side Menu */}
      <section className="adminMenu">
        <Link to="/dashboard" className="adminLink">
          Dashboard
        </Link>
        <Link to="/inventory" className="adminLink">
          Inventory
        </Link>
        <Link to="/customers" className="adminLink">
          Customers
        </Link>
        <Link to="/orders/pending" className="adminLink">
          Pending Orders
        </Link>
        <Link to="/orders/processing" className="adminLink">
          Processing Orders
        </Link>
        <Link to="/orders/shipped" className="adminLink">
          Shipped Orders
        </Link>
        <Link to="/orders/delivered" className="adminLink">
          Delivered Orders
        </Link>
        <Link to="/returns/requests" className="adminLink">
          Return Requests
        </Link>
        <Link to="/returns/confirmed" className="adminLink">
          Confirmed Returns
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

export const Dock =() => {
  return (
    <div className="dock">
      {icons.map((icon) => (
        <Link to={icon.to} key={icon.id} className="dock-icon">
          {icon.icon}
          <p className="dock-label">{icon.p}</p>
        </Link>
      ))}
    </div>
  );
}

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
      <div>
       <Dock />
      </div>
    </div>
  );
};
export default Admin;
