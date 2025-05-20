import React from "react";
import "./RelatedListings.css";

const relatedCars = [
  {
    id: 1,
    image: "/images/car1.jpg",
    name: "Honda Accord 2022",
    price: "£28,500",
  },
  {
    id: 2,
    image: "/images/car2.jpg",
    name: "Nissan Altima 2021",
    price: "£25,300",
  },
  {
    id: 3,
    image: "/images/car3.jpg",
    name: "Mazda 6 2022",
    price: "£27,000",
  },
];

const RelatedListings = () => {
  return (
    <section className="related-listings">
      <h3>Related Listings</h3>
      <div className="related-cars-grid">
        {relatedCars.map((car) => (
          <div key={car.id} className="car-card">
            <img src={car.image} alt={car.name} />
            <h4>{car.name}</h4>
            <p>{car.price}</p>
            <button className="btn-view">View More</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedListings;
