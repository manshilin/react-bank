// front/src/page/sendPage/index.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SendPage() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();
  const sendMoney = async () => {
    try {
      const recipient = email;
      const amountToSend = parseInt(amount);
  
      // Validate the data to be sent
      if (!recipient || !amountToSend) {
        console.error('Invalid data:', { recipient, amount: amountToSend });
        return;
      }
  
      console.log('Sending money with recipient and amount:', recipient, amountToSend);
  
      // Get the session token from localStorage
      const session = JSON.parse(localStorage.getItem('sessionAuth'));
  
      const response = await fetch('http://localhost:4000/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.token}` // Use the session token
        },
        body: JSON.stringify({ recipient, amount: amountToSend }),
      });
  
      if (!response.ok) {
        console.error('Server response:', response); // Log the server response
        throw new Error('Failed to send money');
      }
  
      console.log('Money sent successfully');
      navigate('/balance');
    } catch (error) {
      console.error('Error sending money:', error); // Log the error
      alert('Failed to send money. Please try again.'); // Show an error message to the user
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
        <button type="button" onClick={sendMoney}>
          Send Money
        </button>
      </form>
    </div>
  );
}

export default SendPage;