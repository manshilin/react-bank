//back/src/route/auth.js
const express = require('express');
const router = express.Router();
const path = require('path');
const { User } = require('../class/user');
const { Session } = require('../class/session');
const { Confirm } = require('../class/confirm');
const e = require('express');
//=====================================================
router.post('/signup', function (req, res) {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password ) {
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

    const newUser = User.create({ email, password, role: User.USER_ROLE.USER });
    console.log('newUser:', newUser )
    const confirm = Confirm.create(newUser.email); // Move session creation to after user creation
    console.log('confirm:', confirm)
    const session = Session.create(newUser); // Generate session after user creation
    console.log('session:', session)
    return res.status(200).json({
      message: 'Користувач успішно зареєстрований',
      session,
      confirm,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Помилка створення користувача',
    });
  }
});
// ================================================================
router.post('/signin', function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    });
  }
  try {
    const user = User.getByEmail(email);

    if (!user || user.password !== password) {
      return res.status(400).json({
        message: 'Помилка. Невірна електронна адреса або пароль',
      });
    }
    const session = Session.create(user); // Generate session after successful login
    console.log('session:', session);

    return res.status(200).json({
      message: 'Користувач успішно авторизований',
      session,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Помилка авторизації користувача',
    });
  }
});

//=================================================================
router.post('/signup-confirm', function (req, res) {
  const { confirmationCode } = req.body;

  if (!confirmationCode) {
    return res.status(400).json({
      message: "Помилка. Відсутні обов'язкові поля",
    });
  }
  
  try {
    const confirmData = Confirm.getData(confirmationCode);
    console.log('confirmData:', confirmData);

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
    user.isConfirm = true;
    Confirm.delete(confirmationCode);
    const session = Session.create(user); // Generate session after confirmation
    console.log('session:', session);

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
});

//=====================================================
module.exports = router;