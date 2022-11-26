import React from "react";
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children, loggedIn}) {
  console.log(loggedIn,'ProtectedRoute')
  return loggedIn ? children : <Navigate to="/signin"/>
}

export default ProtectedRoute;
