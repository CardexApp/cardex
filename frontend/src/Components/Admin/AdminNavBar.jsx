import "./Styles/AdminNavBar.css";
import asset from "../../../src/assets/asset";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChalkboardUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { DateDisplay, SearchBar } from "../Admin/Reusables";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminNavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    navigate("/admin/login");
  };

  return (
    <div className="navAdmin">
      <div className="icon">
        <img className="logo" src={asset.LOGO} alt="CARDEX logo" />
      </div>

      <div className="dashBoard">
        <h3>Admin Page</h3>
        <h4>
          <DateDisplay />
        </h4>
      </div>

      <div className="services">
        <div className="adminSearch">
          <SearchBar placeholder="Search Cardex" type="text" />
        </div>

        <div className="notifiers">
          <FontAwesomeIcon className="fontIcon" icon={faBell} />

          <div className="dropdownAdminProfile">
            <FontAwesomeIcon className="fontIcon" icon={faChalkboardUser} />
            <div className="dropdownContentAdmin">
              <div className="adminProfile">
                <div className="adminAvatar">
                  <p>{user?.username}</p>
                </div>
                <h2>{user?.username}</h2>
                <h3>{user?.email}</h3>
                <button onClick={handleLogout} className="logoutBtn">
                  <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
