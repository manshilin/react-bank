//back/src/route/auth.js
const express = require('express');
const router = express.Router();
const path = require('path');
const { User } = require('../class/user');
const { Session } = require('../class/session');
const { Confirm } = require('../class/confirm');
const { Transaction, SendTransaction, ReceiveTransaction, TransactionManager } = require('../class/transactions');
const e = require('express');
//=====================================================

// Create a new instance of TransactionManager
const transactionManager = new TransactionManager();

router.post('/signup', function (req, res) {
  const { email, password} = req.body; 

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

    const newUser = User.create({ email, password, role: User.USER_ROLE.USER}); 
    const confirm = Confirm.create(newUser.email);
    console.log('confirm', confirm);
    const session = Session.create(newUser);
    console.log('session', session);
    const currentBalance = newUser.currentBalance; 
    return res.status(200).json({
      message: 'Користувач успішно зареєстрований',
      session,
      currentBalance,
      confirm,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Помилка створення користувача',
    });
  }
});

// Route for user login
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
    const session = Session.create(user);

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
//======================================================================
// Route for confirming user registration
router.post('/signup-confirm', function (req, res) {
  const { confirmationCode } = req.body;
  if (!confirmationCode) {
    return res.status(400).json({
      message: "Помилка. Відсутні обов'язкові поля",
    });
  }
  
  try {
    const confirmData = Confirm.getData(confirmationCode);

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
    const session = Session.create(user);

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
router.post('/logout', (req, res) => {
  const sessionToken = req.headers.authorization.split(' ')[1];

  console.log('Received logout request with session token:', sessionToken); // Log the received session token
  if (sessionToken) {
    Session.delete(sessionToken);
    res.status(200).json({ message: 'Logged out successfully' });
  } else {
    res.status(400).json({ error: 'Session token not provided' });
  }
});

//=====================================================
router.get('/balance', function (req, res) {
  try {
    const sessionToken = req.headers.authorization.split(' ')[1];
    console.log('Received balance retrieval request with session token:', sessionToken);

    if (!sessionToken) {
      return res.status(401).json({
        message: "Помилка. Сесія не надана",
      });
    }

    const user = Session.getUserFromToken(sessionToken);


    if (!user) {
      return res.status(401).json({
        message: "Помилка. Невірна сесія або сесія закінчилася",
      });
    }

    const currentBalance = user.currentBalance;
    console.log('Sending current balance',currentBalance);

    return res.status(200).json({
      message: 'Успішно отримано баланс користувача',
      balance: currentBalance,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Помилка отримання балансу користувача',
    });
  }
});

// ==========================================================
router.post('/send', async (req, res) => {
  try {
    const { recipient, amount } = req.body;
    console.log('Received money sending request with recipient and amount:', recipient, amount); 

    // Validate the received data
    if (!recipient || !amount) {
      console.error('Invalid data received:', req.body);
      return res.status(400).send('Invalid data');
    }

    // Define time as the current time
    const time = new Date();

    // Create a new SendTransaction
    const newTransaction = new SendTransaction(time, amount, recipient);
    transactionManager.addTransaction(newTransaction);

    console.log('Transaction created and added successfully:', newTransaction);

    // Simulate successful response
    res.sendStatus(200);
  } catch (error) {
    console.error('Error sending money:', error);
    res.status(500).send('Internal Server Error');
  }
});

//=================================================================================
router.get('/transactions', async (req, res) => {
  console.log('Received transaction history retrieval request');
  try {
    console.log('Before using req.headers.authorization:', req.headers.authorization);
    const sessionToken = req.headers.authorization.split(' ')[1]; 
    console.log('After using req.headers.authorization:', req.headers.authorization);
    const user = Session.getUserFromToken(sessionToken);
    if (!user) {
      return res.status(401).json({
        message: "Помилка. Невірна сесія або сесія закінчилася",
      });
    }

    // Fetch and return transaction history
    const transactions = transactionManager.getTransactions(); 

    return res.status(200).json({
      message: 'Успішно отримано історію транзакцій',
      transactions: transactions,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Помилка отримання історії транзакцій',
    });
  }
});

//===========================================================================
// Route for creating a new transaction
router.post('/transactions', async (req, res) => {
  try {
    const { sender, receiver, amount } = req.body;
    console.log('Received new transaction creation request with sender, receiver, and amount:', sender, receiver, amount);

    // Create a new ReceiveTransaction
    const newTransaction = new ReceiveTransaction(time, amount, icon);
    transactionManager.addTransaction(newTransaction);

    return res.status(200).json({
      message: 'Нова транзакція успішно створена',
      transaction: newTransaction,
    });
  } catch (error) {
    console.error('Помилка створення транзакції:', error);
    return res.status(500).send('Внутрішня помилка сервера');
  }
});


//==========================================================================
module.exports = router;
