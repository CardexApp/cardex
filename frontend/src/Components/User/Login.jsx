import { useState } from "react";
import "./Login.css";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { BASE_URL } from "../../Config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const loginSubmit = async (e) => {
  e.preventDefault();

  // Validate input
  if (!username.trim() || !password.trim()) {
    setError("Please enter both username and password.");
    return;
  }

  try {
    const res = await axios.post(
      "https://sparkling-chelsae-cardex-cd058300.koyeb.app/api/login/",
      { username, password }
    );

    // ✅ Save access & refresh tokens to localStorage
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
    }
  }
};

  return (
    <div className="loginContainer">
      <h2 className="loginTitle">Welcome To Cardex</h2>
      <p>Please login to continue or sign up to create an account</p>

      <div className="loginInput">
        <img src="" alt="user avatar" className="loginAvatar" />

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
            <input type="checkbox" /> Remember me
            <span className="loginForgotPass">Forgot Password?</span>
          </div>

          {error && <p className="errorText">{error}</p>}

          <button type="submit" className="loginSubmit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
