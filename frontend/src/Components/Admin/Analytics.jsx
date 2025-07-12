import "./Styles/Analytics.css";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Dock } from "./Admin";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Analytics = () => {
  const [ordersByMonth, setOrdersByMonth] = useState([]);
  const [revenueByMonth, setRevenueByMonth] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [weeklySales, setWeeklySales] = useState([]);
  const [topCars, setTopCars] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [ordersRes, salesRes, topCarsRes, usersRes] = await Promise.all([
          axios.get("/admin/orders/analytics"),
          axios.get("/api/admin/analytics/weekly-sales/"),
          axios.get("/api/admin/analytics/top-selling/"),
          axios.get("/api/admin/analytics/user-growth/"),
        ]);

        const orders = ordersRes.data;
        const byMonth = Array(12).fill(0);
        const revenue = Array(12).fill(0);
        const statusMap = {};

        orders.forEach((o) => {
          const date = new Date(o.dateOfPurchase);
          const month = date.getMonth();
          byMonth[month]++;
          revenue[month] += parseFloat(o.totalPrice);
          statusMap[o.status] = (statusMap[o.status] || 0) + 1;
        });

        const sorted = orders.sort(
          (a, b) => new Date(b.dateOfPurchase) - new Date(a.dateOfPurchase)
        );
        setOrdersByMonth(byMonth);
        setRevenueByMonth(revenue);
        setStatusCounts(statusMap);
        setRecentOrders(sorted.slice(0, 5));
        setWeeklySales(salesRes.data);
        setTopCars(topCarsRes.data);
        setUserGrowth(usersRes.data);
      } catch (err) {
        console.error("Analytics fetch error:", err);
      }
    };

    fetchAllData();
  }, []);

  // Chart data formats
  const monthlyOrders = {
    labels: months,
    datasets: [
      { label: "Orders", data: ordersByMonth, backgroundColor: "#36A2EB" },
    ],
  };

  const monthlyRevenue = {
    labels: months,
    datasets: [
      {
        label: "Revenue ($)",
        data: revenueByMonth,
        borderColor: "#FF6384",
        backgroundColor: "#FF6384AA",
        tension: 0.3,
      },
    ],
  };

  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Order Status",
        data: Object.values(statusCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const weeklySalesChart = {
    labels: weeklySales.map((i) => i.day),
    datasets: [
      {
        label: "Orders per Day",
        data: weeklySales.map((i) => i.total),
        backgroundColor: "#4BC0C0",
      },
    ],
  };

  const topCarsChart = {
    labels: topCars.map((i) => i.product__name),
    datasets: [
      {
        label: "Units Sold",
        data: topCars.map((i) => i.sold),
        backgroundColor: "#9966FF",
      },
    ],
  };

  const userGrowthChart = {
    labels: userGrowth.map((i) => i.day),
    datasets: [
      {
        label: "New Users",
        data: userGrowth.map((i) => i.count),
        backgroundColor: "#FF9F40",
      },
    ],
  };

  return (
    <div className="analyticsPage">
      <h2>Admin Analytics Dashboard</h2>

      <div className="chartGrid">
        <div className="chartCard">
          <h4>Orders per Month</h4>
          <Bar data={monthlyOrders} />
        </div>
        <div className="chartCard">
          <h4>Revenue per Month</h4>
          <Line data={monthlyRevenue} />
        </div>
        <div className="chartCard">
          <h4>Orders by Status</h4>
          <Pie data={statusData} />
        </div>
      </div>

      <div className="chartGrid">
        <div className="chartCard">
          <h4>Weekly Sales</h4>
          <Bar data={weeklySalesChart} />
        </div>
        <div className="chartCard">
          <h4>Top 5 Selling Cars</h4>
          <Bar data={topCarsChart} />
        </div>
        <div className="chartCard">
          <h4>New Users This Week</h4>
          <Line data={userGrowthChart} />
        </div>
      </div>

      <div className="recentActivity">
        <h4>Recent Orders</h4>
        <table className="recentTable">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Status</th>
              <th>Date</th>
              <th>Total ($)</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id}>
                <td>{o.name}</td>
                <td>{o.status}</td>
                <td>{new Date(o.dateOfPurchase).toLocaleDateString()}</td>
                <td>{Number(o.totalPrice).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dock />
    </div>
  );
};

export default Analytics;
