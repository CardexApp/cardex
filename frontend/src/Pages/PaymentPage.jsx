import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  const { subtotal, tax, insurance, total } = location.state || {
    subtotal: 0,
    tax: 0,
    insurance: 0,
    total: 0,
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    postalCode: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

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

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const isExpiryValid = (expiry) => {
    const [month, year] = expiry.split("/").map(Number);
    if (!month || !year || month < 1 || month > 12) return false;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // 0-based
    const currentYear = currentDate.getFullYear() % 100; // get last 2 digits

    return (
      year > currentYear || (year === currentYear && month >= currentMonth)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isExpiryValid(formData.expiry)) {
      toast.error("Card expiry date is invalid or expired");
      return;
    }

    toast.success("Payment Successful");
    navigate("/orderDetails", {
      state: {
        ...formData,
        subtotal,
        tax,
        insurance,
        total,
      },
    });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Payment</h2>

      {step === 1 ? (
        <form onSubmit={handleNext} className="border border-3 p-5">
          <h3 style={{ marginBottom: "1rem" }}>Enter your details</h3>
          {["firstName", "lastName", "postalCode"].map((field) => (
            <div key={field}>
              <label>{field.replace(/([A-Z])/g, " $1")}:</label>
              <input
                type="text"
                name={field}
                className="form-control"
                value={formData[field]}
                onChange={handleChange}
                required
                style={{ width: "100%", marginBottom: "1rem" }}
              />
            </div>
          ))}
          <label>Address:</label>
          <textarea
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            style={{ width: "100%", marginBottom: "1.5rem" }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            Next
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="border border-3 p-5">
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            maxLength="19"
            placeholder="1234 5678 9012 3456"
            style={{ width: "100%", marginBottom: "1rem" }}
          />

          <label>Expiry Date (MM/YY):</label>
          <input
            type="text"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            required
            placeholder="12/25"
            style={{ width: "100%", marginBottom: "1rem" }}
          />

          <label>CVV:</label>
          <input
            type="password"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            required
            maxLength="3"
            placeholder="123"
            style={{ width: "100%", marginBottom: "1.5rem" }}
          />

          {/* Price Summary */}
          <hr />
          <p>
            <strong>Subtotal:</strong> £{subtotal.toLocaleString()}
          </p>
          <p>
            <strong>Tax (20% VAT):</strong> £{tax.toLocaleString()}
          </p>
          <p>
            <strong>Insurance:</strong> £{insurance.toLocaleString()}
          </p>
          <h3>
            <strong>Total:</strong> £{total.toLocaleString()}
          </h3>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "1.5rem" }}
          >
            Pay Now
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentPage;
