import "./Styles/Inventory.css";
import { AdminMenu, Dock } from "./Admin";
import { SearchBar } from "./Reusables";
import { useState, useEffect } from "react";

const InventoryPage = () => {
  const [salesData, setSalesData] = useState([
    {
      id: 1,
      store: "Range Rover",
      category: "Coupes",
      location: "England",
      quantity: 74,
      sold: 10,
      returned: 2,
      stockValue: "343K",
    },
    {
      id: 2,
      store: "Nirmal Trader",
      category: "Marketing",
      location: "Scotland",
      quantity: 142,
      sold: 25,
      returned: 5,
      stockValue: "834K",
    },
    {
      id: 3,
      store: "Shadowfox",
      category: "Design",
      location: "Wales",
      quantity: 231,
      sold: 50,
      returned: 0,
      stockValue: "73K",
    },
    {
      id: 4,
      store: "AutoMaster",
      category: "SUV",
      location: "Northern Ireland",
      quantity: 9,
      sold: 20,
      returned: 1,
      stockValue: "15K",
    },
    {
      id: 5,
      store: "Speedline",
      category: "Sedan",
      location: "England",
      quantity: 0,
      sold: 50,
      returned: 3,
      stockValue: "0",
    },
  ]);

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const lowStock = salesData.filter(
      (item) => item.quantity > 0 && item.quantity <= 10
    );
    const outOfStock = salesData.filter((item) => item.quantity === 0);
    const alertMsgs = [
      ...lowStock.map(
        (item) => `⚠️ Low stock: ${item.store} (${item.quantity})`
      ),
      ...outOfStock.map((item) => `❌ Out of stock: ${item.store}`),
    ];
    setAlerts(alertMsgs);
  }, [salesData]);

  return (
    <div>
      <div className="inventoryOverview">
        <AdminMenu />

        <div className="inventoryPage">
          <header className="inventoryHeader">
            <h2>Inventory Management</h2>
            <SearchBar placeholder="Search Inventory" type="text" />
          </header>

          <main className="inventoryContent">
            <section className="turnover">
              <h3>Turnover Rate</h3>
              <p>Total profit: $535,790</p>
              <div className="turnoverChart">[Chart Placeholder]</div>
            </section>

            <section className="warehouse">
              <h3>Warehouse Utilization</h3>
              <div className="gauge">80% Utilization</div>
            </section>

            <section className="accuracy">
              <h3>Inventory Accuracy</h3>
              <div className="gauge">78% Accuracy</div>
            </section>

            <section className="alerts">
              <h3>Stock Alerts</h3>
              {alerts.length > 0 ? (
                <ul>
                  {alerts.map((msg, index) => (
                    <li key={index}>{msg}</li>
                  ))}
                </ul>
              ) : (
                <p>All stock levels normal</p>
              )}
            </section>

            <section className="salesTable">
              <h3>Inventory Overview</h3>
              <table>
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Store Name</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Quantity</th>
                    <th>Sold</th>
                    <th>Returned</th>
                    <th>Stock Value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((row) => {
                    let status = "In Stock";
                    if (row.quantity === 0) status = "Out of Stock";
                    else if (row.quantity <= 10) status = "Low Stock";

                    return (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.store}</td>
                        <td>{row.category}</td>
                        <td>{row.location}</td>
                        <td>{row.quantity}</td>
                        <td>{row.sold}</td>
                        <td>{row.returned}</td>
                        <td>{row.stockValue}</td>
                        <td>{status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </main>
        </div>
      </div>

      <Dock />
    </div>
  );
};

export default InventoryPage;
