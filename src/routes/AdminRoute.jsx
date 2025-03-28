import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const AdminRoute = ({ children }) => {
  const { user, role, loading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");

      if (token && storedRole === "Admin") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setCheckingAuth(false);
    };

    checkAuth();
  }, [user, role, loading]);

  if (loading || checkingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
