<<<<<<< HEAD
import { useState } from "react";
import "./Login.css";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { BASE_URL } from "../../Config";
=======
import React, { useState } from "react";
>>>>>>> dc291cc (Updated Payment Page)
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

<<<<<<< HEAD
    // Save access & refresh tokens to localStorage
    localStorage.setItem("accessToken", res.data.access);
    localStorage.setItem("refreshToken", res.data.refresh);

    // Redirect after successful login
    navigate("/");
  } catch (err) {
    if (err.response) {
      setError(err.response.data.message || "Invalid username or password");
    } else if (err.request) {
      setError("No response from server");
    } else {
      setError("An error occurred");
=======
      if (token) {
        localStorage.setItem("token", token);
        toast.success("Login successful!");
        navigate("/payment");
      } else {
        toast.error("Token not received.");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error("Invalid credentials or server error.");
>>>>>>> dc291cc (Updated Payment Page)
    }
  };

  return (
<<<<<<< HEAD
    <div className="loginContainer">
      <h2 className="loginTitle">Welcome To Cardex</h2>
      <p>Please login to continue or sign up to create an account</p>

      <div className="loginInput">


        <form onSubmit={loginSubmit}>
          <input
            type="text"
            placeholder="Enter Username"
            className="loginUser"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="loginPass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="loginRecover">
  <label>
    <input type="checkbox" />
    Remember me
  </label>
  <span className="loginForgotPass">Forgot Password?</span>
</div>


          {error && <p className="errorText">{error}</p>}

          <button type="submit" className="loginSubmit">
            Submit
          </button>
        </form>
      </div>
    </div>
=======
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
>>>>>>> dc291cc (Updated Payment Page)
  );
};

export default Login;
