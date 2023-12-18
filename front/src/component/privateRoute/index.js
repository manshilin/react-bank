import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../container/authContext'; // Adjust the import path based on your project structure

const PrivateRoute = ({ element, ...rest }) => {
  const { token } = useAuth(); // Assuming your authentication context provides a 'token'

  return (
    <Route
      {...rest}
      element={token ? (
        element
      ) : (
        <Navigate to="/signin" state={{ from: rest.location.pathname }} />
      )}
    />
  );
};

export default PrivateRoute;
