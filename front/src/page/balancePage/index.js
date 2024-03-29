// front/src/page/balancePage/index.js
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTimeWifi from "../../component/headerTimeWifi";
import "./index.css";

function BalancePage() {
  const [currentBalance, setCurrentBalance] = useState(() => {
    const storedBalance = localStorage.getItem("currentBalance");
    return storedBalance ? parseInt(storedBalance) : 999;
  });
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactionHistory();
    fetchCurrentBalance();
  }, []);

  const fetchCurrentBalance = async () => {
    try {
      const session = JSON.parse(localStorage.getItem("sessionAuth")); //Отримуємо сесію з localStorage
      const response = await fetch("http://localhost:4000/balance", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch current balance");
      }

      const data = await response.json();
      console.log("setCurrentBalance", data.balance);
      setCurrentBalance(data.balance);

      // Зберігаємо поточний баланс в localStorage
      localStorage.setItem("currentBalance", data.balance);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTransactionHistory = async () => {
    try {
      // Get the session token from localStorage
      const session = JSON.parse(localStorage.getItem("sessionAuth"));

      const response = await fetch("http://localhost:4000/transactions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`, // Use the session token
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transaction history");
      }

      const data = await response.json();
      console.log("fetchTransactionHistory", data);

      if (Array.isArray(data.transactions)) {
        setTransactions(data.transactions);
      } else {
        console.error("Data is not an array:", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      
      <div className="header">
        
      <HeaderTimeWifi color="white" />
        <div className="header-settings">
          <div className="settings" onClick={() => navigate("/settings")}></div>
          <div className="main-wallet">Main Wallet</div>
          <div
            className="notifications"
            onClick={() => navigate("/notifications")}
          ></div>
        </div>
        <div className="balance">$ {currentBalance}</div>
        <div className="buttons">
          <button onClick={() => navigate("/receive")}>Receive</button>
          <button onClick={() => navigate("/send")}>Send</button>
        </div>
      </div>
      <div className="transaction-history">
        <h2>Transaction History</h2>
        {transactions.length > 0 ? (
  <>
    <ul>
      {transactions.map((transaction, index) => (
        <li key={index} className="transaction-item">
          <div className="user-icon"> </div>
          <div className="transaction-info">
            <span>{transaction.recipientEmail}</span>
            <span>{new Date(transaction.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Sending</span>
          </div>
          <span className="transaction-amount">-${transaction.amount}</span>
        </li>
      ))}
    </ul>
    <p>Транзакцій немає</p>
  </>
) : (
  <p>Транзакцій немає</p>
)}

      </div>
    </Fragment>
  );
} 

export default BalancePage;
