import "./AdminAuth.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://sparkling-chelsae-cardex-cd058300.koyeb.app/api/admin/login",
        {
          username: form.username,
          password: form.password,
        }
      );

      if(res.data.access && res.data.refresh){

        // localStorage.setItem("accessToken", res.data.access);
        // localStorage.setItem("refreshToken", res.data.refresh);

        alert("Login successful!");
        navigate("/admin");
      } else {
        alert("Login response missing tokens")
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="authContainer">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter email"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
