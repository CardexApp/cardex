import "./Admin.css";
import "./Styles/Dock.css";
import AdminNavBar from "./AdminNavBar";
import {
  Link,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faHomeUser,
  faBoxes,
  faUserGroup,
  faTruckFast,

  faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";

import {
  TotalRevenue,
  ActiveUsers,
  TotalUsers,
  PaidInvoice,
  FundsReceived,
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
import AdminProfile from "./Authentication/AdminProfile";
import ChangePassword from "./Authentication/ChangePassword";
import Analytics from "./Analytics"; 
import Orders from "./Orders";

import { useAuth } from "../../Context/AuthContext";

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
    to: "/admin/analytics",
  },
];

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
    <Link to="/admin/analytics" className="adminLink">
      Analytics
    </Link>
    <Link to="/admin/change-password" className="adminLink">
      Change Password
    </Link>
  </section>
);

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

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard =
    location.pathname === "/admin" || location.pathname === "/admin/";

  return (
    <div className="landingPage">
      {/* Top Bar */}
      <AdminNavBar />

      {/* Side Menu + Content */}
      <div className="overview">
        <AdminMenu />
        <section className="adminDashBoard">
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
            <Route path="profile" element={<AdminProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="*" element={<p>Page not found</p>} />
            <Route path="orders" element={<Orders />} />
          </Routes>
        </section>
      </div>

      <Dock />
    </div>
  );
};

export default Admin;
