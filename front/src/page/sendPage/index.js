// Import React and necessary components/modules
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SendPage() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleSendMoney = async () => {
    // Assume there is a function sendMoneyToUser in your backend
    // This function should handle the transaction and notifications
    try {
      // Call backend API to send money and trigger notifications
      // Replace 'YOUR_BACKEND_API_ENDPOINT' with the actual endpoint
      const response = await fetch('YOUR_BACKEND_API_ENDPOINT/send-money', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, amount }),
      });

      if (response.ok) {
        // Money sent successfully, you may want to show a success message or redirect
        navigate('/balance');
      } else {
        // Handle error, show error message, etc.
        console.error('Failed to send money:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending money:', error);
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
