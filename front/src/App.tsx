//App.tsx
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { loadSession } from './context/session';
import { AuthContext } from './context/authContext';
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
import { AuthProvider } from './context/authContext';

function UseSession() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const session = loadSession();
    if (session && session.user.isConfirm) {
      dispatch({ type: 'SIGN_IN', user: session.user, token: session.token });
      navigate('/balance');
    } else if (session && !session.user.isConfirm) {
      navigate('/signup-confirm');
    }
  }, [dispatch, navigate]);

  return null; // Цей компонент не рендерить нічого в DOM
}


function App() {
  
  
  return (
    
      <AuthProvider> 
        <BrowserRouter>
        
        
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
    
        </BrowserRouter>
      </AuthProvider>
    
  );
}
export default App;