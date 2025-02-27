import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "./layout/MainLayout";
import AdminRoute from "./routes/AdminRoute";
import { AuthProvider } from "./context/AuthProvider";

// Lazy load các trang
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Patient = lazy(() => import("./pages/Patient"));
const Band = lazy(() => import("./pages/Band"));
const Login = lazy(() => import("./pages/LoginWithGoogle"));

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
