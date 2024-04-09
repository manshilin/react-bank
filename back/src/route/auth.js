//back/src/route/auth.js
const express = require('express');
const router = express.Router();
const { User } = require('../class/user');
const { Session } = require('../class/session');
const { Confirm } = require('../class/confirm');
const e = require('express');
const bcrypt = require('bcrypt');

//=====================================================
router.post('/signup', function (req, res) {
 
  const { email, password} = req.body; 
  if (!email || !password ) {
    console.log('Error: Missing email or password'); // Додано лог
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    });
  }

  try {
    const user = User.getByEmail(email);
    if (user) {
      return res.status(400).json({
        message: 'Помилка. Такий користувач вже існує',
      });
    }

    const newUser = User.create({ email, password, role: User.USER_ROLE.USER}); 
    const confirm = Confirm.create(newUser.email);
    console.log('confirm', confirm);
    const session = Session.create(newUser);
    const currentBalance = newUser.currentBalance; 
    return res.status(200).json({
      message: 'Користувач успішно зареєстрований',
      session,
      currentBalance,
      confirm,
    });
  } catch (err) {
    console.error('Error during user creation:', err); // Додано лог
    return res.status(400).json({
      message: 'Помилка створення користувача',
    });
  }
});

//====================================================================
// Встановлюємо маршрут для POST запиту на '/signin'
router.post('/signin', async function (req, res) {
  const { email, password } = req.body;
  // Перевіряємо, чи були email і password надані
  console.log('signin', email, password)

  if (!email || !password) {
    console.log('Error: Missing email or password');
    return res.status(400).json({ message: "Помилка. Обов'язкові поля відсутні" });
  }

  try {
    const user = User.getByEmail(email)
    console.log('user signin', user);
    // Перевіряємо, чи існує користувач з таким email
    if (!user) {
      console.log(`Error: User not found for email: ${email}`);
      return res.status(400).json({ message: 'Помилка. Невірна електронна адреса або пароль' });
    }
    
    // Перевіряємо, чи співпадає пароль
    const isMatch = await bcrypt.compare(password, user.password);
   
    if (!isMatch) {
      console.log(`Error: Password does not match for email: ${email}`);
      return res.status(400).json({ message: 'Помилка. Невірна електронна адреса або пароль' });
    }

    const session = Session.findSessionByEmail(email);

    // Перевіряємо, чи існує сесія для користувача
    if (!session) {
      console.log('Error: Session not found');
      return res.status(404).json({ message: 'Сесія не знайдена. Авторизуйтеся знову' });
    }
    return res.status(200).json({
      message: 'Користувач успішно авторизований',
      session: {
        user,
        token: session.token,
        currentBalance: user.currentBalance
      }
    });
  } catch (err) {
    console.error('Exception during signin process:', err);
    return res.status(400).json({ message: 'Помилка авторизації користувача' });
  }
});


//====================================================================
router.post('/signup-confirm', function (req, res) {
  const { confirmationCode } = req.body;
  if (!confirmationCode) {
    return res.status(400).json({
      message: "Помилка. Відсутні обов'язкові поля",
    });
  }

  try {
    const confirmData = Confirm.getData(confirmationCode);
    console.log('confirmData', confirmData);

    if (!confirmData) {
      return res.status(400).json({
        message: 'Помилка. Невірний код підтвердження',
      });
    }

    const user = User.getByEmail(confirmData);
    if (!user) {
      return res.status(400).json({
        message: 'Помилка. Користувача не знайдено',
      });
    }

    // Оновлення статусу підтвердження
    User.confirmUser(confirmData);
    // метод для оновлення сесії
  Session.update(user.email, { isConfirm: true });


    // Оновлення сесії з новим статусом `isConfirm`
    const session = Session.findSessionByEmail(user.email);
    Confirm.delete(confirmationCode)
    console.log('session', session);  
    return res.status(200).json({
      message: 'Користувач успішно підтверджений та авторизований',
      session,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: 'Помилка підтвердження користувача',
    });
  }
});
//=====================================================
router.post('/logout', (req, res) => {
  const sessionToken = req.headers.authorization.split(' ')[1];

  console.log('Received logout request with session token:', sessionToken); // Log the received session token
  if (sessionToken) {
    res.status(200).json({ message: 'Logged out successfully' });
  } else {
    res.status(400).json({ error: 'Session token not provided' });
  }
});
//=====================================================
router.post('/recovery', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    });
  }
  try {
    const user = User.getByEmail(email);
    if (!user) {
      return res.status(400).json({
        message: 'Помилка. Користувача не знайдено',
      });
    }
    const confirm = Confirm.create(user.email);
    console.log('confirm', confirm);
    return res.status(200).json({
      message: 'Користувач успішно зареєстрований',
      confirm,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Помилка відновлення паролю',
    });
  }
});
//=====================================================
router.post('/recovery-confirm', function (req, res) {
  const { confirmationCode } = req.body;
  if (!confirmationCode) {
    return res.status(400).json({
      message: "Помилка. Відсутні обов'язкові поля",
    });
  }
  try {
    const confirmData = Confirm.getData(confirmationCode);
    console.log('confirmData', confirmData);

    if (!confirmData) {
      return res.status(400).json({
        message: 'Помилка. Невірний код підтвердження',
      });
    }

    const user = User.getByEmail(confirmData);
    if (!user) {
      return res.status(400).json({
        message: 'Помилка. Користувача не знайдено',
      });
    }
    Confirm.delete(confirmationCode);
    const session = Session.create(user);
    console.log('session1', session);
    session.user.isConfirm = true;
    console.log('session2', session);

    return res.status(200).json({
      message: 'Користувач успішно підтверджений та авторизований',
      session,
      confirmationCode,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: 'Помилка підтвердження користувача',
    });
  }
}
);
//=====================================================
router.post('/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  if ( !oldPassword || !newPassword) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    });
  }
  try {
    // Retrieve the user based on email
    const user = User.getByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If the old password matches, update to the new password
    await User.changePassword(user, oldPassword, newPassword);

    res.status(200).json({ message: 'Password successfully updated' });
  } catch (error) {
    console.error('Failed to update password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//=====================================================
router.post('/change-email', async (req, res) => {
  const { email, newEmail, password } = req.body;
  if (!newEmail || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    });
  }
  try {
    // Retrieve the user based on email
    const user = User.getByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If the password matches, update to the new email
     User.changeEmail(user, newEmail);
    const userChangeEmail = User.getByEmail(newEmail);

    console.log('userChangeEmail', userChangeEmail);
    // Update the session with the new email
    Session.update(email, { email: newEmail });

    



    res.status(200).json({ message: 'Email successfully updated' });
  } catch (error) {
    console.error('Failed to update email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//=====================================================
module.exports = router;
