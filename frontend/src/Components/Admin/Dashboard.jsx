import "./Styles/Dashboard.css"
import { Dock } from "./Admin";
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
    status: "Delivered",
    price: "$14500.00",
  },
  {
    id: "3",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Mariya",
    address: "Aston University",
    dateOfPurchase: "23/01/2025",
    status: "In Transit",
    price: "$17500.50",
  },
  {
    id: "4",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Prince",
    address: "Aston University",
    dateOfPurchase: "22/01/2025",
    status: "Processing",
    price: "$23564.69",
  },
  {
    id: "5",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Faisal",
    address: "Aston University",
    dateOfPurchase: "21/01/2025",
    status: "Returned",
    price: "$5000.00",
  },
  {
    id: "6",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Johnpaul",
    address: "Aston University",
    dateOfPurchase: "20/01/2025",
    status: "In Transit",
    price: "$23564.69",
  },
  {
    id: "7",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Jessica",
    address: "Birmingham City",
    dateOfPurchase: "19/01/2025",
    status: "Delivered",
    price: "$19800.00",
  },
  {
    id: "8",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Daniel",
    address: "Coventry University",
    dateOfPurchase: "18/01/2025",
    status: "Processing",
    price: "$15200.00",
  },
  {
    id: "9",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Sarah",
    address: "Warwick University",
    dateOfPurchase: "17/01/2025",
    status: "Returned",
    price: "$13400.00",
  },
  {
    id: "10",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Michael",
    address: "Manchester University",
    dateOfPurchase: "16/01/2025",
    status: "In Transit",
    price: "$16500.00",
  },
  {
    id: "11",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Tina",
    address: "Leeds University",
    dateOfPurchase: "15/01/2025",
    status: "Delivered",
    price: "$19000.00",
  },
  {
    id: "12",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Ahmed",
    address: "Bristol University",
    dateOfPurchase: "14/01/2025",
    status: "Processing",
    price: "$22000.00",
  },
  {
    id: "13",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Emily",
    address: "London Met",
    dateOfPurchase: "13/01/2025",
    status: "Returned",
    price: "$9500.00",
  },
  {
    id: "14",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "James",
    address: "Oxford University",
    dateOfPurchase: "12/01/2025",
    status: "In Transit",
    price: "$28000.00",
  },
  {
    id: "15",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Sophia",
    address: "Cambridge University",
    dateOfPurchase: "11/01/2025",
    status: "Delivered",
    price: "$31000.00",
  },
  {
    id: "16",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Joshua",
    address: "Liverpool University",
    dateOfPurchase: "10/01/2025",
    status: "Processing",
    price: "$15000.00",
  },
  {
    id: "17",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Olivia",
    address: "Sheffield University",
    dateOfPurchase: "09/01/2025",
    status: "In Transit",
    price: "$20000.00",
  },
  {
    id: "18",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "William",
    address: "Cardiff University",
    dateOfPurchase: "08/01/2025",
    status: "Delivered",
    price: "$24000.00",
  },
  {
    id: "19",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Chloe",
    address: "Nottingham University",
    dateOfPurchase: "07/01/2025",
    status: "Returned",
    price: "$12000.00",
  },
  {
    id: "20",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Ethan",
    address: "Durham University",
    dateOfPurchase: "06/01/2025",
    status: "Processing",
    price: "$17500.00",
  },
  {
    id: "21",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Grace",
    address: "York University",
    dateOfPurchase: "05/01/2025",
    status: "In Transit",
    price: "$14000.00",
  },
  {
    id: "22",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Logan",
    address: "Essex University",
    dateOfPurchase: "04/01/2025",
    status: "Delivered",
    price: "$13000.00",
  },
  {
    id: "23",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Lily",
    address: "Kent University",
    dateOfPurchase: "03/01/2025",
    status: "Processing",
    price: "$16000.00",
  },
  {
    id: "24",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Noah",
    address: "Surrey University",
    dateOfPurchase: "02/01/2025",
    status: "In Transit",
    price: "$19500.00",
  },
  {
    id: "25",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Ella",
    address: "Leicester University",
    dateOfPurchase: "01/01/2025",
    status: "Delivered",
    price: "$22500.00",
  },
  {
    id: "26",
    avatar: <FontAwesomeIcon className="fontIcon" icon={faUser} />,
    name: "Harry",
    address: "Brighton University",
    dateOfPurchase: "31/12/2024",
    status: "Returned",
    price: "$11000.00",
  },
];


const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <div className="dashBoard">
        <div className="dashBoardArea">
          <div className="dashBoardHeading">
            <h3>Recent Purchases</h3>
            <FontAwesomeIcon icon={faRotate} />
          </div>

          <div className="dashBoardTableWrapper">
            <div className="dashBoardTableHeader">
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

            <div className="dashBoardTableBody">
              {data.map((row) => (
                <Fragment key={row.id}>
                  <div className="dashBoardProfile child">
                    {row.avatar}
                    <p className="dashBoardName child">{row.name}</p>
                  </div>
                  <div className="dashBoardAddress child">
                    <p>{row.address}</p>
                  </div>
                  <div className="orderDate child">
                    <p>{row.dateOfPurchase}</p>
                  </div>
                  <div className="dashBoardStatus child">
                    <p>{row.status}</p>
                  </div>
                  <div className="priceOfGoods child">
                    <p>{row.price}</p>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dock />
    </div>
  );
};

export default Dashboard;
