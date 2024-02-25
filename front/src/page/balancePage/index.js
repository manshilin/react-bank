import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';

// Replace the following with the logic to fetch the current balance
const currentBalance = 1000; // Replace with actual logic

// BalancePage component
function BalancePage() {
  const navigate = useNavigate(); // виправлено тут
  return (
    <div>
      <h1>Balance: {currentBalance}</h1>
      <button onClick={() => navigate('/receive')}>Receive</button> {/* виправлено тут */}
      <button onClick={() => navigate('/send')}>Send</button> {/* виправлено тут */}
      <h2>Transaction History</h2>
      {/* Replace the following with the logic to fetch and display transaction history */}
      <ul>
        <li>Transaction 1</li>
        <li>Transaction 2</li>
        {/* ... other transactions */}
      </ul>
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <button onClick={() => navigate('/notifications')}>
          <FiBell size={24} />
        </button>
      </div>
    </div>
  );
}

export default BalancePage;
