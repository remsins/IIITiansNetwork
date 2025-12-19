import { Navigate, Outlet } from "react-router-dom";

export default function RequireAdmin() {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
