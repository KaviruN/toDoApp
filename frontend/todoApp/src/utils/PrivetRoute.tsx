import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('AccessToken'); // Check if the user is authenticated

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;