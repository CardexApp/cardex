import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumbs.css"; // Optional CSS styling

const Breadcrumbs = () => {
  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link> &gt; <Link to="/listings">Listing</Link> &gt;{" "}
      <span className="current-page">Toyota Camry New</span>
    </nav>
  );
};

export default Breadcrumbs;
