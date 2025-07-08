import "./Admin.css";
import "./Styles/Dock.css";
import asset from "../../assets/asset";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faHomeUser,
  faBoxes,
  faUserGroup,
  faTruckFast,
  faBell,
  faChalkboardUser,
  faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";

import {
  TotalRevenue,
  DateDisplay,
  ActiveUsers,
  TotalUsers,
  PaidInvoice,
  FundsReceived,
  SearchBar,
} from "./Reusables";

import Dashboard from "./Dashboard";
import InventoryPage from "./Inventory";
import Customers from "./Customers";
import ShippedOrders from "./ShippedOrders";
import DeliveredOrders from "./DeliveredOrders";
import ProcessingOrders from "./ProcessingOrders";
import PendingOrders from "./PendingOrders";
import ReturnRequests from "./ReturnRequests";
import ConfirmedReturns from "./ConfirmedReturns";

const icons = [
  {
    id: 1,
    icon: <FontAwesomeIcon icon={faHomeUser} size="2x" />,
    p: "Dashboard",
    to: "/admin",
  },
  {
    id: 2,
    icon: <FontAwesomeIcon icon={faBoxes} size="2x" />,
    p: "Inventory",
    to: "/admin/inventory",
  },
  {
    id: 3,
    icon: <FontAwesomeIcon icon={faUserGroup} size="2x" />,
    p: "Customers",
    to: "/admin/customers",
  },
  {
    id: 4,
    icon: <FontAwesomeIcon icon={faTruckFast} size="2x" />,
    p: "Orders",
    to: "/admin/orders/shipped",
  },
  {
    id: 5,
    icon: <FontAwesomeIcon icon={faArrowRightArrowLeft} size="2x" />,
    p: "Returns",
    to: "/admin/returns/requests",
  },
  {
    id: 6,
    icon: <FontAwesomeIcon icon={faFlagCheckered} size="2x" />,
    p: "Reports",
    to: "/admin/reports",
  },
];

export const Dock = () => (
  <div className="dock">
    {icons.map((icon) => (
      <Link to={icon.to} key={icon.id} className="dock-icon">
        {icon.icon}
        <p className="dock-label">{icon.p}</p>
      </Link>
    ))}
  </div>
);

export const AdminMenu = () => (
  <section className="adminMenu">
    <Link to="/admin" className="adminLink">
      Dashboard
    </Link>
    <Link to="/admin/inventory" className="adminLink">
      Inventory
    </Link>
    <Link to="/admin/customers" className="adminLink">
      Customers
    </Link>
    <Link to="/admin/orders/pending" className="adminLink">
      Pending Orders
    </Link>
    <Link to="/admin/orders/processing" className="adminLink">
      Processing Orders
    </Link>
    <Link to="/admin/orders/shipped" className="adminLink">
      Shipped Orders
    </Link>
    <Link to="/admin/orders/delivered" className="adminLink">
      Delivered Orders
    </Link>
    <Link to="/admin/returns/requests" className="adminLink">
      Return Requests
    </Link>
    <Link to="/admin/returns/confirmed" className="adminLink">
      Confirmed Returns
    </Link>
  </section>
);

const Admin = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/admin";

  return (
    <div className="landingPage">
      {/* Admin Top Bar */}
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
            <SearchBar placeholder="Search Cardex" type="text" />
          </div>
          <div className="notifiers">
            <FontAwesomeIcon className="fontIcon" icon={faBell} />
            <div className="dropdownAdminProfile">
              <FontAwesomeIcon className="fontIcon" icon={faChalkboardUser} />
              <div className="dropdownContentAdmin">
                <div className="adminProfile">
                  <div className="adminAvatar">
                    <p>Admin</p>
                  </div>
                  <h2>Admin name</h2>
                  <h3>Cars Posted</h3>
                  <h3>Cars Sold</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Side and Content */}
      <div className="overview">
        <AdminMenu />

        <section className="adminDashBoard">
          {/* Quick Info and Admin Details only on /admin */}
          {isDashboard && (
            <>
              <div className="quickInfo">
                <TotalRevenue />
                <ActiveUsers />
                <TotalUsers />
              </div>
              <div className="adminDetails">
                <PaidInvoice />
                <FundsReceived />
              </div>
            </>
          )}

          {/* Admin Routes */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="customers" element={<Customers />} />
            <Route path="orders/pending" element={<PendingOrders />} />
            <Route path="orders/processing" element={<ProcessingOrders />} />
            <Route path="orders/shipped" element={<ShippedOrders />} />
            <Route path="orders/delivered" element={<DeliveredOrders />} />
            <Route path="returns/requests" element={<ReturnRequests />} />
            <Route path="returns/confirmed" element={<ConfirmedReturns />} />
          </Routes>
        </section>
      </div>

      <Dock />
    </div>
  );
};

export default Admin;
