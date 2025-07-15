import "./Login.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../Config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://sparkling-chelsae-cardex-cd058300.koyeb.app/api/token/",
        credentials
      );
      const token = response.data?.access || response.data?.token;
      if (token) {
        localStorage.setItem("accessToken", token);
        toast.success("Login successful!");
        navigate("/listings");
      } else {
        toast.error("Token not received.");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error("Invalid credentials or server error.");
    }
  };

  return (
    <div className="loginContainer">
      <h2 className="loginTitle">Welcome To Cardex</h2>
      <p>Please login to continue or sign up to create an account</p>

      <form
        onSubmit={handleLogin}
        style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}
      >
        <h2>Login</h2>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          required
          className="form-control"
          style={{ marginBottom: "1rem" }}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
          className="form-control"
          style={{ marginBottom: "1rem" }}
        />

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%" }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
