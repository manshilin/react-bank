// Import React and necessary components/modules
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Import your context and components
import { AuthContext } from "./container/authContext"
import AuthRoute from "./component/authRoute";
import PrivateRoute from "./component/privateRoute";
//import { authContextData } from "./data/authContextData";
import WellcomePage from "./page/wellcomePage";
import SignupPage from "./page/signupPage";
import SignupConfirmPage from "./page/signupConfirmPage";
import SigninPage from "./page/signinPage";
import RecoveryPage from "./page/recoveryPage";
import RecoveryConfirmPage from "./page/recoveryConfirmPage";
import BalancePage from "./page/balancePage";
import NotificationsPage from "./page/notificationsPage";
import SettingsPage from "./pages/settingsPage";
import RecivePage from "./pages/recivePage";
import SendPage from "./page/sendPage";
import TransactionPage from "./page/transactionPage";
import Error from "./page/error";



function App() {
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
              <PrivateRoute>
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
            <PrivateRoute>
              <BalancePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <NotificationsPage />
            </PrivateRoute>
          }
        />
         <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/recive"
          element={
            <PrivateRoute>
              <RecivePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/send"
          element={
            <PrivateRoute>
              <SendPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/transaction/:transactionId"
          element={
            <PrivateRoute>
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
