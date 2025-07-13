import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Config";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faGasPump,
  faGear,
  faCartPlus,
  faArrowTrendUp,
  // faMagnifyingGlass,
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
  const [selectedPrice, setSelectedPrice] = useState(100000);
  // use state for Condition filtering
  const [selectedCondition, setSelectedCondition] = useState("");
  // use state for Transmission filtering
  const [selectedTransmission, setSelectedTransmission] = useState("");

  // use context for product cart
  const { addToCart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login");
    }

    axios
      .get(`${BASE_URL}/products`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setProducts(res.data);
      })

      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Failed to load products. Please log in again");
      });
  }, []);

  useEffect(() => {
    if (location.hash && products.length > 0) {
      const targetId = location.hash.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("highlightCar");

        // Timeout to remove highlight
        setTimeout(() => {
          element.classList.remove("highlightCar");
        }, 3000);
      }
    }
  }, [location, products]);

  // Filter products logic
  const filteredProducts = products.filter((car) => {
    const term = search.toLowerCase();

    const filterSearch =
      car.make.name?.toLowerCase().includes(term) ||
      car.name?.toLowerCase().includes(term) ||
      car.model_year?.toLowerCase().includes(term) ||
      car.fuel_type?.toLowerCase().includes(term) ||
      car.car_type.name?.toLowerCase().includes(term) ||
      car.transmission?.toLowerCase().includes(term) ||
      car.brand?.toLowerCase().includes(term) ||
      car.model?.toLowerCase().includes(term);

    const filteredResult =
      (!selectedMake || car.make?.name === selectedMake) &&
      (!selectedCarType || car.car_type?.name === selectedCarType) &&
      (!selectedModelYear || car.model_year === selectedModelYear) &&
      (!selectedCondition || car.condition === selectedCondition) &&
      (!selectedTransmission || car.transmission === selectedTransmission) &&
      (!selectedPrice || Number(car.price) <= selectedPrice);

    return filterSearch && filteredResult;
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
          <option value="Mercedes Benz">Mercedes</option>
          <option value="Lexus">Lexus</option>
          <option value="Tesla">Tesla</option>
        </select>

        <select onChange={(e) => setSelectedCarType(e.target.value)}>
          <option value="">All Types</option>
          <option value="SUV">SUV</option>
          <option value="sedan">Sedan</option>
          <option value="coupe">Coupe</option>
          <option value="hatchback">Hatchback</option>
          <option value="convertible">Convertible</option>
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
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>

        <select onChange={(e) => setSelectedCondition(e.target.value)}>
          <option value="">All Conditions</option>
          <option value="new">New</option>
          <option value="used">Used</option>
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
        {filteredProducts.length === 0 && (
          <div>
            <p>No matching products found</p>
          </div>
        )}
        {filteredProducts.map((cardex) => (
          <div key={cardex.id} id={`car-${cardex.id}`} className="productCard">
            {/* Top Image */}
            <div
              className="productImageContainer backgroundCard"
              style={{
                backgroundImage: `url(${
                  cardex.image?.trim() ? cardex.image : "/LOGO.svg"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "180px",
                width: "100%",
                borderRadius: "8px",
              }}
            >
              {cardex.deal_tag?.trim() && (
                <div className="badge">
                  {cardex.deal_tag.length > 13
                    ? `${cardex.deal_tag.substring(0, 13)}...`
                    : cardex.deal_tag}
                </div>
              )}
              <div
                className="addToCartBtn"
                onClick={() => {
                  addToCart(cardex);
                  toast.success("Added to cart");
                }}
              >
                <FontAwesomeIcon className="cartIcon" icon={faCartPlus} />
              </div>
            </div>

            {/* Lower Content */}
            <div className="productContent">
              <div className="productHeader">
                {/* For large data with unique entries of brand, name and model */}

                <p className="productTitle">{`${cardex.make.name} ${cardex.name} ${cardex.model_year}`}</p>

                {/* <p className="productTitle"> {cardex.name}</p> */}

                <p className="productDescription">
                  {cardex.description.length > 56
                    ? `${cardex.description.substring(0, 56)}...`
                    : cardex.description}
                </p>
              </div>
              <hr className="lineBreak" />
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
              <hr className="lineBreak" />
              <div className="productFooter">
                <span className="price">£{cardex.price.toLocaleString()}</span>
                <Link to={`/car/${cardex.id}`} className="viewButton">
                  View Details{" "}
                  <FontAwesomeIcon icon={faArrowTrendUp} className="arrowIcon" />
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
