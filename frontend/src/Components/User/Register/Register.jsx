import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const registerSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Basic client-side validation
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(
        "https://sparkling-chelsae-cardex-cd058300.koyeb.app/api/register",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setError("Registration successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500); // Brief delay before redirect
    } catch (err) {
      console.error("Registration failed:", err);
      if (err.response) {
        setError(err.response.data.message || "Registration failed. Please try again.");
      } else if (err.request) {
        setError("No response from server.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="loginContainer">
      <h2 className="loginTitle">Create an Account</h2>
      <p>Sign up to access Cardex</p>
      <div className="loginInput">
        <img
          src="/default-avatar.png"
          alt="user avatar"
          className="loginAvatar"
        />
        <form onSubmit={registerSubmit}>
          <input
            type="text"
            placeholder="First Name"
            className="loginUser"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="loginUser"
            value={lastName}
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

          {error && <p className="errorText">{error}</p>}

          <button
            type="submit"
            className="loginSubmit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
