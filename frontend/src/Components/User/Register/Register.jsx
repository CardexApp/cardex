import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple client-side validation
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const res = await axios.post(
        "https://sparkling-chelsae-cardex-cd058300.koyeb.app/api/register",
        {
          first_name,
          last_name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Registered:", res.data);
      navigate("/"); // Redirect to login or home
    } catch (err) {
      if (err.response) {
        console.error("Error response:", err.response.data);
        setError(err.response.data.message || "Registration failed.");
      } else if (err.request) {
        console.error("No server response");
        setError("No response from server.");
      } else {
        console.error("Error:", err.message);
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div className="loginContainer">
      <h2 className="loginTitle">Create an Account</h2>
      <p>Register to access Cardex</p>
      <div className="loginInput">
        <img src="/default-avatar.png" alt="user avatar" className="loginAvatar" />
        <form onSubmit={registerSubmit}>
          <input
            type="text"
            placeholder="First Name"
            className="loginUser"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="loginUser"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="loginUser"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="loginPass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="loginRecover">
            <input type="checkbox" /> I agree to the terms
          </div>

          {error && <p className="errorText">{error}</p>}
          <button type="submit" className="loginSubmit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
