import { AdminMenu, AdminStatus } from "./Admin"

const Dashboard = () => {
  return (
    <div className="dashBoard">
      <AdminMenu />
      {/* Dashboard tiles */}
      <div className="details">Dashboard</div>
      {/* AdminStatus */}
      <div className="adminStatus">
        <AdminStatus />
      </div>
    </div>
  );
}
export default Dashboard