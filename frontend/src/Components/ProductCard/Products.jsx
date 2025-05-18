// import { data } from "../../assets/Data/Data";
// import { useState, useEffect } from "react";

// const Products = () => {
//   const [product, setProduct] = useState([]);
//   useEffect(() => {
//     setProduct(data);
//   }, []);

//   return (
//     <div>
//       {product.map((cardex) => (
//         <div key={cardex.id}>
//           <img src={cardex.image} alt={cardex.name} />
//           <p>{cardex.name}</p>
//           <p>{cardex.price}</p>
//           <p>{cardex.description}</p>
//           <p>{cardex.mileage}</p>
//           <p>{cardex.brand}</p>
//           <p>{cardex.model}</p>
//           <p>{cardex.fuelType}</p>
//           <p>{cardex.carType}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Products;

import { Link } from "react-router-dom";
import { data } from "../../assets/Data/Data";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faGasPump,
  faGear,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import "./Products.css";

const Products = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    setProduct(data);
  }, []);

  return (
    <div className="productGrid">
      {product.map((cardex) => (
        <div key={cardex.id} className="productCard">
          {/* Top Image */}
          <div className="productImageContainer">
            <img
              src={cardex.image}
              alt={cardex.name}
              className="productImage"
            />
            <div className="badge">Great Price</div>
            <div className="bookmark">
              <FontAwesomeIcon icon={faBookmark} />
            </div>
          </div>

          {/* Lower Content */}
          <div className="productContent">
            {/* Row 1 */}
            <div className="productHeader">
              <p className="productTitle">{`${cardex.brand} ${cardex.name} ${cardex.model}`}</p>
              <p className="productDescription">{cardex.description}</p>
            </div>
            <hr />

            {/* Row 2 */}
            <div className="productSpecs">
              <div className="specItem">
                <FontAwesomeIcon icon={faGauge} />
                <span>{cardex.mileage} Miles</span>
              </div>
              <div className="specItem">
                <FontAwesomeIcon icon={faGasPump} />
                <span>{cardex.fuelType}</span>
              </div>
              <div className="specItem">
                <FontAwesomeIcon icon={faGear} />
                <span>{cardex.carType}</span>
              </div>
            </div>
            <hr />

            {/* Row 3 */}
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
  );
};

export default Products;
