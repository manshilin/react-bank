// front/src/page/sendPage/index.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const sendMoney = async () => {
  try {
    const recipient = 'example@example.com';
    const amount = 100;

    // Simulate server response
    const response = await fetch('/api/send-money', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipient, amount }),
    });

    if (!response.ok) {
      throw new Error('Failed to send money');
    }

    // Update balance locally
    const updatedBalance = currentBalance - amount;
    setCurrentBalance(updatedBalance);

    // Fetch updated transaction history
    await fetchTransactionHistory();

    // Navigate to balance page with updated balance
    navigate('/balance', { state: { updatedBalance }});
  } catch (error) {
    console.error(error);
  }
};

function SendPage() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [balanceUpdated, setBalanceUpdated] = useState(false); // New state to track balance update
  const navigate = useNavigate();

  const handleSendMoney = async () => {
    const success = await sendMoney(email, amount);
    if (success) {
      setBalanceUpdated(true); // Update balance status
      navigate('/balance', { state: { updated: true } }); // Navigate to balance page with updated state
    } else {
      console.error('Failed to send money');
    }
  };

  return (
    <div>
      <h2>Send Money</h2>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button type="button" onClick={handleSendMoney}>
          Send Money
        </button>
      </form>
    </div>
  );
}

export default SendPage;
