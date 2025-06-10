// About.jsx
import "./About.css";

const About = () => {
  return (
    <section className="about-section">
        {/* About Page */}
      <div className="about-header">
        <p className="promo-text">
          Summer Sale For All Cars And Free Express Delivery - OFF 10%!{" "}
          <a href="#" className="shop-now">
            Shop Now
          </a>
        </p>
      </div>

      {/* Our Story */}
      <div className="about-content">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Team of highly inspired students of Aston University saw the need to
            create a stable platform for sales of cars.
          </p>
          <p>
            CarDex exclusively has more than 1 million products to offer,
            growing very fast. Exclusive offers a diverse assortment in
            categories ranging from consumer goods to many others.
          </p>

          {/* Features */}
          <div className="about-features">
            <div className="feature-box">
              <h3>FREE AND FAST DELIVERY</h3>
              <p>Free delivery for all orders over $140</p>
            </div>
            <div className="feature-box">
              <h3>24/7 CUSTOMER SERVICE</h3>
              <p>Friendly 24/7 customer support</p>
            </div>
            <div className="feature-box">
              <h3>MONEY BACK GUARANTEE</h3>
              <p>We return money within 30 days</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="about-stats">
          <div className="stat-box">
            <h2>10.5k</h2>
            <p>Sellers active on our site</p>
          </div>
          <div className="stat-box">
            <h2>33k</h2>
            <p>Monthly Product Sales</p>
          </div>
          <div className="stat-box">
            <h2>45.5k</h2>
            <p>Customers active on our site</p>
          </div>
          <div className="stat-box">
            <h2>25k</h2>
            <p>Annual gross sale on our site</p>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="about-team">
        <div className="team-member">
          <img src="https://via.placeholder.com/150" alt="Mordi Chukwubuokem" />
          <h4>Mordi Chukwubuokem Ogochukwu</h4>
          <p>UI/UX Designer and Frontend Developer</p>
        </div>
        <div className="team-member">
          <img
            src="https://via.placeholder.com/150"
            alt="Mariya Siby Kolandaisamy Leo Prabakaran"
          />
          <h4>Mariya Siby Kolandaisamy Leo Prabakaran</h4>
          <p>Senior Frontend Developer</p>
        </div>
        <div className="team-member">
          <img src="https://via.placeholder.com/150" alt="Prince Osei" />
          <h4>Prince Osei</h4>
          <p>Product Designer and Frontend Developer</p>
        </div>
        <div className="team-member">
          <img
            src="https://via.placeholder.com/150"
            alt="Obianuju Rosemary Ofodu"
          />
          <h4>Obianuju Rosemary Ofodu</h4>
          <p>Backend Developer and Database Architect</p>
        </div>
        <div className="team-member">
          <img src="https://via.placeholder.com/150" alt="Faisal Sherif" />
          <h4>Faisal Sherif</h4>
          <p>Backend Developer and Database Analyst</p>
        </div>
        <div className="team-member">
          <img src="https://via.placeholder.com/150" alt="Prince Osei" />
          <h4>Prince Osei</h4>
          <p>Backend Developer and CyberSecurity.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
