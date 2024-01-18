// src/components/AuthRoute/index.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';

const AuthRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  return token ? children : <Navigate to="/signin" />;
};

export default AuthRoute;
