import React from "react";
import "../Authentication/AdminAuth.css";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const AdminProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <p className="loading">Loading admin profile...</p>;

  if (!user.is_staff && !user.is_superuser) {
    return <p className="errorText">Access denied: You are not an admin.</p>;
  }

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="adminProfileContainer">
      <h2 className="profileTitle">👤 Admin Profile</h2>

      <div className="adminInfoCard">
        <div className="infoRow">
          <span className="infoLabel">Full Name:</span>
          <span>
            {user.first_name} {user.last_name}
          </span>
        </div>
        <div className="infoRow">
          <span className="infoLabel">Username:</span>
          <span>{user.username || "N/A"}</span>
        </div>
        <div className="infoRow">
          <span className="infoLabel">Email:</span>
          <span>{user.email}</span>
        </div>
        <div className="infoRow">
          <span className="infoLabel">Is Staff:</span>
          <span>{user.is_staff ? "✅ Yes" : "❌ No"}</span>
        </div>
        <div className="infoRow">
          <span className="infoLabel">Is Superuser:</span>
          <span>{user.is_superuser ? "✅ Yes" : "❌ No"}</span>
        </div>
      </div>

      <div className="profileActions">
        <Link to="/admin/change-password" className="changePassLink">
          🔒 Change Password
        </Link>
        <button className="logoutBtn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
