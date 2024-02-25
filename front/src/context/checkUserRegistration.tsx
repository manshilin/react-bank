// front/src/context/checkUserRegistration.tsx
import React, { useContext, useEffect } from 'react';
import { AuthContext } from './authContext';

const CheckUserRegistration = () => {
  const { state: { user, token } } = useContext(AuthContext);

  useEffect(() => {
    if (user && token) {
        console.log('Інформація про користувача та токен збережені в authContext:', user, token);
    } else {
        console.log('Інформація про користувача та токен не збережені в authContext.');
    }
}, [user, token]);

  return null;
}

export default CheckUserRegistration;
