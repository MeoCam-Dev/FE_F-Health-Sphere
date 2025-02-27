import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import PropTypes from "prop-types"; 
// Tạo context cho Auth
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        let userRole = "user";
        if (userSnap.exists()) {
          userRole = userSnap.data().role;
        }

        setUser(currentUser);
        setRole(userRole);
        localStorage.setItem("role", userRole);
      } else {
        setUser(null);
        setRole(null);
        localStorage.removeItem("role");
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

