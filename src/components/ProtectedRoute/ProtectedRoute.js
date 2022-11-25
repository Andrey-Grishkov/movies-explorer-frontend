import React from "react";
import { Navigate, Outlet} from 'react-router-dom';

const ProtectedRoute = () => {
  return (localStorage.getItem('LoggedIn')) ? <Outlet/> : <Navigate to="/signin"/>
}

export default ProtectedRoute;
