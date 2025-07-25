import "./Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Config";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [mostRecentCar, setMostRecentCar] = useState(null);
  const [randomCar, setRandomCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        const carList = response.data;
        setCars(carList);

        if (carList.length > 0) {
          setMostRecentCar(carList[0]);

          const randomIndex = Math.floor(Math.random() * carList.length);
          let pickedRandom = carList[randomIndex];

          if (pickedRandom.id === carList[0].id && carList.length > 1) {
            const altIndex = (randomIndex + 1) % carList.length;
            pickedRandom = carList[altIndex];
          }

          setRandomCar(pickedRandom);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const RangeRoverCars = cars
    .filter((car) => car.make.name?.toLowerCase() === "range rover")
    .slice(0, 5);

  const lexusCars = cars
    .filter((car) => car.make.name?.toLowerCase() === "lexus")
    .slice(0, 5);

  const handleView = (id) => {
    navigate(`/listings#car-${id}`);
  };

  const getImage = (url) => {
    return url?.trim() ? url : "/LOGO.svg";
  };

  const handleExploreCar = () => {
  const element = document.getElementById("exploreCar");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};


  return (
    <div className="general">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="vertical-text">Shop Cardex</div>
        <div className="hero-content">
          <h1>Perfect Place To Buy And Sell Car</h1>
          <div className="hero-buttons">
            <button className="explore-btn" onClick={handleExploreCar}>Explore Car</button>
            <button className="buy-btn" onClick={()=>navigate('/listings')}>Buy Car</button>
          </div>
          <p>We Are In Social Media:</p>
          <div className="social-icons">{/* Social icons here */}</div>
        </div>
        <div className="hero-image">{/* Hero image */}</div>
      </section>

      {/* CATEGORIES SECTION */}
      {mostRecentCar && randomCar && (
        <section className="categories">
          <div className="leftColumn">
            <div className="leftCard">
              <h3>
                {mostRecentCar.make.name} - {mostRecentCar.model_year}
              </h3>
              <p>{mostRecentCar.description}</p>
              <button
                onClick={() => navigate(`/listings#car-${mostRecentCar.id}`)}
                className="categoryBtn"
              >
                Buy Car
              </button>
            </div>
            <div className="leftImage"></div>
          </div>
          <div className="rightColumn">
            <div className="rightCard">
              <h3>
                {randomCar.make.name} - {randomCar.model_year}
              </h3>
              <p>{randomCar.description}</p>
              <button
                onClick={() => navigate(`/listings#car-${randomCar.id}`)}
                className="categoryBtn"
              >
                Buy Car
              </button>
            </div>
            <div className="rightImage"></div>
          </div>
        </section>
      )}

      {/* POPULAR CARS */}
      <section className="model">
        <div className="homeContainer">
          <h1 className="homeTitle" id="exploreCar">Explore Featured Categories</h1>
          <section className="brandGrid">
            <div className="brandColumn">
              <h2 className="brandTitle">Range Rover</h2>
              <div className="cardGrid">
                {RangeRoverCars.map((car) => (
                  <div key={car.id} className="modelCard">
                    <div
                      className="carImageContainer"
                      style={{ backgroundImage: `url(${getImage(car.image)})` }}
                    />
                    <div className="cardBody">
                      <div className="cardHeader">
                        <h3>{`${car.make.name} ${car.name}`}</h3>
                        <span className="modelYear">{car.model_year}</span>
                      </div>
                      <div className="cardSpecs">
                        <span>👥 4 People</span>
                        <span>🔋 {car.fuel_type}</span>
                        <span>🛣 6.1km / 1-Litre</span>
                        <span>⚙️ {car.transmission}</span>
                      </div>
                      <div className="cardFooter">
                        <span className="price">£{car.price}/month</span>
                        <button className="rentBtn" onClick={() => handleView(car.id)}>
                          View now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="brandColumn">
              <h2 className="brandTitle">Lexus</h2>
              <div className="cardGrid">
                {lexusCars.map((car) => (
                  <div key={car.id} className="modelCard">
                    <div
                      className="carImageContainer"
                      style={{ backgroundImage: `url(${getImage(car.image)})` }}
                    />
                    <div className="cardBody">
                      <div className="cardHeader">
                        <h3>{`${car.make.name} ${car.name}`}</h3>
                        <span className="modelYear">{car.model_year}</span>
                      </div>
                      <div className="cardSpecs">
                        <span>👥 4 People</span>
                        <span>🔋 {car.fuel_type}</span>
                        <span>🛣 6.1km / 1-Litre</span>
                        <span>⚙️ {car.transmission}</span>
                      </div>
                      <div className="cardFooter">
                        <span className="price">£{car.price}/month</span>
                        <button className="rentBtn" onClick={() => handleView(car.id)}>
                          View Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* RETURN SPECIAL */}
      <section className="return-special">
        <div>
          <h2>Our Return Special For You</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            rerum libero alias, reprehenderit nihil quibusdam.
          </p>
        </div>
        <div className="col1">
          <img
            src="https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
          <h2>Lexus RX350</h2>
          <p>Great family car with luxury features.</p>
        </div>
        <div className="col2">
          <img
            src="https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
          <h2>Lexus RX450</h2>
          <p>Comfort and performance combined.</p>
        </div>
        <div className="col3">
          <img
            src="https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
          <h2>Lexus RX300</h2>
          <p>Reliable and stylish daily driver.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
