import React, { useState } from "react";
import "../Styles/AdminProfile.css";
import { useAuth } from "../../../Context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../Config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProfile = () => {
  const { user, setUser } = useAuth();
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState(null);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.put(
        `${BASE_URL}/admin/update-profile/`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser((prev) => ({
        ...prev,
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        email: res.data.email,
      }));

      toast.success("✅ Profile updated successfully!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.email?.[0] ||
        err.response?.data?.detail ||
        "❌ Failed to update profile.";
      toast.error(errorMessage);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // For display only
    } else {
      toast.warning("Only image files are supported.");
    }
  };

  if (!user) return <p>Loading admin profile...</p>;

  return (
    <div className="adminProfileContainer">
      <h2>Admin Profile</h2>

      <div className="adminInfoCard">
        <div className="imagePreview">
          <img
            src={
              profileImage ||
              `https://ui-avatars.com/api/?name=${firstName}+${lastName}`
            }
            alt="Profile"
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginTop: "10px" }}
          />
        </div>

        <form onSubmit={handleProfileUpdate} className="profileForm">
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>

          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="updateButton">
            Save Changes
          </button>
        </form>

        <div className="permissionsDisplay">
          <p>
            <strong>Is Staff:</strong> {user?.is_staff ? "Yes" : "No"}
          </p>
          <p>
            <strong>Is Superuser:</strong> {user?.is_superuser ? "Yes" : "No"}
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminProfile;
