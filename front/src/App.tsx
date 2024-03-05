//App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthRoute from './component/authRoute';
import PrivateRoute from './component/privateRoute';
import WellcomePage from './page/wellcomePage';
import SignupPage from './page/signupPage';
import SignupConfirmPage from './page/signupConfirmPage';
import SigninPage from './page/signinPage';
import RecoveryPage from './page/recoveryPage';
import RecoveryConfirmPage from './page/recoveryConfirmPage';
import BalancePage from './page/balancePage';
import NotificationsPage from './page/notificationsPage';
import SettingsPage from './page/settingsPage';
import RecivePage from './page/recivePage';
import SendPage from './page/sendPage';
import TransactionPage from './page/transactionPage';
import Error from './page/error';
import Page from './component/page';
import { AuthProvider } from './context/authContext';
function App() {
  return (
    
      <AuthProvider> 
        <BrowserRouter>
        <Page>
          <Routes>
            <Route path="/" element={ <AuthRoute element={<WellcomePage />}/>}/>
            <Route path="/signup" element={<AuthRoute element={<SignupPage />} />}/>
            <Route path="/signup-confirm" element= {<AuthRoute element={<SignupConfirmPage />} />} />
            <Route path="/signin" element={<AuthRoute element={<SigninPage />} />} />
            <Route path="/recovery" element={<RecoveryPage />} />
            <Route path="/recovery-confirm" element={<AuthRoute element={<RecoveryConfirmPage />} />} />
            <Route path="/balance" element={<PrivateRoute element={<BalancePage />} />} />
            <Route path="/notifications" element={<PrivateRoute element={<NotificationsPage />} />} />
            <Route path="/settings" element={<PrivateRoute element={<SettingsPage />} />} />
            <Route path="/recive" element={<PrivateRoute element={<RecivePage />} />} />
            <Route path="/send" element={<PrivateRoute element={<SendPage />} />} />
            <Route path="/transaction/:transactionId" element={<PrivateRoute element={<TransactionPage />} />} />
            <Route path="*" element={<Error />} />
          </Routes>
          </Page>
        </BrowserRouter>
      </AuthProvider>
    
  );
}
export default App;