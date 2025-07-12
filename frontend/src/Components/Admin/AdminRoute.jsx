import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-toastify";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    toast.warn("Please log in to access the admin panel.");
    return <Navigate to="/admin/login" />;
  }

  if (!user.is_staff && !user.is_superuser) {
    toast.error("Access denied: Not an admin.");
    return <Navigate to="/" />;
  }

  return children;
}
