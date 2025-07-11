import "./Styles/Customers.css";
import { useState } from "react";
import { Dock } from "./Admin";
import { SearchBar } from "./Reusables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTrash,
  faEdit,
  faEye,
  faBan,
  faTruck,
  faFileInvoice,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";


const initialData = [
  {
    id: "1001",
    icon: "faUser",
    name: "Okem",
    email: "okem@example.com",
    address: "Aston University",
    dateOfPurchase: "2025-01-24 14:35",
    status: "Processing",
    delivery: "Express",
    returnRequested: false,
    items: [
      {
        productName: "Range Rover Sport 2025",
        sku: "RR-2025",
        quantity: 1,
        price: "$23564.69",
      },
    ],
    totalPrice: "$23564.69",
  },
  {
    id: "1002",
    icon: "faUser",
    name: "Rosemary",
    email: "rosemary@example.com",
    address: "Aston University",
    dateOfPurchase: "2025-01-23 10:12",
    status: "Shipped",
    delivery: "Standard",
    returnRequested: true,
    items: [
      {
        productName: "Lexus RX 450",
        sku: "LEX-450",
        quantity: 2,
        price: "$18000.00",
      },
    ],
    totalPrice: "$36000.00",
  },
  {
    id: "1003",
    icon: "faUser",
    name: "Mariya",
    email: "mariya@example.com",
    address: "Aston University",
    dateOfPurchase: "2025-01-22 09:50",
    status: "Delivered",
    delivery: "Standard",
    returnRequested: false,
    items: [
      {
        productName: "Audi Q7",
        sku: "AUD-Q7",
        quantity: 1,
        price: "$19500.00",
      },
    ],
    totalPrice: "$19500.00",
  },
  {
    id: "1004",
    icon: "faUser",
    name: "Prince",
    email: "prince@example.com",
    address: "Aston University",
    dateOfPurchase: "2025-01-21 15:00",
    status: "Returned",
    delivery: "Express",
    returnRequested: true,
    items: [
      { productName: "BMW X5", sku: "BMW-X5", quantity: 1, price: "$17000.00" },
    ],
    totalPrice: "$17000.00",
  },
  {
    id: "1005",
    icon: "faUser",
    name: "Faisal",
    email: "faisal@example.com",
    address: "Aston University",
    dateOfPurchase: "2025-01-20 11:20",
    status: "Processing",
    delivery: "Standard",
    returnRequested: false,
    items: [
      {
        productName: "Mercedes GLC",
        sku: "MER-GLC",
        quantity: 1,
        price: "$22000.00",
      },
    ],
    totalPrice: "$22000.00",
  },
  // 14 more
  {
    id: "1006",
    icon: "faUser",
    name: "Chloe",
    email: "chloe@example.com",
    address: "Birmingham",
    dateOfPurchase: "2025-01-19 13:45",
    status: "Shipped",
    delivery: "Express",
    returnRequested: false,
    items: [
      {
        productName: "Tesla Model 3",
        sku: "TES-M3",
        quantity: 1,
        price: "$40000.00",
      },
    ],
    totalPrice: "$40000.00",
  },
  {
    id: "1007",
    icon: "faUser",
    name: "James",
    email: "james@example.com",
    address: "Manchester",
    dateOfPurchase: "2025-01-18 09:30",
    status: "Delivered",
    delivery: "Standard",
    returnRequested: false,
    items: [
      {
        productName: "Honda CR-V",
        sku: "HON-CRV",
        quantity: 2,
        price: "$28000.00",
      },
    ],
    totalPrice: "$56000.00",
  },
  {
    id: "1008",
    icon: "faUser",
    name: "Sophia",
    email: "sophia@example.com",
    address: "Liverpool",
    dateOfPurchase: "2025-01-17 16:20",
    status: "Processing",
    delivery: "Express",
    returnRequested: false,
    items: [
      {
        productName: "Toyota RAV4",
        sku: "TOY-RAV4",
        quantity: 1,
        price: "$30000.00",
      },
    ],
    totalPrice: "$30000.00",
  },
  {
    id: "1009",
    icon: "faUser",
    name: "Liam",
    email: "liam@example.com",
    address: "Leeds",
    dateOfPurchase: "2025-01-16 12:10",
    status: "Returned",
    delivery: "Standard",
    returnRequested: true,
    items: [
      {
        productName: "Nissan Rogue",
        sku: "NIS-ROG",
        quantity: 1,
        price: "$27000.00",
      },
    ],
    totalPrice: "$27000.00",
  },
  {
    id: "1010",
    icon: "faUser",
    name: "Emma",
    email: "emma@example.com",
    address: "Glasgow",
    dateOfPurchase: "2025-01-15 08:00",
    status: "Shipped",
    delivery: "Express",
    returnRequested: false,
    items: [
      {
        productName: "Ford Escape",
        sku: "FOR-ESC",
        quantity: 1,
        price: "$26000.00",
      },
    ],
    totalPrice: "$26000.00",
  },
  {
    id: "1011",
    icon: "faUser",
    name: "Noah",
    email: "noah@example.com",
    address: "Edinburgh",
    dateOfPurchase: "2025-01-14 14:00",
    status: "Delivered",
    delivery: "Standard",
    returnRequested: false,
    items: [
      {
        productName: "Hyundai Tucson",
        sku: "HYU-TUC",
        quantity: 2,
        price: "$25000.00",
      },
    ],
    totalPrice: "$50000.00",
  },
  {
    id: "1012",
    icon: "faUser",
    name: "Olivia",
    email: "olivia@example.com",
    address: "London",
    dateOfPurchase: "2025-01-13 11:25",
    status: "Processing",
    delivery: "Standard",
    returnRequested: false,
    items: [
      {
        productName: "Kia Sportage",
        sku: "KIA-SPT",
        quantity: 1,
        price: "$24000.00",
      },
    ],
    totalPrice: "$24000.00",
  },
  {
    id: "1013",
    icon: "faUser",
    name: "Lucas",
    email: "lucas@example.com",
    address: "Sheffield",
    dateOfPurchase: "2025-01-12 10:10",
    status: "Shipped",
    delivery: "Express",
    returnRequested: false,
    items: [
      {
        productName: "Mazda CX-5",
        sku: "MAZ-CX5",
        quantity: 1,
        price: "$23000.00",
      },
    ],
    totalPrice: "$23000.00",
  },
  {
    id: "1014",
    icon: "faUser",
    name: "Ava",
    email: "ava@example.com",
    address: "Bristol",
    dateOfPurchase: "2025-01-11 15:30",
    status: "Delivered",
    delivery: "Standard",
    returnRequested: false,
    items: [
      {
        productName: "Volkswagen Tiguan",
        sku: "VW-TIG",
        quantity: 1,
        price: "$22000.00",
      },
    ],
    totalPrice: "$22000.00",
  },
  {
    id: "1015",
    icon: "faUser",
    name: "Ethan",
    email: "ethan@example.com",
    address: "Leicester",
    dateOfPurchase: "2025-01-10 09:45",
    status: "Processing",
    delivery: "Standard",
    returnRequested: false,
    items: [
      {
        productName: "Subaru Forester",
        sku: "SUB-FOR",
        quantity: 1,
        price: "$21000.00",
      },
    ],
    totalPrice: "$21000.00",
  },
  {
    id: "1016",
    icon: "faUser",
    name: "Isabella",
    email: "isabella@example.com",
    address: "Coventry",
    dateOfPurchase: "2025-01-09 13:50",
    status: "Returned",
    delivery: "Express",
    returnRequested: true,
    items: [
      {
        productName: "Chevrolet Equinox",
        sku: "CHE-EQU",
        quantity: 1,
        price: "$20000.00",
      },
    ],
    totalPrice: "$20000.00",
  },
  {
    id: "1017",
    icon: "faUser",
    name: "Mason",
    email: "mason@example.com",
    address: "Cardiff",
    dateOfPurchase: "2025-01-08 12:30",
    status: "Shipped",
    delivery: "Standard",
    returnRequested: false,
    items: [
      {
        productName: "Jeep Cherokee",
        sku: "JEP-CHR",
        quantity: 1,
        price: "$19000.00",
      },
    ],
    totalPrice: "$19000.00",
  },
  {
    id: "1018",
    icon: "faUser",
    name: "Mia",
    email: "mia@example.com",
    address: "Southampton",
    dateOfPurchase: "2025-01-07 16:15",
    status: "Delivered",
    delivery: "Express",
    returnRequested: false,
    items: [
      {
        productName: "Volvo XC60",
        sku: "VOL-XC60",
        quantity: 1,
        price: "$28000.00",
      },
    ],
    totalPrice: "$28000.00",
  },
  {
    id: "1019",
    icon: "faUser",
    name: "Logan",
    email: "logan@example.com",
    address: "Nottingham",
    dateOfPurchase: "2025-01-06 10:05",
    status: "Processing",
    delivery: "Standard",
    returnRequested: false,
    items: [
      {
        productName: "Peugeot 3008",
        sku: "PEU-3008",
        quantity: 1,
        price: "$21000.00",
      },
    ],
    totalPrice: "$21000.00",
  },
  {
    id: "1020",
    icon: "faUser",
    name: "Amelia",
    email: "amelia@example.com",
    address: "Brighton",
    dateOfPurchase: "2025-01-05 14:20",
    status: "Shipped",
    delivery: "Express",
    returnRequested: false,
    items: [
      {
        productName: "Skoda Kodiaq",
        sku: "SKO-KOD",
        quantity: 1,
        price: "$22000.00",
      },
    ],
    totalPrice: "$22000.00",
  },
];

const Customers = () => {
  const [orders, setOrders] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = (id) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;

    const newName = prompt("Update Name:", order.name) || order.name;
    const newEmail = prompt("Update Email:", order.email) || order.email;
    const newAddress =
      prompt("Update Address:", order.address) || order.address;

    const updated = orders.map((o) =>
      o.id === id
        ? { ...o, name: newName, email: newEmail, address: newAddress }
        : o
    );
    setOrders(updated);
  };

  const handleBlock = (id) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, isBlocked: !o.isBlocked } : o
    );
    setOrders(updated);
  };

  const handleChangeStatus = (id) => {
    const updated = orders.map((o) => {
      if (o.id !== id) return o;
      let next = o.status;
      if (o.status === "Processing") next = "Shipped";
      else if (o.status === "Shipped") next = "Delivered";
      else if (o.status === "Delivered") next = "Returned";
      else next = "Processing";
      return { ...o, status: next };
    });
    setOrders(updated);
  };

  const handleManageReturn = (id, approve) => {
    const updated = orders.map((o) =>
      o.id === id
        ? {
            ...o,
            returnRequested: false,
            status: approve ? "Returned" : o.status,
          }
        : o
    );
    setOrders(updated);
  };

  const filteredOrders = orders.filter((order) =>
    `${order.name} ${order.email} ${order.address}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customersPage">

      <div className="customersContent">
        <div className="customersHeader">
          <h2>Customer Orders</h2>
          <SearchBar
            type="text"
            placeholder="Search by name, email, address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="customerTableWrapper">
          <div className="customerTableHeader">
            <div>Order ID</div>
            <div>Customer</div>
            <div>Products</div>
            <div>Date/Time</div>
            <div>Status</div>
            <div>Delivery</div>
            <div>Return</div>
            <div>Total</div>
            <div>Actions</div>
          </div>

          <div className="customerTableBody">
            {filteredOrders.map((order) => (
              <div className="orderRow" key={order.id}>
                <div>{order.id}</div>
                <div className="userInfo">
                  <FontAwesomeIcon className="avatar" icon={faUser} />
                  <div className="nameEmail">
                    <p>{order.name}</p>
                    <p className="subText">{order.email}</p>
                    {order.isBlocked && (
                      <span className="blockedTag">Blocked</span>
                    )}
                  </div>
                </div>
                <div>
                  {order.items.map((item, idx) => (
                    <p key={idx}>
                      {item.productName} ({item.sku}) x {item.quantity}
                    </p>
                  ))}
                </div>
                <div>{order.dateOfPurchase}</div>
                <div>{order.status}</div>
                <div>{order.delivery}</div>
                <div>{order.returnRequested ? "Yes" : "No"}</div>
                <div>{order.totalPrice}</div>
                <div className="actions">
                  <button title="View">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button title="Edit" onClick={() => handleEdit(order.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button title="Delete">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button title="Block" onClick={() => handleBlock(order.id)}>
                    <FontAwesomeIcon icon={faBan} />
                  </button>
                  <button title="Invoice">
                    <FontAwesomeIcon icon={faFileInvoice} />
                  </button>
                  <button
                    title="Change Status"
                    onClick={() => handleChangeStatus(order.id)}
                  >
                    <FontAwesomeIcon icon={faTruck} />
                  </button>
                  {order.returnRequested && (
                    <>
                      <button
                        title="Approve Return"
                        onClick={() => handleManageReturn(order.id, true)}
                      >
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </button>
                      <button
                        title="Decline Return"
                        onClick={() => handleManageReturn(order.id, false)}
                      >
                        <FontAwesomeIcon icon={faBan} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dock />
    </div>
  );
};

export default Customers;
