import React, { useState } from "react";
import "./AdminAuth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../Config";
import { useAuth } from "../../../Context/AuthContext";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const loginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Get access and refresh tokens
      const tokenRes = await axios.post(`${BASE_URL}/login/`, {
        username,
        password,
      });

      const { access, refresh } = tokenRes.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Step 2: Fetch admin user profile using token
      const userRes = await axios.get(`${BASE_URL}/admin/me/`, {
        headers: { Authorization: `Bearer ${access}` },
      });

      const userData = userRes.data;
      console.log("Fetched user:", userData);

      // Step 3: Check admin privileges
      if (!userData.is_staff && !userData.is_superuser) {
        setError("Access denied: You are not an admin.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return;
      }

      // Step 4: Store user in context and redirect
      setUser(userData);
      navigate("/admin");
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response?.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authContainer">
      <h2 className="loginTitle">Admin Login</h2>
      <p className="loginSubtitle">
        Only authorized personnel can access this portal.
      </p>

      <form className="form" onSubmit={loginSubmit}>
        <input
          type="text"
          className="loginUser"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="loginPass"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="loginRecover">
          <input type="checkbox" /> Remember me
          <span className="loginForgotPass">Forgot Password?</span>
        </div>

        {error && <p className="errorText">{error}</p>}
        <button type="submit" className="button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
