import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";
import { loginWithGoogle } from "../api/auth"; // API gửi idToken tới BE

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const idToken = await currentUser.getIdToken();

          // Gửi idToken tới BE để lấy token và role
          const response = await loginWithGoogle(idToken);

          if (response?.token) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("role", response.role.$values[0]);
            localStorage.setItem("email", response.email);
            localStorage.setItem("name", response.name);

            setUser(currentUser);
            setRole(response.role.$values[0]);
          } else {
            console.error("Failed to fetch role from backend.");
          }
        } catch (error) {
          console.error("Error during authentication:", error);
        }
      } else {
        setUser(null);
        setRole(null);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook để sử dụng Auth
export const useAuth = () => {
  return useContext(AuthContext);
};
