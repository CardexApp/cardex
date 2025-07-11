import "./Styles/Inventory.css";
import { AdminMenu, Dock } from "./Admin";
import { useState, useEffect } from "react";
import { SearchBar } from "./Reusables";

const InventoryPage = () => {
  const initialData = [
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
    {
      id: 6,
      store: "Zen Auto",
      category: "Hatchback",
      location: "Scotland",
      quantity: 40,
      sold: 5,
      returned: 0,
      stockValue: "200K",
    },
    {
      id: 7,
      store: "Eco Cars",
      category: "Electric",
      location: "Wales",
      quantity: 15,
      sold: 8,
      returned: 1,
      stockValue: "450K",
    },
    {
      id: 8,
      store: "Premium Motors",
      category: "Luxury",
      location: "England",
      quantity: 6,
      sold: 2,
      returned: 0,
      stockValue: "1.2M",
    },
    {
      id: 9,
      store: "Urban Drive",
      category: "SUV",
      location: "Northern Ireland",
      quantity: 30,
      sold: 12,
      returned: 2,
      stockValue: "500K",
    },
    {
      id: 10,
      store: "Value Wheels",
      category: "Sedan",
      location: "Scotland",
      quantity: 55,
      sold: 20,
      returned: 0,
      stockValue: "300K",
    },
    {
      id: 11,
      store: "RoadKing",
      category: "Truck",
      location: "Wales",
      quantity: 12,
      sold: 4,
      returned: 1,
      stockValue: "800K",
    },
    {
      id: 12,
      store: "Comet Auto",
      category: "Coupes",
      location: "England",
      quantity: 18,
      sold: 10,
      returned: 0,
      stockValue: "600K",
    },
    {
      id: 13,
      store: "City Auto",
      category: "Hatchback",
      location: "Northern Ireland",
      quantity: 22,
      sold: 9,
      returned: 1,
      stockValue: "250K",
    },
    {
      id: 14,
      store: "Nova Motors",
      category: "Electric",
      location: "Scotland",
      quantity: 11,
      sold: 6,
      returned: 0,
      stockValue: "700K",
    },
    {
      id: 15,
      store: "Titanium Rides",
      category: "SUV",
      location: "England",
      quantity: 17,
      sold: 5,
      returned: 0,
      stockValue: "900K",
    },
    {
      id: 16,
      store: "Express Auto",
      category: "Sedan",
      location: "Wales",
      quantity: 45,
      sold: 15,
      returned: 1,
      stockValue: "400K",
    },
    {
      id: 17,
      store: "Royal Motors",
      category: "Luxury",
      location: "Scotland",
      quantity: 8,
      sold: 3,
      returned: 0,
      stockValue: "1.5M",
    },
    {
      id: 18,
      store: "Fast Track",
      category: "Coupes",
      location: "Northern Ireland",
      quantity: 19,
      sold: 7,
      returned: 0,
      stockValue: "550K",
    },
    {
      id: 19,
      store: "Budget Cars",
      category: "Hatchback",
      location: "England",
      quantity: 60,
      sold: 20,
      returned: 2,
      stockValue: "180K",
    },
    {
      id: 20,
      store: "Velocity Auto",
      category: "Electric",
      location: "Wales",
      quantity: 14,
      sold: 5,
      returned: 0,
      stockValue: "650K",
    },
  ];

  const [salesData, setSalesData] = useState(initialData);
  const [alerts, setAlerts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    store: "",
    category: "",
    location: "",
    quantity: 0,
    stockValue: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState("name"); // "name" | "id" | "priceAsc" | "priceDesc"

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

  const handleAddProduct = () => {
    const newId = salesData.length + 1;
    const newEntry = { id: newId, ...newProduct, sold: 0, returned: 0 };
    setSalesData([...salesData, newEntry]);
    setNewProduct({
      store: "",
      category: "",
      location: "",
      quantity: 0,
      stockValue: "",
    });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    const updated = salesData.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setSalesData(updated);
  };

  const handleDeleteProduct = (id) => {
    const filtered = salesData.filter((item) => item.id !== id);
    setSalesData(filtered);
  };

  const handleSortNameOrId = () => {
    setSortMode((prev) => (prev === "name" ? "id" : "name"));
  };

  const handleSortPrice = () => {
    setSortMode((prev) => (prev === "priceAsc" ? "priceDesc" : "priceAsc"));
  };

  const filteredData = salesData
    .filter((item) => {
      const term = searchTerm.toLowerCase();
      return (
        item.store.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.location.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      switch (sortMode) {
        case "name":
          return a.store.localeCompare(b.store);
        case "id":
          return a.id - b.id;
        case "priceAsc": {
          const priceA = Number(a.stockValue.replace(/[^\d]/g, "")) || 0;
          const priceB = Number(b.stockValue.replace(/[^\d]/g, "")) || 0;
          return priceA - priceB;
        }
        case "priceDesc": {
          const priceA = Number(a.stockValue.replace(/[^\d]/g, "")) || 0;
          const priceB = Number(b.stockValue.replace(/[^\d]/g, "")) || 0;
          return priceB - priceA;
        }
        default:
          return 0;
      }
    });

  return (
    <div>
      <div className="inventoryOverview">
        <div className="inventoryPage">
          <header className="inventoryHeader">
            <h2>Inventory Management</h2>
            <SearchBar
              placeholder="Search by name, category, location"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onSortNameOrId={handleSortNameOrId}
              onSortPrice={handleSortPrice}
            />
          </header>

          <main className="inventoryContent">
            <section className="addProduct">
              <h3>Add New Product</h3>
              <div className="inputList">
              <input
                type="text"
                placeholder="Store Name"
                value={newProduct.store}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, store: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Location"
                value={newProduct.location}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, location: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newProduct.quantity}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    quantity: Number(e.target.value),
                  })
                }
              />
              <input
                type="text"
                placeholder="Stock Value"
                value={newProduct.stockValue}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stockValue: e.target.value })
                }
              /></div>
              <button onClick={handleAddProduct}>Add Product</button>
            </section>

            <section className="alerts">
              <h3>Stock Alerts</h3>
              {alerts.length > 0 ? (
                <ul className="alertsList">
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
              <p>Sort Mode: {sortMode}</p>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Store Name</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Quantity</th>
                    <th>Sold</th>
                    <th>Returned</th>
                    <th>Stock Value</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.store}</td>
                      <td>{row.category}</td>
                      <td>{row.location}</td>
                      <td>{row.quantity}</td>
                      <td>{row.sold}</td>
                      <td>{row.returned}</td>
                      <td>{row.stockValue}</td>
                      <td>
                        <button
                          onClick={() => {
                            const qty = prompt(
                              "Enter new quantity",
                              row.quantity
                            );
                            if (qty !== null)
                              handleUpdateQuantity(row.id, Number(qty));
                          }}
                        >
                          Update Qty
                        </button>
                        <button onClick={() => handleDeleteProduct(row.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
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
