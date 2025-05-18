import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";

const CartPage = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
            <img src={item.image} alt={item.name} style={{ width: "200px" }} />
            <h2>{item.brand} {item.name} {item.model}</h2>
            <p>{item.description}</p>
            <p><strong>Price:</strong> £{item.price.toLocaleString()}</p>
            <p><strong>Mileage:</strong> {item.mileage} Miles</p>
            <p><strong>Fuel Type:</strong> {item.fuelType}</p>
            <p><strong>Car Type:</strong> {item.carType}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
