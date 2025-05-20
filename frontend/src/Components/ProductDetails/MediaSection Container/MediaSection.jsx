import React from "react";
import "./MediaSection.css";

const MediaSection = () => {
  return (
    <section className="media-section">
      <div className="media-left">
        <img src="/images/main-car.jpg" alt="Main Car" className="main-media" />
      </div>
      <div className="media-right">
        <div className="thumbnail-grid">
          <img src="/images/thumb1.jpg" alt="Car view 1" />
          <img src="/images/thumb2.jpg" alt="Car view 2" />
          <img src="/images/thumb3.jpg" alt="Car view 3" />
          <img src="/images/thumb4.jpg" alt="Car view 4" />
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
