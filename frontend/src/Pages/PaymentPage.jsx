import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { CartContext } from "../Context/CartContext";

const PaymentPage = () => {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext); // Access cart items

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
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    return (
      year > currentYear || (year === currentYear && month >= currentMonth)
    );
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!isExpiryValid(formData.expiry)) {
    toast.error("Card expiry date is invalid or expired (use MM/YY)");
    return;
  }

  // Convert MM/YY to YYYY-MM-DD format
  const [month, yearShort] = formData.expiry.split("/");
  const year = `20${yearShort}`;
  const formattedExpiry = `${year}-${month.padStart(2, "0")}-01`;

  // Assuming you allow only 1 item in cart:
  if (cartItems.length !== 1) {
    toast.error("Only one item can be checked out at a time.");
    return;
  }

  const selectedProductId = cartItems[0].id;

  const payload = {
    guest_customer: {
      first_name: formData.firstName,
      last_name: formData.lastName,
      address: {
        house_address: formData.address,
        postal_code: formData.postalCode,
      },
      card_details: {
        name_on_card: `${formData.firstName} ${formData.lastName}`,
        card_number: formData.cardNumber.replace(/\s/g, ""),
        expiry_date: formattedExpiry,
        cvv: formData.cvv,
      },
    },
    product: selectedProductId, // not a list!
    subtotal,
    tax,
    insurance,
    total,
  };

  try {
    const response = await axios.post(
      "https://cardexbackend.eu.pythonanywhere.com/api/guest-checkout/",
      payload
    );

    toast.success("Payment Successful!");

    navigate("/orderDetails", {
      state: {
        ...formData,
        subtotal,
        tax,
        insurance,
        total,
        orderId: response.data?.order_id || null,
      },
    });
  } catch (error) {
    console.error("Checkout failed:", error.response?.data || error.message);
    toast.error("Payment failed. Please check your details and try again.");
  }
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
