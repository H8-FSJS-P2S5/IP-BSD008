import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import propTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);
  const isLoggedIn = authState && authState.token;

  return isLoggedIn ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: propTypes.node.isRequired,
};

export default ProtectedRoute;
