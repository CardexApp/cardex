import "./Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Config";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [mostRecentCar, setMostRecentCar] = useState(null);
  const [randomCar, setRandomCar] = useState(null);
  const navigate = useNavigate();

  const handleButton = () => {
    const userIsLoggedIn = localStorage.getItem("accessToken") !== null;
    navigate(userIsLoggedIn ? "/listings" : "/login");
  };

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

          // Prevent same car as most recent
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

  return (
    <div className="general">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="vertical-text">Shop Cardex</div>
        <div className="hero-content">
          <h1>Perfect Place To Buy And Sell Car</h1>
          <div className="hero-buttons">
            <button onClick={handleButton} className="explore-btn">
              Explore Car
            </button>
            <button onClick={handleButton} className="buy-btn">
              Buy Car
            </button>
          </div>
          <p>We Are In Social Media:</p>
          <div className="social-icons">{/* Social icons here */}</div>
        </div>
        <div className="hero-image">{/* Hero image */}</div>
      </section>

      {/* CATEGORIES SECTION: Most Recent & Random Car */}
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

      {/* FEATURED STATIC CAR */}
      <section className="featured-car">
        <div className="featuredImage"></div>
        <div className="featuredDetails">
          <h4>Porsche-2025</h4>
          <h2>Feel The Power of Porsche</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
            unde, quae recusandae ipsam reiciendis molestiae.
          </p>
          <button className="read-more">Read More</button>
        </div>
      </section>

      {/* POPULAR CARS PLACEHOLDER */}
      <section className="popular-cars">
        <h3>Shop Favourite Cars</h3>
        <h2>Shop Popular New Car</h2>
      </section>

      {/* HIGHLIGHTS PLACEHOLDER */}
      <section className="grid">
        <div className="trending">
          <div className="trendingImage"></div>
          <div className="trendingDetails">
            <h4>Porsche-2025</h4>
            <h2>Feel The Power of Porsche</h2>
            <p>Sample promo text goes here.</p>
            <button className="read-more">Read More</button>
          </div>
        </div>
        <div className="trending">
          <div className="trendingDetails red">
            <h4>Porsche-2025</h4>
            <h2>Feel The Power of Porsche</h2>
            <p>Sample promo text goes here.</p>
            <button className="read-more red">Read More</button>
          </div>
          <div className="trendingImage"></div>
        </div>
      </section>

      {/* MODEL GRID */}
      <section className="model">
        {cars.map((cardex) => (
          <div key={cardex.id} className="modelHeading">
            <h2>{`${cardex.make.name} ${cardex.name} ${cardex.model_year}`}</h2>
            <button>View All</button>
          </div>
        ))}
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

      {/* FAQ */}
      <section className="faq">
        <h2>FAQs</h2>
        {/* FAQ content here */}
      </section>
    </div>
  );
};

export default Home;
