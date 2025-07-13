import "./Styles/Inventory.css";
import { AdminMenu, Dock } from "./Admin";
import { useState, useEffect } from "react";
import { SearchBar } from "./Reusables";
import axios from "axios";
import { BASE_URL } from "../../Config";

const InventoryPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    transmission: "",
    status: "",
    quantity: 0,
    price: "",
    model_year: "",
    fuel_type: "",
    image: "",
    mileage: "",
    car_type: "", // ID expected
    make: "", // ID expected
    condition: "",
    description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState("name");

  useEffect(() => {
    const fetchProducts = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const res = await axios.get(`${BASE_URL}/admin/products/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setSalesData(res.data);
      } catch (err) {
        console.error("Failed to fetch inventory:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const lowStock = salesData.filter(
      (item) => item.quantity > 0 && item.quantity <= 3
    );
    const outOfStock = salesData.filter((item) => item.quantity === 0);
    const alertMsgs = [
      ...lowStock.map(
        (item) => `⚠️ Low stock: ${item.name} (${item.quantity})`
      ),
      ...outOfStock.map((item) => `❌ Out of stock: ${item.name}`),
    ];
    setAlerts(alertMsgs);
  }, [salesData]);

  const handleAddProduct = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("transmission", newProduct.transmission);
      formData.append("status", newProduct.status);
      formData.append("quantity", newProduct.quantity);
      formData.append("price", newProduct.price);
      formData.append("model_year", newProduct.model_year);
      formData.append("fuel_type", newProduct.fuel_type);
      formData.append("image", newProduct.image);
      formData.append("mileage", newProduct.mileage);
      formData.append("car_type", newProduct.car_type);
      formData.append("make", newProduct.make);
      formData.append("condition", newProduct.condition);
      formData.append("description", newProduct.description);
      formData.append("sold", 0);
      formData.append("returned", 0);

      const res = await axios.post(`${BASE_URL}/admin/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setSalesData((prev) => [...prev, res.data]);
      setNewProduct({
        name: "",
        transmission: "",
        status: "",
        quantity: 0,
        price: "",
        model_year: "",
        fuel_type: "",
        image: "",
        mileage: "",
        car_type: "",
        make: "",
        condition: "",
        description: "",
      });
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const handleUpdateQuantity = async (id, deltaQuantity) => {
    const product = salesData.find((item) => item.id === id);
    const newQuantity = product.quantity + deltaQuantity;

    if (newQuantity < 0) {
      alert("Error: Quantity cannot be negative.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    try {
      await axios.patch(
        `${BASE_URL}/admin/products/${id}/`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setSalesData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
      alert("Failed to update quantity. Check console for details.");
    }
  };
  

  const handleDeleteProduct = async (id) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      await axios.delete(`${BASE_URL}/admin/products/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Update local state after successful delete
      setSalesData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. You may not be authorized.");
    }
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
        item.name?.toLowerCase().includes(term) ||
        item.transmission?.toLowerCase().includes(term) ||
        item.status?.toLowerCase().includes(term) ||
        item.fuel_type?.toLowerCase().includes(term) ||
        item.model_year?.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      switch (sortMode) {
        case "name":
          return a.name.localeCompare(b.name);
        case "id":
          return a.id - b.id;
        case "priceAsc":
          return parseFloat(a.price) - parseFloat(b.price);
        case "priceDesc":
          return parseFloat(b.price) - parseFloat(a.price);
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
              placeholder="Search by name, transmission, status, fuel type, year"
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
                {[
                  { placeholder: "Name", field: "name" },
                  { placeholder: "Transmission", field: "transmission" },
                  { placeholder: "Status", field: "status" },
                  {
                    placeholder: "Quantity",
                    field: "quantity",
                    type: "number",
                  },
                  { placeholder: "Price", field: "price" },
                  { placeholder: "Year", field: "model_year" },
                  { placeholder: "Fuel Type", field: "fuel_type" },
                  { placeholder: "Mileage", field: "mileage" },
                  { placeholder: "Car Type (ID)", field: "car_type" },
                  { placeholder: "Make (ID)", field: "make" },
                  { placeholder: "Condition", field: "condition" },
                ].map(({ placeholder, field, type }) => (
                  <input
                    key={field}
                    type={type || "text"}
                    placeholder={placeholder}
                    value={newProduct[field]}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, [field]: e.target.value })
                    }
                  />
                ))}
                <textarea
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                ></textarea>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.files[0] })
                  }
                />
              </div>
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
                    <th>Image</th>
                    <th>Name</th>
                    <th>Transmission</th>
                    <th>Status</th>
                    <th>Fuel</th>
                    <th>Year</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>
                        <img
                          src={row.image?.trim() || "/LOGO.svg"}
                          alt={row.name}
                          style={{
                            width: "60px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>{`${row.make?.name || ""} ${row.name}`.trim()}</td>
                      <td>{row.transmission}</td>
                      <td>{row.status}</td>
                      <td>{row.fuel_type}</td>
                      <td>{row.model_year}</td>
                      <td>{row.quantity}</td>
                      <td>${parseFloat(row.price).toLocaleString()}</td>
                      <td>
                        <select id={`action-${row.id}`} defaultValue="add">
                          <option value="add">Add</option>
                          <option value="subtract">Subtract</option>
                        </select>
                        <input
                          type="number"
                          id={`qty-${row.id}`}
                          defaultValue={0}
                          style={{ width: "50px", marginLeft: "4px" }}
                        />
                        <button
                          onClick={() => {
                            const action = document.getElementById(
                              `action-${row.id}`
                            ).value;
                            const inputVal = document.getElementById(
                              `qty-${row.id}`
                            ).value;
                            const qtyChange = Number(inputVal);
                            if (!isNaN(qtyChange)) {
                              const delta =
                                action === "add" ? qtyChange : -qtyChange;
                              handleUpdateQuantity(row.id, delta);
                            }
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
