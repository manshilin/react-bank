// front/src/page/recivePage/index.js
import React, { useState } from 'react';
function RecivePage() {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleReplenishBalance = () => {
    // Implement your logic to send a request, create a new transaction, and notification
    // You can use fetch or any other library for making API requests

    // Example fetch request
    fetch('/api/replenish-balance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        paymentMethod,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response, create a new transaction, and notification
        console.log('Transaction created:', data.transaction);
        console.log('Notification created:', data.notification);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Replenish Balance</h2>
      <label>
        Amount:
        <input type="number" value={amount} onChange={handleAmountChange} />
      </label>
      <br />
      <label>
        Payment Method:
        <input type="text" value={paymentMethod} onChange={handlePaymentMethodChange} />
      </label>
      <br />
      <button onClick={handleReplenishBalance}>Replenish Balance</button>
    </div>
  );
}

export default RecivePage;
