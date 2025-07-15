import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>No Order Data Found</h2>
        <button onClick={() => navigate("/")} style={{ marginTop: "1rem" }}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "20px auto", fontFamily: "Arial, sans-serif", border:"2px solid grey",borderRadius:"10px"}} className="shadow-lg">
      <h2 style={{ marginBottom: "1.5rem" }} className="text-center">Order Confirmation</h2>
      <p><strong>Name:</strong> {state.firstName} {state.lastName}</p>
      <p><strong>Postal Code:</strong> {state.postalCode}</p>
      <hr style={{ margin: "1rem 0" }} />
      <p><strong>Payment Method:</strong> Card</p>
      <p><strong>Card (Last 4 digits):</strong> **** **** **** {state.cardNumber.slice(-4)}</p>
      <p><strong>Expiry:</strong> {state.expiry}</p>
      <p><strong>CVV:</strong> ***</p>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "2rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderDetails;
