import React from "react";
import "../Styles/AdminProfile.css";
import { useAuth } from "../../../Context/AuthContext";

const AdminProfile = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading admin profile...</p>;

  return (
    <div className="adminProfileContainer">
      <h2>Admin Profile</h2>
      <div className="adminInfoCard">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Is Staff:</strong> {user.is_staff ? "Yes" : "No"}
        </p>
        <p>
          <strong>Is Superuser:</strong> {user.is_superuser ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;
