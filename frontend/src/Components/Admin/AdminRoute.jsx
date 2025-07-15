import { useAuth } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminRoute = ({ children }) => {
  const { user } = useAuth(); // Already decoded and stored
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (user?.is_staff || user?.is_superuser) {
      setAuthorized(true);
    }
    setLoading(false);
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (!authorized) return <Navigate to="/unauthorized" />;

  return children;
};

export default AdminRoute;
