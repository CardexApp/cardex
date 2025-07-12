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
      .get(`https://sparkling-chelsae-cardex-cd058300.koyeb.app/${id}/`)
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
    console.log("Added to cart - ID:", carDetails.id); // ✅ Log ID
    addToCart(carDetails);
    navigate("/cart");
  };

  const handleBuyNow = () => {
    console.log("Buy Now clicked - ID:", carDetails.id); // ✅ Log ID
    addToCart(carDetails);
    navigate("/payment");
  };

  if (!carDetails) return null;

  return (
    // Breadcrumbs

    <div className="carInfoDetails">
      <div className="breadcrumbs">
        <span>Home</span>

        <span className="breadcrumbsSeparator">&gt;</span>
        <span>Listings</span>
        <span className="breadcrumbsSeparator">&gt;</span>
        <span className="breadcrumbsActive">{`${carDetails.car_type.name} ${carDetails.name}`}</span>
      </div>

      {/* Title and Description Container */}
      <div className="heading">
        <h1>{`${carDetails.car_type.name} ${carDetails.name}`}</h1>
        <p>3.5 D5 PowerPulse Momentum 5dr AWD Geartronic Estate</p>
      </div>

      <section className="hero">
        <div className="leftSidebar">
          {/* Specifications and CTA's */}
          <div className="banner">
            {/* Features of product */}
            <div className="features">
              <span className="featuresbtn">{carDetails.model_year} </span>
              <span className="featuresbtn">{carDetails.mileage} </span>
              <span className="featuresbtn">{carDetails.transmission} </span>
              <span className="featuresbtn">{carDetails.fuel_type} </span>
            </div>

            {/* Site functions (share, save and compare) */}
            <div className="CTA">
              <span className="ctabtn">Share </span>
              <span className="ctabtn">Save </span>
              <span className="ctabtn">Compare </span>
            </div>
          </div>

          {/* Media section */}
          <div className="main">
            <div className="media">
              <img
                className="overviewImage"
                src={carDetails.image}
                alt={`${carDetails.make.name} ${carDetails.name}`}
              />
              <label className="mediaLabel" htmlFor="#">
                Great Price
              </label>
            </div>
            {/* Side bar information */}
            <aside>
              <div className="rightSideBar">
                <div className="buy">
                  <h4>Our Price</h4>
                  <h2>{carDetails.price}</h2>
                  <div>
                    <p>
                      Instant Savings:&nbsp; &nbsp;
                      <span className="priceSymbol">&pound;</span>
                      <span className="price">{carDetails.price}</span>
                    </p>
                  </div>

                  <div className="checkout">
                    <button onClick={handleBuyNow} className="buyNow">
                      Buy Now
                    </button>
                    <button onClick={handleAddToCart} className="addToCart">
                      Add to cart
                    </button>
                  </div>
                  <button>Schedule</button>
                </div>

                <div className="dealer">
                  <h4>Admin</h4>
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                  <div>
                    <span>Get DIrection </span>
                    <span>Phone Number</span>
                  </div>
                  <button>Message Dealer</button>
                  <button>Chat via Whatsapp</button>
                  <button>View all stock from Dealer</button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Car Overview this one is for me. */}
      <div className="productDetails">
        <div className="carDetails">
          {/* Car Specifications*/}
          <section className="specifications">
            <h2>Car Overview</h2>
            {/* First column under car overview */}
            <div className="carOverview">
              <div className="leftColumn">
                <div className="specList">
                  <div className="specName">
                    <img src="" alt="icon" />
                    <h4>Body</h4>
                  </div>
                  <p>{carDetails.car_type.name}</p>
                </div>
                <div className="specList">
                  <div className="specName">
                    <img src="" alt="icon" />
                    <h4>Mileage</h4>
                  </div>
                  <p>{carDetails.mileage}</p>
                </div>
                <div className="specList">
                  <div className="specName">
                    <img src="" alt="icon" />
                    <h4>Fuel Type</h4>
                  </div>
                  <p>{carDetails.fuel_type}</p>
                </div>
                <div className="specList">
                  <div className="specName">
                    <img src="" alt="icon" />
                    <h4>Year</h4>
                  </div>
                  <p>{carDetails.model_year}</p>
                </div>
                <div className="specList">
                  <div className="specName">
                    <img src="" alt="icon" />
                    <h4>Transmission</h4>
                  </div>
                  <p>{carDetails.transmission}</p>
                </div>
                <div className="specList">
                  <div className="specName">
                    <img src="" alt="icon" />
                    <h4>Drive Type</h4>
                  </div>
                  <p>Rear wheel Drive</p>
                </div>
              </div>
              {/* Second column under car overview */}
              <div className="rightColumn">
                <div className="rightColumn">
                  <div className="specList">
                    <div className="specName">
                      <img src="" alt="icon" />
                      <h4>Condition</h4>
                    </div>
                    <p>Used</p>
                  </div>
                  <div className="specList">
                    <div className="specName">
                      <img src="" alt="icon" />
                      <h4>Engine Size</h4>
                    </div>
                    <p>4.0</p>
                  </div>
                  <div className="specList">
                    <div className="specName">
                      <img src="" alt="icon" />
                      <h4>Doors</h4>
                    </div>
                    <p>4 doors</p>
                  </div>
                  <div className="specList">
                    <div className="specName">
                      <img src="" alt="icon" />
                      <h4>Cylinder</h4>
                    </div>
                    <p>12</p>
                  </div>
                  <div className="specList">
                    <div className="specName">
                      <img src="" alt="icon" />
                      <h4>Color</h4>
                    </div>
                    <p>Black</p>
                  </div>
                  <div className="specList">
                    <div className="specName">
                      <img src="" alt="icon" />
                      <h4>VIN</h4>
                    </div>
                    <p>FCB1234567</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Car description */}
          <section className="description">
            <article className="carDescription">
              <h3>Description</h3>
              <p>
                {carDetails.description}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Corrupti vitae sunt explicabo ipsum magni sit, consequatur
                voluptatum accusantium numquam! Perferendis in porro accusamus
                animi quisquam cupiditate libero, doloribus nam eveniet ratione
                ducimus, autem deserunt aspernatur ipsa aperiam harum iure
                adipisci sit consequatur! Sunt mollitia aliquam possimus eius?
                Doloremque minus quod necessitatibus vero nihil, ipsam quasi
                nulla labore! Delectus natus eaque molestiae vitae? Error
                explicabo, ipsam mollitia quas quod veniam qui?
              </p>
            </article>
            <button>Car Brochure</button>
          </section>

          {/* Features */}
          <section className="features">
            <h2 className="featuresTitle">Features</h2>
            <table className="featuresTable">
              <tr className="">
                <th className="tableHead">Interior</th>
                <th className="tableHead">Safety</th>
                <th className="tableHead">Exterior</th>
                <th className="tableHead">Comfort & Convenience</th>
              </tr>
              <tr>
                <td>Air Conditioner</td>
                <td>Anti-lock Baking</td>
                <td>Fog Lights Front</td>
                <td>Android Auto</td>
              </tr>
              <tr>
                <td>Digital Odometer</td>
                <td>Break Assist</td>
                <td>Rain Sensing Wiper</td>
                <td>Apple Carplay</td>
              </tr>
              <tr>
                <td>Heater</td>
                <td>Child Safety locks</td>
                <td>Rear Spoiler</td>
                <td>Bluetooth</td>
              </tr>
              <tr>
                <td>Leather Seats</td>
                <td>Break Assist</td>
                <td>Rain Sensing Wiper</td>
                <td>Apple Carplay</td>
              </tr>
              <tr>
                <td>Panoramic Moonroof</td>
                <td>Power Door Locks</td>
                <td></td>
                <td>Power Steering</td>
              </tr>
              <tr>
                <td>Tachometer</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </section>

          {/* Dimensions and capacity */}
          <section className="dimensions">
            <h2 className="dimensionsTitle">Dimensions and Capacity</h2>
            <div className="dimensionsTable">
              <table className="firstTable">
                <tr>
                  <th>Length</th>
                  <td>194 inches</td>
                </tr>
                <tr>
                  <th>Height</th>
                  <td>69.92 inches</td>
                </tr>
                <tr>
                  <th>Wheelbase</th>
                  <td>117.48 inches</td>
                </tr>
                <tr>
                  <th>Luggage Capacity</th>
                  <td>850 litres</td>
                </tr>
              </table>
              <table className="secondTable">
                <tr>
                  <th>Width</th>
                  <td>97 inches</td>
                </tr>
                <tr>
                  <th>Weight</th>
                  <td>1550 kg</td>
                </tr>
                <tr>
                  <th>Net weight</th>
                  <td>1200 kg</td>
                </tr>
                <tr>
                  <th>No. of Seats</th>
                  <td>5</td>
                </tr>
              </table>
            </div>

            {/* Engine and Tranmission */}
            <section className="engine">
              <h2 className="engineTitle">Engine & Transmission</h2>
              <div className="engineTable">
                <table className="firstTable">
                  <tr>
                    <th>Fuel Tank Capacity</th>
                    <td>100 litres</td>
                  </tr>
                  <tr>
                    <th>Towing Weight </th>
                    <td>800 kg</td>
                  </tr>
                </table>
                <table className="secondTable">
                  <tr>
                    <th>Minimum Kerbweight</th>
                    <td>350 kg</td>
                  </tr>
                  <tr>
                    <th>Turning Circle</th>
                    <td>4500</td>
                  </tr>
                </table>
              </div>
            </section>
          </section>
          <section className="map">
            <h3>88 - Aston House, Birmingham</h3>
            <button className="mapbtn">Get Direction</button>
            <div>Map</div>
          </section>
        </div>
      </div>
      <section>
        <h2>Related Listings</h2>
      </section>
    </div>
  );
};
export default CarInfoDetails;
