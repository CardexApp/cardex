import React, { useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { FaPen, FaSave, FaTimes } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../../Config";

const UserProfile = () => {
  const { user, loading, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
  });

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading profile...</p>;
  }

  if (!user) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Please log in to view your profile.</h2>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(true);
    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
    });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const res = await axios.patch(`${BASE_URL}/update-profile/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile updated successfully");

      // Update local auth context user
      setUser((prevUser) => ({
        ...prevUser,
        ...res.data,
      }));

      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "600px",
        margin: "20px auto",
        border: "2px solid grey",
        borderRadius: "10px",
      }}
      className="shadow-lg"
    >
      <h2 className="text-center">User Profile</h2>

      <p>
        <strong>Name:</strong>{" "}
        {isEditing ? (
          <>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="form-control mb-2"
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="form-control"
            />
          </>
        ) : (
          `${user.first_name || ""} ${user.last_name || ""}`
        )}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Role:</strong>{" "}
        {user.is_superuser ? "Admin" : user.is_staff ? "Staff" : "User"}
      </p>

      <div className="d-flex justify-content-center mt-3 gap-2">
        {isEditing ? (
          <>
            <button className="btn btn-success" onClick={handleSave}>
              <FaSave /> Save
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              <FaTimes /> Cancel
            </button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={handleEditToggle}>
            <FaPen /> Edit profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
