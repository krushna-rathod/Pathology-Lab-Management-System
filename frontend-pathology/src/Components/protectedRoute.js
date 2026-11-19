import React, { useContext } from "react";
import { AuthContext } from "../Context/authContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;

  if (user.role !== "admin") {
    return <h2>Access Denied ❌</h2>;
  }

  return children;
};

export default ProtectedRoute;