import React, { useContext, useEffect, useState } from "react";
import "./CarInfoDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { data } from "../../../assets/Data/Data";
import { CartContext } from "../../../Context/CartContext";

//FOr Dynamic data handling when the backend team updates their section
// const { id } = useParams();
// useEffect(() => {
//   const selectedCar = data.find((car) => car.id === parseInt(id));
//   setCarDetails(selectedCar);
// }, [id]);

const CarInfoDetails = () => {
  const { id } = useParams();

  const [carDetails, setCarDetails] = useState([]);
  useEffect(() => {
    const selectedCar = data.find((car) => car.id === parseInt(id));
    setCarDetails(selectedCar);
  }, [id]);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const handleAddToCart = () => {
    addToCart(carDetails);
    navigate("/cart");
  };

  if (!carDetails) return;

  return (
    <div>
      <div className="car-info-details">
        {/* 1. Overview */}
        <section className="section-block">
          <h3>Car Overview</h3>
          <div className="overview-grid">
            <div>
              <div>
                <strong>Car Type:</strong> {carDetails.carType}
              </div>
              <div>
                <strong>Mileage:</strong> {carDetails.mileage}
              </div>
              <div>
                <strong>Fuel Type:</strong> {carDetails.fuelType}
              </div>
              <div>
                <strong>Transmission:</strong> Automatic
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
          </div>
        </section>

        {/* 2. Description */}
        <section className="section-block">
          <h3>Description</h3>
          <p>
            The Toyota Camry 2023 is engineered for comfort and style. It
            features advanced safety technology, a spacious interior, and
            powerful performance making it ideal for families and professionals
            alike.
          </p>
        </section>

        {/* 3. Features */}
        <section className="section-block">
          <h3>Features</h3>
          <div className="features-columns">
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
        <section className="section-block">
          <h3>Dimensions & Capacity</h3>
          <div className="dimension-grid">
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
        <section className="section-block">
          <h3>Engine & Transmission</h3>
          <div className="dimension-grid">
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
<<<<<<< HEAD
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
      <section>
        <div className="">
          <button className="btn btn-success px-4 py-2 fs-4">Buy now</button>
        </div>
      </section>
=======
        </section>
      </div>
      <div className="addToCart">
        <button onClick={handleAddToCart}>Add to cart</button>
      </div>
>>>>>>> 04e95dff6563b6572718de3d35e1f4be9ef3178d
    </div>
  );
};

export default CarInfoDetails;
