import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminAnalytics() {
  const [salesData, setSalesData] = useState([]);
  const [topCars, setTopCars] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);

  useEffect(() => {
    axios
      .get("/api/admin/analytics/weekly-sales/")
      .then((res) => setSalesData(res.data));
    axios
      .get("/api/admin/analytics/top-selling/")
      .then((res) => setTopCars(res.data));
    axios
      .get("/api/admin/analytics/user-growth/")
      .then((res) => setUserGrowth(res.data));
  }, []);

  const salesChartData = {
    labels: salesData.map((item) => item.day),
    datasets: [
      {
        label: "Orders per Day",
        data: salesData.map((item) => item.total),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  const carChartData = {
    labels: topCars.map((item) => item.product__name),
    datasets: [
      {
        label: "Units Sold",
        data: topCars.map((item) => item.sold),
        backgroundColor: "rgba(153,102,255,0.6)",
      },
    ],
  };

  const userChartData = {
    labels: userGrowth.map((item) => item.day),
    datasets: [
      {
        label: "New Users",
        data: userGrowth.map((item) => item.count),
        backgroundColor: "rgba(255,159,64,0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>Weekly Sales</h2>
      <Bar data={salesChartData} />

      <h2>Top 5 Selling Cars</h2>
      <Bar data={carChartData} />

      <h2>New Users This Week</h2>
      <Line data={userChartData} />
    </div>
  );
}
