import "./Contact.css";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Config";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/contact/`, formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("There was an error sending your message.");
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-header">
        <p className="promo-text">
          Summer Sale For All Cars And Free Express Delivery - OFF 10%!
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
            <p>
              Call us via{" "}
              <a href="tel:+4473****5301" className="phone-link">
                +44 73****5301
              </a>
            </p>
          </div>

          <hr />

          <div className="info-box">
            <div className="info-icon">✉️</div>
            <h3>Write To Us</h3>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>
              Email us @{" "}
              <a href="mailto:cardexbackend@gmail.com" className="emailLink">
                customer@cardex.com
              </a>
            </p>
          </div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone *"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="Your Message *"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
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
