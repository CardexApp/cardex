import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">
        {/* Left - Logo and Address */}
        <div className="footerColumn contactColumn">
          <h2 className="footerLogo">CarDex</h2>
          <p className="footerText">
            Our vision is to provide convenience and help increase your sales
            business.
          </p>
          <p className="footerAddress">
            Aston University, Birmingham, West Midlands, United Kingdom
          </p>
          <p className="footerPhone">+44 7777 xxx301</p>
          <div className="footerSocials">
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* About */}
        <div className="footerColumn">
          <h3>About</h3>
          <ul>
            <li>
              <a className="about" href="#">How it works</a>
            </li>
            <li>
              <a className="about" href="#">Featured</a>
            </li>
            <li>
              <a className="about" href="#">Partnership</a>
            </li>
            <li>
              <a className="about" href="#">Business Relation</a>
            </li>
          </ul>
        </div>

        {/* Community */}
        <div className="footerColumn">
          <h3>Community</h3>
          <ul>
            <li>
              <a className="community" href="#">Events</a>
            </li>
            <li>
              <a className="community" href="#">Blog</a>
            </li>
            <li>
              <a className="community" href="#">Podcast</a>
            </li>
            <li>
              <a className="community" href="#">Invite a friend</a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div className="footerColumn">
          <h3>Socials</h3>
          <ul>
            <li>
              <a className="socials" href="#">Discord</a>
            </li>
            <li>
              <a className="socials" href="#">Instagram</a>
            </li>
            <li>
              <a className="socials" href="#">Twitter</a>
            </li>
            <li>
              <a className="socials" href="#">Facebook</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footerBottom">
        <p>&copy; CarDex. All rights reserved</p>
        <div className="footerLinks">
          <a href="#">Privacy & Policy</a>
          <a href="#">Terms & Condition</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
