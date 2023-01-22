import React, { useState } from 'react';
import AppBar from './components/appBar.js';
import Foard from './components/formCard.js';
import TTable from './components/transtable.js';
import './components/Card.css'

function App() {
  const [transactions, setTranactions] = useState([]);
  return (
    <>
      <AppBar />
      <Foard se={setTranactions} />
      <TTable transaction={transactions}/>
    </>
  );
}

export default App;
