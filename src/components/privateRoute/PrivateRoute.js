import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const auth = localStorage.getItem("token");
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return element;
};

export default PrivateRoute;
