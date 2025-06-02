import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
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
    return (
      car.brand?.toLowerCase().includes(term) ||
      "" ||
      car.name?.toLowerCase().includes(term) ||
      "" ||
      car.model?.toLowerCase().includes(term) ||
      "" ||
      car.fuel_type?.toLowerCase().includes(term) ||
      "" ||
      car.car_type?.name?.toLowerCase().includes(term) ||
      ""
    );
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
                  toast.success("Product added to cart")
                  // navigate("/cart");
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
