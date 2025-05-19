import asset from "../../assets/asset";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navBar.css";
import {
  faHome,
  faBars,
  faUser,
  faBox,
  faSignOutAlt,
  faCar,
  faInfoCircle,
  faEnvelope,
  faUserCircle,
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <div className="navBar">
      <div className="brand">
        <img className="logo" src={asset.LOGO} alt="CARDEX logo" />
        <h2 className="logoTitle">CARDEX</h2>
      </div>
      <ul className="menuList">
        <NavLink to="/" className="navLink">
          <p>
            <FontAwesomeIcon icon={faHome} /> HOME
          </p>
          <hr className="hrTag" />
        </NavLink>
        <NavLink to="/listings" className="navLink">
          <p>
            <FontAwesomeIcon icon={faCar} />
            LISTINGS
          </p>
          <hr className="hrTag" />
        </NavLink>
        <NavLink to="/about" className="navLink">
          <p>
            <FontAwesomeIcon icon={faInfoCircle} />
            ABOUT
          </p>
          <hr className="hrTag" />
        </NavLink>
        <NavLink to="/contact" className="navLink">
          <p>
            <FontAwesomeIcon icon={faEnvelope} />
            CONTACT
          </p>
          <hr className="hrTag" />
        </NavLink>
      </ul>
      <div className="userStatus">
        <div className="searchWrapper">
          <input className="searchInput" type="search" placeholder="Enter car name" />
          <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} size="lg" />
        </div>
        <div className="dropdown">
          <FontAwesomeIcon icon={faUserCircle} size="lg" />
          <div className="dropdownContent">
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} /> My Profile
            </Link>
            <Link to="/orders">
              <FontAwesomeIcon icon={faBox} /> Orders
            </Link>
            <Link to="/logout">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <FontAwesomeIcon icon={faCartShopping} size="lg" />
          <p className="cartContent">10</p>
        </Link>
        <FontAwesomeIcon className="navBarMobileMenu" icon={faBars} size="lg" />
      </div>
    </div>
  );
};
export default NavBar;
