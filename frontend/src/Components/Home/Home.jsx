import "./Home.css";

const Home = () => {
  return (
    <div>
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

      {/* <!-- BRAND LOGOS --> */}
      <section className="brands">{/* <!-- Add brand logos --> */}</section>

      {/* <!-- POPULAR CARS --> */}
      <section className="popular-cars">
        <h3>Shop Favourite cars</h3>
        <h2>Shop Popular New Car</h2>
        {/* <!-- Filter buttons -->
    <!-- Car cards grid --> */}
      </section>

      {/* <!-- HIGHLIGHTED CARS --> */}
      <section className="highlighted-cars">
        <div className="highlight-card jeep">
          <h3>Jeep Wrengle</h3>
          <p>Lorem ipsum dolor sit amet consectetur...</p>
          <button>Read More</button>
        </div>
        <div className="highlight-card nissan">
          <h3>Nissan RT 20</h3>
          <p>Lorem ipsum dolor sit amet consectetur...</p>
          <button>Read More</button>
        </div>
      </section>

      {/* <!-- RETURN SPECIAL --> */}
      <section className="return-special">
        <h2>Our Return Special For You</h2>
        {/* <!-- Return car cards --> */}
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
