import { useState } from 'react';
import AppBar from './components/appBar.js';
import Foard from './components/formCard.js';
import TTable from './components/transtable.js';


function App() {

  const [transactions, setTranactions] = useState([]);

  return (
    <>
      <AppBar />
      <Foard se={setTranactions} />
      <br /><br />
      <TTable transaction={transactions}/>
    </>
  );
}

export default App;
