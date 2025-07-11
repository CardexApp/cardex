import { useEffect, useState } from "react";
import "./DynamicCategoryPage.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const DynamicCategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://sparkling-chelsae-cardex-cd058300.koyeb.app/api/products?category=${categoryName}`
      )
      .then((res) => setProducts(res.data))
      .catch(() => console.error("Failed to load category products"));
  }, [categoryName]);

  return (
    <div className="categoryPage">
      <h2>{categoryName} Listings</h2>
      <div className="productGrid">
        {products.map((prod) => (
          <div key={prod.id} className="productCard">
            <img src={prod.image} alt={prod.name} />
            <p>{prod.name}</p>
            <p>£{prod.price}</p>
            <Link to={`/car/${prod.id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicCategoryPage;
