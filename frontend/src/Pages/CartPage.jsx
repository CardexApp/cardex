import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { useLocation } from "react-router-dom";

const TAX_RATE = 0.2; // 20% VAT
const INSURANCE_PER_CAR = 500; // Flat estimate

const CartPage = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const subtotal = Number(
    cartItems.reduce((acc, item) => acc + Number(item.price), 0)
  );
  const tax = subtotal * TAX_RATE;
  const insurance = cartItems.length * INSURANCE_PER_CAR;
  const total = subtotal + tax + insurance;

  const handleProceedToPayment = () => {
    navigate("/payment", {
      state: {
        subtotal,
        tax,
        insurance,
        total,
      },
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              border: "1px solid #ccc",
              padding: "1rem",
              margin: "1rem 0",
              borderRadius: "8px",
              gap: "1.5rem",
            }}
          >
            <div>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "550px", height: "450px", borderRadius: "8px" }}
              />
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <h3>
                {item.brand} {item.name} {item.model}
              </h3>
              <p style={{ marginBottom: "1rem" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, itaque animi odio ratione iure atque ad facilis
                accusantium saepe, placeat distinctio aspernatur dicta beatae
                quo neque soluta iste exercitationem obcaecati?
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                <p>
                  <strong>Price:</strong> £{item.price.toLocaleString()}
                </p>
                <p>
                  <strong>Mileage:</strong> {item.mileage} Miles
                </p>
                <p>
                  <strong>Fuel Type:</strong> {item.fuelType}
                </p>
                <p>
                  <strong>Car Type:</strong> {item.carType}
                </p>
              </div>

              <div
                className="d-flex flex-column justify-content-end"
                style={{
                  marginTop: "2rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #ccc",
                }}
              >
                <p>
                  <strong>Subtotal:</strong> £{subtotal.toFixed(2)}
                </p>
                <p>
                  <strong>Tax (20% VAT):</strong> £{tax.toFixed(2)}
                </p>
                <p>
                  <strong>Estimated Insurance:</strong> £{insurance.toFixed(2)}
                </p>
                <h3>
                  <strong>Total:</strong> £{total.toFixed(2)}
                </h3>

                <button
                  onClick={handleProceedToPayment}
                  style={{
                    marginTop: "1rem",
                    padding: "0.75rem 1.5rem",
                    fontSize: "1rem",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
