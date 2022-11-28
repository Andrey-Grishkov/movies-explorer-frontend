import React from "react";
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children, isAuth}) {
  console.log(isAuth,'ProtectedRoute')
  // return children
  return isAuth ? children : <Navigate to="/signin"/>
}

export default ProtectedRoute;
