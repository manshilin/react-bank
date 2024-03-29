// front/src/page/signupConfirmPage/index.js
import React, { useState, useEffect, useContext } from 'react'; // Додано useContext
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext'; // Імпортуйте AuthContext з вашого контексту аутентифікації
import './index.css';
import HeaderTimeWifi from '../../component/headerTimeWifi';

function SignupConfirmPage() {
  const [confirmationCode, setConfirmationCode] = useState('');
  const navigate = useNavigate();
  const { state } = useContext(AuthContext); // Отримання стану аутентифікації
  
  const handleConfirmation = async () => {
    try {
      const response = await fetch('http://localhost:4000/signup-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({confirmationCode: String(confirmationCode)}),
      });
      const data = await response.json();
      const isConfirm = data.session.user.isConfirm;
      if (response.ok) {
        navigate('/balance');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error confirming signup:', error);
    }
  }
  
  return (
    <main>
    <HeaderTimeWifi color="black"/>
      <h1 className="h1title">Confirm Signup</h1>
      <p className="pdescribe">Enter confirmation code</p>
      <form>
        <label htmlFor="confirmationCode">Confirmation Code</label>
        <input
          type="text"
          id="confirmationCode"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
        />
      </form>
      <button type="button" onClick={handleConfirmation}>
        Confirm
      </button>
    </main>
  );
}
export default SignupConfirmPage;
