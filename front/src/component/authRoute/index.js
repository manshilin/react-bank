
import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { AuthContext } from "./container/authContext";

const AuthRoute = ({ element }) => {
  const { token } = useContext(AuthContext);

  return token ? (
    <Navigate to="/balance" replace />
  ) : (
    <Route element={element} />
  );
};

export default AuthRoute;
