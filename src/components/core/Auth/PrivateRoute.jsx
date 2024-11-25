// agar token present hai mtlb user logged in hai , so allow them to use children of this route , otherwise send them to login
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (token !== null) return children;
  else return <Navigate to="/login" />;
}
