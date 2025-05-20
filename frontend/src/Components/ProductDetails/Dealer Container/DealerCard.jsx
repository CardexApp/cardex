import React from "react";
import "./DealerCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faStore,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import dealerAvatar from "../../assets/dealer-avatar.jpg"; // Replace with your actual image

const DealerCard = () => {
  return (
    <div className="dealer-card">
      <div className="dealer-info">
        <img src={dealerAvatar} alt="Dealer Avatar" className="dealer-avatar" />
        <h4>City Autos</h4>
        <p>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> Aberdeen, Scotland
        </p>
        <p>
          <FontAwesomeIcon icon={faPhone} /> +44 7123 456789
        </p>
      </div>

      <div className="dealer-actions">
        <button className="btn primary">
          <FontAwesomeIcon icon={faEnvelope} /> Message Dealer
        </button>
        <button className="btn whatsapp">
          <FontAwesomeIcon icon={faComments} /> Chat via WhatsApp
        </button>
        <button className="btn outline">
          <FontAwesomeIcon icon={faStore} /> View All Stock
        </button>
      </div>
    </div>
  );
};

export default DealerCard;
