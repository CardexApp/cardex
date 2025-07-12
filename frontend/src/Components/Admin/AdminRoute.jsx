import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  // If not logged in
  if (!user) return <Navigate to="/" />;

  // If logged in but not admin
  if (!user.is_staff && !user.is_superuser) {
    return <Navigate to="/" />;
  }

  return children;
}
