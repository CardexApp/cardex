import "./Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          "https://cardexbackend.eu.pythonanywhere.com/api/products/"
        );
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars");
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="general">
      {/* <!-- HERO SECTION --> */}
      <section className="hero">
        <div className="vertical-text">Shop Cardex</div>
        <div className="hero-content">
          <h1>Perfect Place To Buy And Sell Car</h1>
          <div class="hero-buttons">
            <button className="explore-btn">Explore Car</button>
            <button className="buy-btn">Buy Car</button>
          </div>
          <p>We Are In Social Media:</p>
          <div className="social-icons">
            {/* <!-- Insert social icons here --> */}
          </div>
        </div>
        <div className="hero-image">
          {/* <img
            src="https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Car"
          /> */}
        </div>
      </section>
      {/* <!-- CATEGORIES SECTION --> */}
      <section className="categories">
        <div className="leftColumn">
          <div className="leftCard">
            <h3>Top Buy And Easy Payment</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              sunt.
            </p>
            <button className="categoryBtn">Buy Car</button>
          </div>
          <div className="leftImage"></div>
        </div>
        <div className="rightColumn">
          <div className="rightCard">
            <h3>Top Buy And Easy Payment</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              sunt.
            </p>
            <button className="categoryBtn">Buy Car</button>
          </div>
          <div className="rightImage"></div>
        </div>
      </section>
      {/* <!-- FEATURED CAR --> */}
      <section className="featured-car">
        <div className="featuredImage"></div>
        <div className="featuredDetails">
          <h4>Porsche-2025</h4>
          <h2>Feel The Power of Porsche</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
            unde, quae recusandae ipsam reiciendis molestiae. Ratione dolorum
            ipsum, magnam, tempore debitis dicta soluta consectetur optio
            delectus velit, sequi adipisci voluptatibus!
          </p>
          <button className="read-more">Read More</button>
        </div>
      </section>

      {/* Dynamic view */}
      <section>
        <Link to={`/category/SUV`}>SUVs</Link>
        <Link to={`/category/Sedan`}>Sedans</Link>
      </section>

      {/* <!-- BRAND LOGOS --> */}
      <section className="brands">{/* <!-- Add brand logos --> */}</section>
      {/* <!-- POPULAR CARS --> */}
      <section className="popular-cars">
        <h3>Shop Favourite cars</h3>
        <h2>Shop Popular New Car</h2>
        {/* <!-- Filter buttons -->
    <!-- Car cards grid --> */}
      </section>
      {/* <!-- HIGHLIGHTS --> */}
      <section className="grid">
        <div className="trending">
          <div className="trendingImage"></div>
          <div className="trendingDetails">
            <h4>Porsche-2025</h4>
            <h2>Feel The Power of Porsche</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
              unde, quae recusandae ipsam reiciendis molestiae. Ratione dolorum
              ipsum, magnam, tempore debitis dicta soluta consectetur optio
              delectus velit, sequi adipisci voluptatibus!
            </p>
            <button className="read-more">Read More</button>
          </div>
        </div>
        <div className="trending">
          <div className="trendingDetails red">
            <h4>Porsche-2025</h4>
            <h2>Feel The Power of Porsche</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
              unde, quae recusandae ipsam reiciendis molestiae. Ratione dolorum
              ipsum, magnam, tempore debitis dicta soluta consectetur optio
              delectus velit, sequi adipisci voluptatibus!
            </p>
            <button className="read-more red">Read More</button>
          </div>
          <div className="trendingImage"></div>
        </div>
      </section>
      <section className="model">
        {cars.map((cardex) => (
          <div className="modelHeading">
            <h2>{`${cardex.make.name} ${cardex.name} ${cardex.model_year}`}</h2>
            <h2>Hello</h2>
            <button>View All</button>
          </div>
        ))}
      </section>
      {/* <!-- RETURN SPECIAL --> */}
      <section className="return-special">
        <div>
          <h2>Our Return Special For You</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            rerum libero alias, reprehenderit nihil quibusdam
          </p>
        </div>
        <div className="col1">
          <img
            src="https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
          <h2>Lexus RX350</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            explicabo cumque voluptatem?
          </p>
        </div>
        <div className="col2">
          <img
            src="https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
          <h2>Lexus RX450</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            explicabo cumque voluptatem?
          </p>
        </div>
        <div className="col3">
          <img
            src="https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
          <h2>Lexus RX300</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            explicabo cumque voluptatem?
          </p>
        </div>
      </section>
      {/* <!-- FAQ --> */}
      <section className="faq">
        <h2>FAQs</h2>
        {/* <!-- FAQ content --> */}
      </section>
      {/* <!-- Insert social icons --> */}
    </div>
  );
};
export default Home;
