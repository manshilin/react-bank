// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const PrivateRoute = ({ element }) => {
  const { state: { token, loading } } = useContext(AuthContext); // Використання AuthContext для отримання token та loading

  return token ? element : <Navigate to="/signin" />;
};

export default PrivateRoute;
