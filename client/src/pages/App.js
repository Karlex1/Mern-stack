import React, { useState } from 'react';
import AppBar from '../components/appBar.js';
import Foard from '../components/formCard.js';
import TTable from '../components/transtable.js';
import '../components/Card.css'

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});


  const fetchTransaction = async () => {
    const res = await fetch('http://localhost:4000/transaction'
    );
    const { data } = await res.json();
    setTransactions(data);
  }
  return (
    <>
      <AppBar />
      <Foard fetchTransaction={fetchTransaction}
        editTransaction={editTransaction} setEditTransaction={setEditTransaction} />
      <TTable transaction={transactions} fetchTransaction={fetchTransaction}
        setEditTransaction={setEditTransaction} />
    </>
  );
}

export default App;
