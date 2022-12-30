import React, { useContext} from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import {AuthContext} from './contexts/authContext'

function PrivateRoute({ children }) {
  const context = useContext(AuthContext)
  // Format given to use for PrivateRoute does not work in react-router v6, as it complains about a non-route component within the routes,
  // which is now required for the nested of routes. As such, the private route had to be changed to be react-router v6 compliant: https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
  return context.isAuthenticated === true ? (
    children  
  ) : (
    <Navigate
      to={{
        pathname: "/login"
      }}
    />
  );
};

export default PrivateRoute;