import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../Config";
import "./AdminAuth.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}/admin/login/`, {
        username,
        password,
      });

      const access = res.data.access;
      const refresh = res.data.refresh;
      const userData = res.data.user;

      // Store tokens
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Save user to context
      setUser(userData);

      // Redirect based on role
      if (userData.is_staff || userData.is_superuser) {
        toast.success(`Welcome ${userData.first_name || "Admin"}!`);
        navigate("/admin");
      } else {
        toast.error("Access denied: You are not an admin.");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Please try again.");
      toast.error("Login failed");
    }
  };

  return (
    <div className="authContainer">
      <h2>Admin Login</h2>
      <form onSubmit={loginSubmit}>
        <input
          type="text"
          placeholder="Username or Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
