import "./Styles/Inventory.css";

const InventoryPage = () => {
  const salesData = [
    {
      id: 1,
      store: "Brown boat",
      category: "Earphones",
      location: "China",
      quantity: 400,
      stockValue: "343K",
    },
    {
      id: 2,
      store: "Nirmal Trader",
      category: "Marketing",
      location: "Chennai",
      quantity: 400,
      stockValue: "834K",
    },
    {
      id: 3,
      store: "Shadowfox",
      category: "Design",
      location: "Africa",
      quantity: 400,
      stockValue: "73K",
    },
  ];

  return (
    <div className="inventory-page">
      <header className="inventory-header">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>🔍</button>
        </div>
      </header>

      <main className="inventory-content">
        <section className="turnover">
          <h3>Inventory Turnover Rate</h3>
          <p>Total profit: ₹5,35,790</p>
          <div className="turnover-chart">[Chart Placeholder]</div>
        </section>

        <section className="warehouse">
          <h3>Warehouse</h3>
          <div className="gauge">80% Utilization</div>
        </section>

        <section className="accuracy">
          <h3>Inventory Accuracy</h3>
          <div className="gauge">78% Accuracy</div>
        </section>

        <section className="sales-table">
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
  );
};

export default InventoryPage;
