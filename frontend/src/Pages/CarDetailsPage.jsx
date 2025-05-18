import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import CarHeader from "./CarHeader";
import MediaSection from "./MediaSection";
import CarInfoDetails from "./CarInfoDetails";
import DealerCard from "./DealerCard";
import FinancingCalculator from "./FinancingCalculator";
import ReviewsSection from "./ReviewsSection";
import RelatedListings from "./RelatedListings";
import "./CarDetailsPage.css"; // CSS file for layout/styling

const CarDetailsPage = () => {
  return (
    <div className="car-details-page">
      <Breadcrumbs />
      <CarHeader />
      <MediaSection />

      <div className="main-section">
        <div className="left-column">
          <CarInfoDetails />
        </div>
        <div className="right-column">
          <DealerCard />
        </div>
      </div>

      <FinancingCalculator />
      <ReviewsSection />
      <RelatedListings />
    </div>
  );
};

export default CarDetailsPage;
