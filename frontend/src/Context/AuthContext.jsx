import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Config";
import { jwtDecode } from "jwt-decode";

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
          const decoded = jwtDecode(accessToken); // Decode token for admin flags

          setUser({
            ...res.data,
            is_staff: decoded.is_staff,
            is_superuser: decoded.is_superuser,
          });
        } catch (err) {
          // Token may have expired, attempt refresh
          const refreshRes = await axios.post(`${BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
          });

          const newAccess = refreshRes.data.access;
          localStorage.setItem("accessToken", newAccess);

          const retryRes = await getUser(newAccess);
          const decoded = jwtDecode(newAccess); // Decode refreshed token too

          setUser({
            ...retryRes.data,
            is_staff: decoded.is_staff,
            is_superuser: decoded.is_superuser,
          });
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
