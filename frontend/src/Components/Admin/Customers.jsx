import "./Admin";
import { Fragment } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faUser } from "@fortawesome/free-solid-svg-icons";

const data = [
  {
    id: "1",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Okem",
    address: "Aston University",
    dateOfPurchase: "24/01/2025",
    status: "In Transit",
    price: "$23564.69",
  },
  {
    id: "2",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Rosemary",
    address: "Aston University",
    dateOfPurchase: "24/01/2025",
    status: "In Transit",
    price: "$23564.69",
  },
  {
    id: "3",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Mariya",
    address: "Aston University",
    dateOfPurchase: "24/01/2025",
    status: "In Transit",
    price: "$23564.69",
  },

  {
    id: "4",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Prince",
    address: "Aston University",
    dateOfPurchase: "24/01/2025",
    status: "In Transit",
    price: "$23564.69",
  },

  {
    id: "5",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Faisal",
    address: "Aston University",
    dateOfPurchase: "24/01/2025",
    status: "In Transit",
    price: "$23564.69",
  },
  {
    id: "6",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Johnpaul",
    address: "Aston University",
    dateOfPurchase: "24/01/2025",
    status: "In Transit",
    price: "$23564.69",
  },
];

const Customers = () => {
  return (
    <div className="customers">
      <div className="customerHeading">
        <h3>Customer Order</h3>
        <FontAwesomeIcon icon={faRotate} />
      </div>

      {/* List of customers in database */}
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
        </div>

        <div className="customerTableBody">
          {data.map((row) => (
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
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customers;
