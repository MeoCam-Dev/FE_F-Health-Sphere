import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import PropTypes from "prop-types";
const AdminRoute = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user && role === "admin" ? children : <Navigate to="/login" />;
};
AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminRoute;
