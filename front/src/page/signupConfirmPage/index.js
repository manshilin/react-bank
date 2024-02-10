// Import React and necessary components/modules
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";

const SignupConfirmPage = () => {
  const { user, confirmUser } = useContext(AuthContext);
  const [confirmationCode, setConfirmationCode] = useState('');
  const navigate = useNavigate();

  const handleConfirmation = async () => {
    try {
      // Викликати функцію для перевірки коду підтвердження
      await confirmUser(confirmationCode);

      // Перевірити, чи користувач підтверджений
      if (user.confirm) {
        // Перейти на сторінку /balance після успішного підтвердження
        navigate('/balance');
      }
    } catch (error) {
      console.error('Помилка підтвердження: ', error);
    }
  };

  return (
    <div>
      <h2>Підтвердження реєстрації</h2>
      <input
        type="text"
        placeholder="Введіть код підтвердження"
        value={confirmationCode}
        onChange={(e) => setConfirmationCode(e.target.value)}
      />
      <button onClick={handleConfirmation}>Підтвердити</button>
    </div>
  );
};

export default SignupConfirmPage;
