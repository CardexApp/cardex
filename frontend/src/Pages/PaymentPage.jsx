import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    postalCode: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;


    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    }


    if (name === "expiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 4)
        .replace(/^(\d{2})(\d{1,2})?/, (match, p1, p2) =>
          p2 ? `${p1}/${p2}` : p1
        );
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Submitted:", formData);
    toast.success("Payment Successful")
    navigate("/orderDetails", { state: formData });
  };

  const containerStyle = {
    padding: "2rem",
    maxWidth: "500px",
    margin: "2rem auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 0 12px rgba(0, 0, 0, 0.05)",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Payment</h2>
      {step === 1 ? (
        <form onSubmit={handleNext}>
          <div>
            <label style={labelStyle}>First Name:</label>
            <input
              style={inputStyle}
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
            />
          </div>
          <div>
            <label style={labelStyle}>Last Name:</label>
            <input
              style={inputStyle}
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
            />
          </div>
          <div>
            <label style={labelStyle}>Postal Code:</label>
            <input
              style={inputStyle}
              type="text"
              name="postalCode"
              required
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="X00 X00"
            />
          </div>
          <div>
            <label style={labelStyle}>Address:</label>
            <textarea
              style={inputStyle}
              name="address"
              required
              rows="3"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St, City"
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Next
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label style={labelStyle}>Card Number:</label>
            <input
              style={inputStyle}
              type="text"
              name="cardNumber"
              required
              maxLength="19"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div>
            <label style={labelStyle}>Expiry Date (MM/YY):</label>
            <input
              style={inputStyle}
              type="text"
              name="expiry"
              required
              value={formData.expiry}
              onChange={handleChange}
              placeholder="12/25"
            />
          </div>
          <div>
            <label style={labelStyle}>CVV:</label>
            <input
              style={inputStyle}
              type="password"
              name="cvv"
              required
              maxLength="3"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Pay Now
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentPage;
