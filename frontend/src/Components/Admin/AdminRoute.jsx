import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  //   

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/admin/" />;
  if (!user.is_staff && !user.is_superuser)
    return <Navigate to="/admin/login" />;

  return children;
}
