
// src/component/privateRoute/index.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext'; // Adjusted import path
import WellcomePage from "../../page/wellcomePage";
import SignupPage from "../../page/signupPage";
import SignupConfirmPage from "../../page/signupConfirmPage";
import SigninPage from "../../page/signinPage";
import RecoveryPage from "../../page/recoveryPage";
import RecoveryConfirmPage from "../../page/recoveryConfirmPage";
import BalancePage from "../../page/balancePage";
import NotificationsPage from "../../page/notificationsPage";
import SettingsPage from "../../page/settingsPage";
import RecivePage from "../../page/recivePage";
import SendPage from "../../page/sendPage";
import TransactionPage from "../../page/transactionPage";
import Error from "../../page/error";
const PrivateRoute = ({ element, ...rest }) => {
  const { token } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      element={token ? element : <Navigate to="/signin" />}
    />
  );
};

export default PrivateRoute;
