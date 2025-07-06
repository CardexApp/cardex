import "./Styles/Inventory.css";
import { AdminMenu, Dock } from "./Admin";
import { SearchBar } from "./Reusables";

const InventoryPage = () => {
  const salesData = [
    {
      id: 1,
      store: "Range Rover",
      category: "Coupes",
      location: "England",
      quantity: 74,
      stockValue: "343K",
    },
    {
      id: 2,
      store: "Nirmal Trader",
      category: "Marketing",
      location: "Scotland",
      quantity: 142,
      stockValue: "834K",
    },
    {
      id: 3,
      store: "Shadowfox",
      category: "Design",
      location: "Wales",
      quantity: 231,
      stockValue: "73K",
    },
  ];

  return (
    <div>
      <div className="inventoryOverview">
        {/* Admin Menu */}
        <div>
          <AdminMenu />
        </div>

        {/* Inventory Page */}
        <div className="inventoryPage">
          <header className="inventoryHeader">
            <div className="searchBar">
              <SearchBar />
            </div>
          </header>

          <main className="inventoryContent">
            <section className="turnover">
              <h3>Inventory Turnover Rate</h3>
              <p>Total profit: $535,790</p>
              <div className="turnoverChart">[Chart Placeholder]</div>
            </section>

            <section className="warehouse">
              <h3>Warehouse</h3>
              <div className="gauge">80% Utilization</div>
            </section>

            <section className="accuracy">
              <h3>Inventory Accuracy</h3>
              <div className="gauge">78% Accuracy</div>
            </section>

            <section className="salesTable">
              <h3>Sales Performance by Store</h3>
              <table>
                <thead>
                  <tr>
                    <th>S No</th>
                    <th>Store Name</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Quantity</th>
                    <th>Stock Value</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.store}</td>
                      <td>{row.category}</td>
                      <td>{row.location}</td>
                      <td>{row.quantity}</td>
                      <td>{row.stockValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </main>
        </div>
      </div>
      {/* Dock */}
      <Dock />
    </div>
  );
};

export default InventoryPage;
