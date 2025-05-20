import React from "react";
import "./CarHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareAlt,
  faHeart,
  faBalanceScale,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

const CarHeader = () => {
  return (
    <section className="car-header">
      <div className="car-header-left">
        <h1 className="car-title">Toyota Camry New</h1>
        <p className="car-subtitle">
          4.0L 6-Cylinder Engine, Automatic, Petrol
        </p>
        <div className="car-features">
          <span>2023</span>
          <span>25,000 Miles</span>
          <span>Automatic</span>
          <span>Petrol</span>
        </div>
      </div>

      <div className="car-header-right">
        <div className="header-actions">
          <button>
            <FontAwesomeIcon icon={faShareAlt} /> Share
          </button>
          <button>
            <FontAwesomeIcon icon={faHeart} /> Save
          </button>
          <button>
            <FontAwesomeIcon icon={faBalanceScale} /> Compare
          </button>
        </div>

        <div className="car-price">
          <h2>£40,000</h2>
        </div>

        <div className="make-offer">
          <h3>
            <FontAwesomeIcon icon={faTag} /> Make an Offer
          </h3>
        </div>
      </div>
    </section>
  );
};

export default CarHeader;
