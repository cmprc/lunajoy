import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/auth-context";

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log("user is authenticated", isAuthenticated);

  if (isLoading) return <div>Loading...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
