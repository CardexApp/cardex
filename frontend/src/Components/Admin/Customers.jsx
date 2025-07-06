import "./Styles/Customers.css";
import { Fragment, useState, useEffect } from "react";
import { AdminMenu, Dock } from "./Admin";
import { SearchBar } from "./Reusables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotate,
  faUser,
  faTrash,
  faEdit,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const initialData = [
  {
    id: "1",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Okem",
    address: "Aston University",
    dateOfPurchase: "24/01/2025",
    status: "Processing",
    price: "$23564.69",
  },
  {
    id: "2",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Rosemary",
    address: "Aston University",
    dateOfPurchase: "23/01/2025",
    status: "Shipped",
    price: "$18000.00",
  },
  {
    id: "3",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Mariya",
    address: "Aston University",
    dateOfPurchase: "22/01/2025",
    status: "Delivered",
    price: "$19500.00",
  },
  {
    id: "4",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Prince",
    address: "Aston University",
    dateOfPurchase: "21/01/2025",
    status: "Returned",
    price: "$17000.00",
  },
  {
    id: "5",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Faisal",
    address: "Aston University",
    dateOfPurchase: "20/01/2025",
    status: "Processing",
    price: "$22000.00",
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for customer ID: ${id} (to be implemented)`);
  };

  const handleAdd = () => {
    alert("Add customer functionality (to be implemented)");
  };

  useEffect(() => {
    // API integration using Axios
    // axios.get('/api/customers').then(response => setCustomers(response.data));
  }, []);

  return (
    <div className="customersPage">
      <AdminMenu />

      <div className="customersContent">
        <div className="customersHeader">
          <h2>Customer Orders</h2>
          <SearchBar onSearch={setSearchTerm} />
          <button className="addButton" onClick={handleAdd}>
            <FontAwesomeIcon icon={faPlus} /> Add Customer Order
          </button>
        </div>

        <div className="customerTableWrapper">
          <div className="customerTableHeader">
            <div>
              <h4>Customer Name</h4>
            </div>
            <div>
              <h4>Address</h4>
            </div>
            <div>
              <h4>Purchase Date</h4>
            </div>
            <div>
              <h4>Status</h4>
            </div>
            <div>
              <h4>Price</h4>
            </div>
            <div>
              <h4>Actions</h4>
            </div>
          </div>

          <div className="customerTableBody">
            {filteredCustomers.map((row) => (
              <Fragment key={row.id}>
                <div className="customerProfile">
                  {row.avatar}
                  <p className="customerName">{row.name}</p>
                </div>
                <div className="customerAddress">
                  <p>{row.address}</p>
                </div>
                <div className="orderDate">
                  <p>{row.dateOfPurchase}</p>
                </div>
                <div className="CustomerStatus">
                  <p>{row.status}</p>
                </div>
                <div className="priceOfGoods">
                  <p>{row.price}</p>
                </div>
                <div className="actions">
                  <button onClick={() => handleEdit(row.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={() => handleDelete(row.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <Dock />
    </div>
  );
};

export default Customers;
