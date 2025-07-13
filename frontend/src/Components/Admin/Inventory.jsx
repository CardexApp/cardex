import "./Styles/Inventory.css";
import { Dock } from "./Admin";
import { useState, useEffect } from "react";
import { SearchBar } from "./Reusables";
import axios from "axios";
import { BASE_URL } from "../../Config";

const InventoryPage = () => {
  const carTypeOptions = [
    { id: 1, name: "sedan" },
    { id: 2, name: "SUV" },
    { id: 3, name: "convertible" },
    { id: 4, name: "minivan" },
    { id: 5, name: "hatchback" },
    { id: 6, name: "coupe" },
    { id: 7, name: "crossover" },
  ];

  const fuelOptions = ["electric", "hydrogen", "diesel", "petrol"];
  const conditionOptions = ["new", "used"];
  const transmissionOptions = ["manual", "automatic"];
  
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
    car_type: "", 
    make: "", 
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
      updateStockAlerts(salesData);
    }, [salesData]);
    

  const updateStockAlerts = (data) => {
    const lowStock = data.filter(
      (item) => item.quantity > 0 && item.quantity <= 3
    );
    const outOfStock = data.filter((item) => item.quantity === 0);
    const alertMsgs = [
      ...lowStock.map(
        (item) => `⚠️ Low stock: ${item.name} (${item.quantity})`
      ),
      ...outOfStock.map((item) => `❌ Out of stock: ${item.name}`),
    ];
    setAlerts(alertMsgs);
  };
  

  const handleAddProduct = async () => {
    const accessToken = localStorage.getItem("accessToken");

    // Basic validation
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.car_type ||
      !newProduct.make ||
      !newProduct.image
    ) {
      alert(
        "Please fill in all required fields including image, car type, and make."
      );
      return;
    }

    // Ensure image is a File object
    if (!(newProduct.image instanceof File)) {
      alert("Please upload a valid image file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description || "");
      formData.append("mileage", newProduct.mileage || "0");
      formData.append("model_year", newProduct.model_year || "");
      formData.append("transmission", newProduct.transmission || "");
      formData.append("fuel_type", newProduct.fuel_type || "");
      formData.append("condition", newProduct.condition || "");
      formData.append("quantity", String(parseInt(newProduct.quantity) || 1));
      formData.append("image", newProduct.image);
      formData.append("car_type", parseInt(newProduct.car_type));
      formData.append("make", parseInt(newProduct.make));
      formData.append("sold", "0");
      formData.append("returned", "0");

      const res = await axios.post(`${BASE_URL}/admin/products/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setSalesData((prev) => [...prev, res.data]);
      setSearchTerm(""); // Ensure new product appears in filteredData

      setNewProduct({
        name: "",
        transmission: "",
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
      console.log("Server response:", err.response?.data);
      alert("Failed to add product. Check console for details.");
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
                <input
                  type="text"
                  placeholder="Name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />

                {/* Transmission Dropdown */}
                <select
                  value={newProduct.transmission}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      transmission: e.target.value,
                    })
                  }
                >
                  <option value="">Select Transmission</option>
                  <option value="manual">manual</option>
                  <option value="automatic">automatic</option>
                </select>

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
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Year"
                  value={newProduct.model_year}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, model_year: e.target.value })
                  }
                />

                {/* Fuel Type Dropdown */}
                <select
                  value={newProduct.fuel_type}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, fuel_type: e.target.value })
                  }
                >
                  <option value="">Select Fuel Type</option>
                  <option value="electric">electric</option>
                  <option value="hydrogen">hydrogen</option>
                  <option value="diesel">diesel</option>
                  <option value="petrol">petrol</option>
                </select>

                <input
                  type="text"
                  placeholder="Mileage"
                  value={newProduct.mileage}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, mileage: e.target.value })
                  }
                />

                {/* Car Type Dropdown (ID required) */}
                <select
                  value={newProduct.car_type}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      car_type: parseInt(e.target.value),
                    })
                  }
                >
                  <option value="">Select Car Type</option>
                  <option value="1">sedan</option>
                  <option value="2">SUV</option>
                  <option value="3">convertible</option>
                  <option value="4">minivan</option>
                  <option value="5">hatchback</option>
                  <option value="6">coupe</option>
                  <option value="7">crossover</option>
                </select>

                {/* Make Input (ID expected) */}
                <input
                  type="text"
                  placeholder="Make (ID)"
                  value={newProduct.make}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, make: e.target.value })
                  }
                />

                {/* Condition Dropdown */}
                <select
                  value={newProduct.condition}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, condition: e.target.value })
                  }
                >
                  <option value="">Select Condition</option>
                  <option value="new">new</option>
                  <option value="used">used</option>
                </select>

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
