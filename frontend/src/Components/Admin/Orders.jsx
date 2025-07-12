import { AdminMenu } from "./Admin"
import Customers from "./Customers";

const Orders = () => {
  return (
    <div className="dashBoard">
      <AdminMenu />
      {/* Dashboard tiles */}
      <div className="details"><Customers /></div>
    </div>
  );
}
export default Orders;