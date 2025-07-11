import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          setError("No access token found. Please log in.");
          return;
        }

        const res = await axios.get("https://sparkling-chelsae-cardex-cd058300.koyeb.app/api/profile/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setProfileData(res.data);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.detail || "Failed to fetch profile.");
        } else {
          setError("Network error.");
        }
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profileContainer">
      <h2>User Profile</h2>

      {error && <p className="errorText">{error}</p>}

      {profileData ? (
        <div className="profileInfo">
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          {/* Add more fields based on your API response */}
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
