import React, { useContext, useEffect, useState } from "react";
import "./CarInfoDetails.css";
import { useNavigate, useParams } from "react-router-dom";
// import { data } from "../../../assets/Data/Data";
import { CartContext } from "../../../Context/CartContext";
import axios from "axios";

const CarInfoDetails = () => {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null); // should not be an empty array

  useEffect(() => {
    axios
      .get(`https://cardexbackend.eu.pythonanywhere.com/api/products/${id}/`)
      .then((res) => setCarDetails(res.data))
      .catch((err) =>
        console.error("Failed to fetch car details from backend:", err)
      );
    // **** For testing with hardcoded data ****
    // const selectedCar = data.find((car) => car.id === parseInt(id));
    // setCarDetails(selectedCar);
  }, [id]);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(carDetails);
    navigate("/cart");
  };

  if (!carDetails) return null;

  return (
    <div>
      <div className="carInfoDetails">
        {/* 1. Overview */}
        <section className="sectionBlock">
          <h3>Car Overview</h3>
          <div className="overviewGrid">
            <div className="overviewDetails">
              <div>
                <strong>Car Type:</strong> {carDetails.car_type.name}
              </div>
              <div>
                <strong>Mileage:</strong> {carDetails.mileage}
              </div>
              <div>
                <strong>Fuel Type:</strong> {carDetails.fuel_type}
              </div>
              <div>
                <strong>Transmission:</strong> {carDetails.transmission}
              </div>
              <div>
                <strong>Color:</strong> Silver
              </div>
              <div>
                <strong>Drive Type:</strong> FWD
              </div>
              <div>
                <strong>Doors:</strong> 4
              </div>
              <div>
                <strong>Condition:</strong> New
              </div>
            </div>
            <div>
              <img
                className="overviewImage"
                src={carDetails.image}
                alt={`${carDetails.brand} ${carDetails.name}`}
              />
            </div>
          </div>
        </section>

        {/* 2. Description */}
        <section className="sectionBlock">
          <h3>Description</h3>
          <p>
            The Toyota Camry 2023 is engineered for comfort and style. It
            features advanced safety technology, a spacious interior, and
            powerful performance making it ideal for families and professionals
            alike.
          </p>
        </section>

        {/* 3. Features */}
        <section className="sectionBlock">
          <h3>Features</h3>
          <div className="featuresColumns">
            <div>
              <h4>Interior</h4>
              <ul>
                <li>Touchscreen Display</li>
                <li>Climate Control</li>
                <li>Leather Seats</li>
              </ul>
            </div>
            <div>
              <h4>Safety</h4>
              <ul>
                <li>ABS</li>
                <li>Rear Parking Sensors</li>
                <li>Stability Control</li>
              </ul>
            </div>
            <div>
              <h4>Exterior</h4>
              <ul>
                <li>Alloy Wheels</li>
                <li>LED Headlights</li>
                <li>Sunroof</li>
              </ul>
            </div>
            <div>
              <h4>Comfort</h4>
              <ul>
                <li>Power Steering</li>
                <li>Navigation</li>
                <li>Bluetooth</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Dimensions */}
        <section className="sectionBlock">
          <h3>Dimensions & Capacity</h3>
          <div className="dimensionGrid">
            <div>
              <strong>Length:</strong> 4850mm
            </div>
            <div>
              <strong>Width:</strong> 1820mm
            </div>
            <div>
              <strong>Height:</strong> 1455mm
            </div>
            <div>
              <strong>Boot Space:</strong> 500L
            </div>
            <div>
              <strong>Fuel Tank:</strong> 60L
            </div>
          </div>
        </section>

        {/* 5. Engine */}
        <section className="sectionBlock">
          <h3>Engine & Transmission</h3>
          <div className="dimensionGrid">
            <div>
              <strong>Engine:</strong> 2.5L 4-Cylinder
            </div>
            <div>
              <strong>Horsepower:</strong> 203 hp
            </div>
            <div>
              <strong>Torque:</strong> 250 Nm
            </div>
            <div>
              <strong>Transmission:</strong> 8-speed automatic
            </div>
          </div>
        </section>

        {/* 6. Action Buttons */}
        <section className="sectionBlock">
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary px-4 py-2 fs-5"
            >
              Add to Cart
            </button>
            <button className="btn btn-success px-4 py-2 fs-5">Buy Now</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CarInfoDetails;
