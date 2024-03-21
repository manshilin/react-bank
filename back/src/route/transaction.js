//back/src/route/transaction.js
const express = require('express');
const router = express.Router();
const path = require('path');
const { User } = require('../class/user');
const { Session } = require('../class/session');
const { Transaction, SendTransaction, ReceiveTransaction, TransactionManager } = require('../class/transactions');
const e = require('express');
//=====================================================
// Create a new instance of TransactionManager  
const transactionManager = new TransactionManager();

// ==========================================================
router.post('/send', async (req, res) => {
    try {
      const { recipient, amount } = req.body;
      console.log('Received new transaction creation request with sender, recipient, and amount:', recipient, amount);
  
      // Get the sender and recipient users
     
      const sessionToken = req.headers.authorization.split(' ')[1];
      console.log('sessionToken', sessionToken);
  
      const sender = Session.getUserFromToken(sessionToken);
      console.log('sender:', sender);
  
      const recipientUser = User.getByEmail(recipient);
      console.log('recipient:', recipientUser);
  
      // Validate the received data and the sender and recipient users
      if (!recipient || !amount || !sender || !recipientUser) {
        console.error('Invalid data received:', req.body);
        return res.status(400).send('Invalid data');
      }
  
      // Debit the sender's account and credit the recipient's account
      console.log('Before debit and credit:', sender.currentBalance, recipientUser.currentBalance);
      sender.debit(amount);
      recipientUser.credit(amount);
      console.log('After debit and credit:', sender.currentBalance, recipientUser.currentBalance);
  
      // Create a new SendTransaction
      const newTransaction = new SendTransaction(new Date(), amount, recipient);
      transactionManager.addTransaction(newTransaction);
  
      console.log('Transaction created and added successfully:', newTransaction);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error sending money:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  //=================================================================================
  router.get('/receive', async (req, res) => {
    try {
      console.log('Received transaction history retrieval request');
      const sessionToken = req.headers.authorization.split(' ')[1];
      console.log('sessionToken', sessionToken);
      const user = Session.getUserFromToken(sessionToken);
      console.log('user:', user);
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
  //===========================================================================
  router.get('/transaction/:transactionId', async (req, res) => {
    const { transactionId } = req.params;
    // Логіка пошуку транзакції за transactionId
    const transaction = await transactionManager.getTransactionById(transactionId);
    if (transaction) {
        res.json(transaction);
    } else {
        res.status(404).send('Транзакція не знайдена');
    }
});

    //===========================================================================
    module.exports = router;  