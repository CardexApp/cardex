import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { CartContext } from "../Context/CartContext";
import { BASE_URL } from "../Config";
import { useAuth } from "../Context/AuthContext";
import { useOrders } from "../Context/OrdersContext";


const PaymentPage = () => {
  const user = useAuth();
  const [step, setStep] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const { addOrder } = useOrders();
  const { cartItems, clearCart } = useContext(CartContext);

  const { subtotal, tax, insurance, total } = location.state || {
    subtotal: 0,
    tax: 0,
    insurance: 0,
    total: 0,
  };

  const [formData, setFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    postalCode: "",
    houseAddress: "",
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

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const payload = {
      address: {
        postal_code: formData.postalCode,
        house_address: formData.houseAddress,
      },
      card_details: {
        name_on_card: formData.nameOnCard,
        card_number: formData.cardNumber.replace(/\s/g, ""),
        expiry_date: formData.expiry,
        cvv: formData.cvv,
      },
      items: cartItems.map((item) => ({
        product: item.id,
        quantity: item.quantity || 1, // Default to 1 if quantity is missing
      })),
    };

    try {
      const token = localStorage.getItem("accessToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.post(`${BASE_URL}/checkout/`, payload, {
        headers,
      });

      toast.success("Payment Successful!");

      // Construct local order object
      const newOrder = {
        id: res.data?.order_id || Date.now().toString(),
        name: user?.user?.username || "Guest",
        email: user?.user?.email || "N/A",
        address: formData.houseAddress,
        dateOfPurchase: new Date().toLocaleString(),
        status: "Processing",
        delivery: "Standard",
        returnRequested: false,
        items: cartItems.map((item) => ({
          productName: item.name,
          sku: item.sku,
          quantity: item.quantity || 1,
          price: `£${Number(item.price).toFixed(2)}`,
        })),
        totalPrice: `£${total.toFixed(2)}`,
      };

      addOrder(newOrder); // 🔥 Add it to global context

      clearCart();

      navigate("/orderDetails", {
        state: {
          ...formData,
          subtotal,
          tax,
          insurance,
          total,
          orderId: res.data?.order_id || null,
        },
      });
    } catch (err) {
      console.error("Checkout failed:", err.response?.data || err.message);
      toast.error("Payment failed. Please try again.");
    }    
  };
  
  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Payment</h2>

      {step === 1 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
          className="border border-3 p-5"
        >
          <h3 style={{ marginBottom: "1rem" }}>Enter Address Info</h3>
          <label>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            className="form-control"
            value={formData.postalCode}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "1rem" }}
          />

          <label>House Address:</label>
          <textarea
            name="houseAddress"
            className="form-control"
            value={formData.houseAddress}
            onChange={handleChange}
            required
            rows="2"
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
          <h3 style={{ marginBottom: "1rem" }}>Card Details</h3>

          <label>Name on Card:</label>
          <input
            type="text"
            name="nameOnCard"
            value={formData.nameOnCard}
            onChange={handleChange}
            required
            placeholder="Obianuju Ofodu"
            style={{ width: "100%", marginBottom: "1rem" }}
          />

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
            placeholder="12/26"
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

          <hr />
          <p>
            <strong>Subtotal:</strong> £{subtotal.toLocaleString()}
          </p>
          <p>
            <strong>Tax:</strong> £{tax.toLocaleString()}
          </p>
          <p>
            <strong>Insurance:</strong> £{insurance.toLocaleString()}
          </p>
          <h4>
            <strong>Total:</strong> £{total.toLocaleString()}
          </h4>

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
