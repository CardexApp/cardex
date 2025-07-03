import "./Admin.css";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="overview">
      {/* Left section - Menu */}
      <section className="adminMenu">
        <Link>Dashboard</Link>
        <Link>Orders</Link>
        <Link>Returns</Link>
        <Link>Processing</Link>
        <Link>Deliveries</Link>
        <Link>Inventories</Link>
      </section>

      {/* Mid-section Overview */}
      <section className="adminDashBoard">
        <div className="totalOrders">
          <div>
            <p>273 sold</p>
          </div>
          <div>
            <p>Processing</p>
          </div>
          <div>
            <p>Delivered</p>
          </div>
          <div>
            <p>Return request</p>
          </div>
          <div>
            <p>Dispatched</p>
          </div>
        </div>
      </section>

      {/* Right section - Specific details */}
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
export default Admin;
