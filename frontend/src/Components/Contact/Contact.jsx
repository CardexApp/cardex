// Contact.jsx
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-header">
        <p className="promo-text">
          Summer Sale For All Cars And Free Express Delivery - OFF 10%!{" "}
          <a href="#" className="shop-now">
            Shop Now
          </a>
        </p>
      </div>

      <div className="breadcrumb">
        Home / <span className="current">Contact</span>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-box">
            <div className="info-icon">📞</div>
            <h3>Call To Us</h3>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +073****5301</p>
          </div>

          <hr />

          <div className="info-box">
            <div className="info-icon">✉️</div>
            <h3>Write To Us</h3>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Emails: customer@cardex.com</p>
            <p>Emails: support@cardex.com</p>
          </div>
        </div>

        <div className="contact-form">
          <form>
            <div className="form-row">
              <input type="text" placeholder="Your Name *" required />
              <input type="email" placeholder="Your Email *" required />
              <input type="tel" placeholder="Your Phone *" required />
            </div>
            <textarea placeholder="Your Message" rows="6" required></textarea>
            <button type="submit" className="send-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
