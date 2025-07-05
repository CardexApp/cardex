import "./Admin.css";
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
} from "./Reusables";

import {
  faArrowRightArrowLeft,
  faEnvelope,
  faHomeUser,
  faMagnifyingGlass,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

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
          <h3>Admin Page</h3> <DateDisplay />
        </div>
        <div className="services">
          <p>Search</p>
          <p>Notification</p>
          <p>Profile</p>
        </div>
      </div>

      {/* Main Area */}

      <div className="overview">
        {/* Left section - Menu */}
        <AdminMenu />

        {/* Mid-section Overview */}
        <section className="adminDashBoard">
          <div className="quickInfo">
            <TotalRevenue />
            <ActiveUsers />
            <TotalUsers />
          </div>

          {/* Details */}
          <div className="adminDetails">
            <PaidInvoice />
            <FundsReceived />
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
