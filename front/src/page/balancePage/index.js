// front/src/page/balancePage/index.js
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentTime } from '../../util/time'; 
import './index.css';

function BalancePage() {
  const [currentBalance, setCurrentBalance] = useState(() => {
    const storedBalance = localStorage.getItem('currentBalance'); // Змінено на localStorage
    return storedBalance ? parseInt(storedBalance) : 999;
  });
  
  const [time, setTime] = useState(getCurrentTime());
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTime());
    }, 60000);

    fetchTransactionHistory();
    fetchCurrentBalance();

    return () => clearInterval(timer);
  }, []);

  const fetchCurrentBalance = async () => {
    try {
      const session = JSON.parse(localStorage.getItem('sessionAuth')); // Отримуємо сесію з localStorage
      console.log('Fetching current balance with session token:', session.token); // Додано виведення в консоль
      const response = await fetch('http://localhost:4000/balance', {
        headers: {
          'Authorization': `Bearer ${session.token}` // Додаємо токен сесії в заголовки запиту
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch current balance');
      }
      const data = await response.json();
      setCurrentBalance(data.balance);
      console.log('Current balance fetched:', data.currentBalance); // Додано виведення в консоль
    } catch (error) {
      console.error(error);
    }
  };
  

  const fetchTransactionHistory = async () => {
    try {
      const response = await fetch('http://localhost:4000/transactions');
      if (!response.ok) {
        throw new Error('Failed to fetch transaction history');
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMoney = async () => {
    try {
      const recipient = 'example@example.com';
      const amount = 100;

      const response = await fetch('/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipient, amount }),
      });

      if (!response.ok) {
        throw new Error('Failed to send money');
      }

      const updatedBalance = currentBalance - amount;
      sessionStorage.setItem('currentBalance', updatedBalance.toString());
      setCurrentBalance(updatedBalance);

      fetchTransactionHistory();

      navigate('/balance', { state: { updatedBalance }});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <div className="header">
        <div>
          <div className="time">{time}</div>
          <div className="netwifibat"></div>
        </div>
        
        <div className="header-settings">
          <div className="settings" onClick={() => navigate('/settings')}></div>
          <div className="main-wallet">Main Wallet</div>
          <div className="notifications" onClick={() => navigate('/notifications')}></div>
        </div>
        
        <div className="balance">$ {currentBalance}</div>
        
        <div className="buttons">
          <button onClick={() => navigate('/receive')}>Receive</button>
          <button onClick={sendMoney}>Send</button>
        </div>
      </div>
      
      <div className="transaction-history">
        <h2>Transaction History</h2>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>{transaction.description}</li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}

export default BalancePage;
