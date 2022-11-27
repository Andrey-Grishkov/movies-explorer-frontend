import React from "react";
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children, loggedIn}) {
  console.log(loggedIn,'ProtectedRoute')
  // return children
  return loggedIn || loggedIn===null ? children : <Navigate to="/signin"/>
}

export default ProtectedRoute;
