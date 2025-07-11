import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
  e.preventDefault();
  setError("");
  setMessage("");

  if (!email.includes("@")) {
    setError("Please enter a valid email address.");
    return;
  }

  const accessToken = localStorage.getItem("accessToken"); // ✅ fetch the token

  try {
    const res = await axios.post(
      "https://sparkling-chelsae-cardex-cd058300.koyeb.app/api/forgot-password/",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // ✅ use the token
        },
      }
    );

    setMessage("Password reset link sent! Check your email.");
    setEmail("");
  } catch (err) {
    if (err.response) {
      setError(err.response.data.message || "Failed to send reset email.");
    } else if (err.request) {
      setError("No response from server.");
    } else {
      setError("Something went wrong.");
    }
  }
};

  return (
    <div className="loginContainer">
      <h2 className="loginTitle">Forgot Password</h2>
      <p>Enter your email to receive a reset link</p>
      <div className="loginInput">
        <img src="/default-avatar.png" alt="email icon" className="loginAvatar" />
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Email Address"
            className="loginUser"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && <p className="errorText">{error}</p>}
          {message && <p className="successText">{message}</p>}

          <button type="submit" className="loginSubmit">
            Send Reset Link
          </button>
        </form>

        <p className="backToLogin">
          <span onClick={() => navigate("/login")} style={{ cursor: "pointer", color: "#007BFF" }}>
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyMzM3ODk3LCJpYXQiOjE3NTIyNTE0OTcsImp0aSI6IjE0MzY2Y2QyZDY2ODRlOTRhYmJiNTIwOGY5ZTcwMTc0IiwidXNlcl9pZCI6MTN9.VdVZF3nMq3nl9yh_uvD9NmPTQ-cmlLzVB94_GrNG0Do