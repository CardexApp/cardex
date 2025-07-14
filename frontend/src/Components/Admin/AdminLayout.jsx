import AdminNavBar from "./AdminNavBar";
import { Outlet } from "react-router-dom";
import { Dock } from "./Admin";
import { AdminMenu } from "./Admin";
import "../Admin/Admin.css";

const AdminLayout = () => {
  return (
    <div className="landingPage">
      <AdminNavBar />
      <div className="overview">
        <AdminMenu />
        <section className="adminDashBoard">
          <Outlet />
        </section>
      </div>
      <Dock />
    </div>
  );
};

export default AdminLayout;
