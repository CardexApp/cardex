import asset from "../../assets/asset";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navBar.css";
import {
  // faHome,
  // faBars,
  faUser,
  faBox,
  faSignOutAlt,
  // faCar,
  // faInfoCircle,
  // faEnvelope,
  faUserCircle,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const navigate = useNavigate();
  const logoutSubmit = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const {user} = useAuth(); 

  return (
    <div className="navBar">
      <div className="brand">
        <img className="logo" src={asset.LOGO} alt="CARDEX logo" />
        <h2 className="logoTitle">CARDEX</h2>
      </div>
      <ul className="menuList">
        <NavLink to="/" className="navLink">
          <p>HOME</p>
          <hr className="hrTag" />
        </NavLink>
        <NavLink to="/listings" className="navLink">
          <p>LISTINGS</p>
          <hr className="hrTag" />
        </NavLink>
        <NavLink to="/about" className="navLink">
          <p>ABOUT</p>
          <hr className="hrTag" />
        </NavLink>
        <NavLink to="/contact" className="navLink">
          <p>CONTACT</p>
          <hr className="hrTag" />
        </NavLink>
        {user?.is_staff || user?.is_superuser ?(
        <NavLink to="/admin" className="navLink">
          <p>Admin</p>
          <hr className="hrTag" />
        </NavLink>) : null}



        {/* <NavLink to="/login" className="navLink">
          <p>Login</p>
        </NavLink> */}
      </ul>
      <div className="userStatus">
        <div className="dropdown">
  <FontAwesomeIcon icon={faUserCircle} size="lg" />
  <div className="dropdownContent">
    {!user ? (
      <>
        <Link to="/login">
          <FontAwesomeIcon icon={faUser} /> Login
        </Link>
        <Link to="/register">
          <FontAwesomeIcon icon={faUser} /> Register
        </Link>
      </>
    ) : (
      <>
        <p style={{ margin: "0.5rem 0", fontWeight: "bold" }}>
          👋 {user.username}
        </p>
        <Link to="/user/profile">
  <FontAwesomeIcon icon={faUser} /> Profile
</Link>

        <Link to="/orders">
          <FontAwesomeIcon icon={faBox} /> Orders
        </Link>
        <button onClick={logoutSubmit}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </>
    )}
  </div>
</div>

        <Link to="/cart" className="relative">
          <FontAwesomeIcon icon={faCartShopping} size="lg" />
          <p className="cartContent">{}</p>
        </Link>
        {/* <<<<<<< HEAD
         <FontAwesomeIcon icon={faBars} size="lg" /> */}
        {/* ======= */}
        {/* <FontAwesomeIcon className="navBarMobileMenu" icon={faBars} size="lg" /> */}
        {/* >>>>>>> 04e95dff6563b6572718de3d35e1f4be9ef3178d */}
      </div>
    </div>
  );
};
export default NavBar;
