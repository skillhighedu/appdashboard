import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "@context/authStore";

export const ProtectedRoute = () => {
  const { isAuthenticated } = authStore();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
