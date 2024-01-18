// Import React and necessary components/modules
import React from 'react';
import { Link } from 'react-router-dom';
import PrivateRoute from '../../component/privateRoute'


// Replace the following with the logic to fetch the current balance
const currentBalance = 1000; // Replace with actual logic

// BalancePage component
function BalancePage() {
  return (
    <div>
      <h1>Balance: {currentBalance}</h1>
      <Link to="/recive">
        <button>Receive</button>
      </Link>
      <Link to="/send">
        <button>Send</button>
      </Link>
      <h2>Transaction History</h2>
      {/* Replace the following with the logic to fetch and display transaction history */}
      <ul>
        <li>Transaction 1</li>
        <li>Transaction 2</li>
        {/* ... other transactions */}
      </ul>
    </div>
  );
}

export default BalancePage;
