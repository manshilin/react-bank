
const express = require('express');
const router = express.Router();
const path = require('path');
const { User } = require('../class/user');
const { Session } = require('../class/session');
const { Confirm } = require('../class/confirm');
const { Transaction, SendTransaction, ReceiveTransaction, TransactionManager } = require('../class/transactions');
const e = require('express');

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

  //==========================================================================
  router.get('/notifications', function (req, res) {
    try {
      const sessionToken = req.headers.authorization.split(' ')[1];
      console.log('Received notifications retrieval request with session token:', sessionToken);
  
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
  
      const notifications = user.notifications;
      console.log('Sending notifications',notifications);
  
      return res.status(200).json({
        message: 'Успішно отримано сповіщення користувача',
        notifications,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Помилка отримання сповіщень користувача',
      });
    }
  });
  //==========================================================================
  router.post('/settings', function (req, res) {
    try {
      const sessionToken = req.headers.authorization.split(' ')[1];
      console.log('Received settings update request with session token:', sessionToken);
  
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
  
      const { password, email } = req.body;
      if (password) {
        user.password = password;
      }
      if (email) {
        user.email = email;
      }
  
      console.log('Sending updated user',user);
  
      return res.status(200).json({
        message: 'Успішно оновлено налаштування користувача',
        user,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Помилка оновлення налаштувань користувача',
      });
    }
  });
  
  
  //==========================================================================
  module.exports = router;