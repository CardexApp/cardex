import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faGasPump,
  faGear,
  faBookmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./Products.css";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
  // use state for product display
  const [products, setProducts] = useState([]);
  // use state for search/ filter
  const [search, setSearch] = useState("");
  // use state for Brand filtering
  const [selectedMake, setSelectedMake] = useState("");
  // use state for Car type filtering
  const [selectedCarType, setSelectedCarType] = useState("");
  // use state for Model filtering
  const [selectedModelYear, setSelectedModelYear] = useState("");
  // use state for Price filtering
  const [selectedPrice, setSelectedPrice] = useState(100000); // Max price limit
  const [selectedCondition, setSelectedCondition] = useState(""); // "New" or "Used"
  const [selectedTransmission, setSelectedTransmission] = useState("");

  // use context for product cart
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://cardexbackend.eu.pythonanywhere.com/api/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Filter products logic
  const filteredProducts = products.filter((car) => {
    const term = search.toLowerCase();

    const matchesSearch =
      car.make?.name.toLowerCase().includes(term) ||
      car.name?.toLowerCase().includes(term) ||
      car.model_year?.toLowerCase().includes(term) ||
      car.fuel_type?.toLowerCase().includes(term) ||
      car.car_type?.name?.toLowerCase().includes(term) ||
      car.transmission?.toLowerCase().includes(term) ||
      car.brand?.toLowerCase().includes(term) ||
      car.model?.toLowerCase().includes(term);

    const matchesFilters =
      (!selectedMake || car.make?.name === selectedMake) &&
      (!selectedCarType || car.car_type?.name === selectedCarType) &&
      (!selectedModelYear || car.model_year === selectedModelYear) &&
      (!selectedCondition || car.condition === selectedCondition) &&
      (!selectedTransmission || car.transmission === selectedTransmission) &&
      (!selectedPrice || Number(car.price) <= selectedPrice);

    return matchesSearch && matchesFilters;
  });

  return (
    <div>
      {/* Search Bar */}
      <div className="searchProductContainer">
        <input
          type="text"
          placeholder="Search by brand, model, fuel type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="searchProductInput"
        />
      </div>

      <div className="filters">
        <select onChange={(e) => setSelectedMake(e.target.value)}>
          <option value="">All Brands</option>
          <option value="Toyota">Toyota</option>
          <option value="Range Rover">Range Rover</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Lexus">Lexus</option>
          <option value="Tesla">Tesla</option>
        </select>

        <select onChange={(e) => setSelectedCarType(e.target.value)}>
          <option value="">All Types</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Coupe">Coupe</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Convertible">Convertible</option>
        </select>

        <select onChange={(e) => setSelectedModelYear(e.target.value)}>
          <option value="">All Years</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>

        <select onChange={(e) => setSelectedTransmission(e.target.value)}>
          <option value="">All Transmission</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>

        <select onChange={(e) => setSelectedCondition(e.target.value)}>
          <option value="">All Conditions</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>

        <input
          type="range"
          min="0"
          max="100000"
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(Number(e.target.value))}
        />
        <span>Max price: £{selectedPrice.toLocaleString()}</span>
      </div>

      <div className="productGrid">
        {filteredProducts.map((cardex) => (
          <div key={cardex.id} className="productCard">
            {/* Top Image */}
            <div className="productImageContainer">
              <img
                src={cardex.image}
                alt={cardex.name}
                className="productImage"
              />
              <div className="badge">Great Price</div>
              <div
                className="bookmark"
                onClick={() => {
                  console.log("Bookmarked - ID:", cardex.id);
                  addToCart(cardex);
                  navigate("/cart");
                }}
              >
                <FontAwesomeIcon className="bookmarkIcon" icon={faBookmark} />
              </div>
            </div>

            {/* Lower Content */}
            <div className="productContent">
              <div className="productHeader">
                {/* For large data with unique entries of brand, name and model */}

                {/* <p className="productTitle">{`${cardex.make.name} ${cardex.name} ${cardex.model_year}`}</p> */}

                <p className="productTitle"> {cardex.name}</p>

                <p className="productDescription">{cardex.description}</p>
              </div>
              <hr />
              <div className="productSpecs">
                <div className="specItem">
                  <FontAwesomeIcon icon={faGauge} />
                  <span>{cardex.mileage} Miles</span>
                </div>
                <div className="specItem">
                  <FontAwesomeIcon icon={faGasPump} />
                  <span>{cardex.fuel_type}</span>
                </div>
                <div className="specItem">
                  <FontAwesomeIcon icon={faGear} />
                  <span>{cardex.car_type.name}</span>
                </div>
              </div>
              <hr />
              <div className="productFooter">
                <span className="price">£{cardex.price.toLocaleString()}</span>
                <Link to={`/car/${cardex.id}`} className="viewButton">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
