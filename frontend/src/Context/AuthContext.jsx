import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const getUser = async (token) =>
          await axios.get(`${BASE_URL}/admin/me/`, {
            headers: { Authorization: `Bearer ${token}` },
          });

        try {
          const res = await getUser(accessToken);
          setUser(res.data);
        } catch (err) {
          // If token expired, try refresh
          const refreshRes = await axios.post(`${BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
          });

          const newAccess = refreshRes.data.access;
          localStorage.setItem("accessToken", newAccess);

          const retryRes = await getUser(newAccess);
          setUser(retryRes.data);
        }
      } catch (err) {
        console.error("Auth failed:", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
