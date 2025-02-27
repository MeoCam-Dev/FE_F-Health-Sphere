import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import AdminRoute from "./routes/AdminRoute";
import { AuthProvider } from "./context/AuthProvider";
import Dashboard from "./pages/Dashboard";
import Patient from "./pages/Patient";
import Band from "./pages/Band";
import Login from "./pages/LoginWithGoogle";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <AdminRoute>
                <MainLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="patient" element={<Patient />} />
            <Route path="band" element={<Band />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
