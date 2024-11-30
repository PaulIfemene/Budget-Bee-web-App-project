import React from 'react';
import TransactionImg from '../../assets/transactions.svg';
import './NoTransactions.css';

const NoTransactions = () => {
  return (
    <div className='no-transactions'>
      <img src={TransactionImg} alt='TransactionImg' />
      <p> You Have No Transactions Currently</p>
    </div>
  );
};

export default NoTransactions;
