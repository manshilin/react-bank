// front/src/page/transactionPage/index.js
import React from 'react';
import { useParams } from 'react-router-dom';

function TransactionPage() {
  const { transactionId } = useParams();

  return (
    <div>
      <h2>Transaction Details</h2>
      <p>Transaction ID: {transactionId}</p>
      {/* Додайте інші деталі транзакції */}
    </div>
  );
}
export default TransactionPage;