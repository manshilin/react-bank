import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from "./context/authContext";
import AuthRoute from "./component/authRoute";
import PrivateRoute from "./component/privateRoute"; 
import WellcomePage from "./page/wellcomePage";
import SignupPage from "./page/signupPage";
import SignupConfirmPage from "./page/signupConfirmPage";
import SigninPage from "./page/signinPage";
import RecoveryPage from "./page/recoveryPage";
import RecoveryConfirmPage from "./page/recoveryConfirmPage";
import BalancePage from "./page/balancePage";
import NotificationsPage from "./page/notificationsPage";
import SettingsPage from "./page/settingsPage";
import RecivePage from "./page/recivePage";
import SendPage from "./page/sendPage";
import TransactionPage from "./page/transactionPage";
import Error from "./page/error";

function App() {
  const authContextData = {
    user: null,
    setUser: (user: any) => {}, // Add the missing setUser property
    signUp: async (username: any, password: any) => {},
    signIn: async (username: any, password: any) => {},
    signOut: async () => {},
  };

  return (
    <AuthContext.Provider value={authContextData}>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <AuthRoute>
                <WellcomePage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignupPage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup-confirm"
            element={
              <PrivateRoute element={undefined}>
                <SignupConfirmPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SigninPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery"
            element={
              <AuthRoute>
                <RecoveryPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery-confirm"
            element={
              <AuthRoute>
                <RecoveryConfirmPage />
              </AuthRoute>
            }
          />
          <Route
            path="/balance"
            element={
              <PrivateRoute element={undefined}>
                <BalancePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute element={undefined}>
                <NotificationsPage />
              </PrivateRoute>
            }
          />
          <Route
          path="/settings"
          element={
            <PrivateRoute element={undefined}>
              <SettingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/recive"
          element={
            <PrivateRoute element={undefined}>
              <RecivePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/send"
          element={
            <PrivateRoute element={undefined}>
              <SendPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/transaction/:transactionId"
          element={
            <PrivateRoute element={undefined}>
              <TransactionPage />
            </PrivateRoute>
          }
        />
        <Route path="*" Component={Error} />
      </Routes>
    </BrowserRouter>
  </AuthContext.Provider>
);
}
export default App;