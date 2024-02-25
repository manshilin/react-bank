// src/component/authRoute/index.js

// AuthRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const AuthRoute = ({ element }) => {
  const { token } = useContext(AuthContext);
  return token ? <Navigate to="/balance" /> : element;
};

export default AuthRoute;