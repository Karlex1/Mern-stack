import { useEffect, useState } from 'react'

function App() {

  // state for form data.
  const [form, setForm] = useState(
    {
      amount: '',
      description: '',
      date: '',
    }
  );

  const [transactions, setTranactions] = useState(
   []
  );
  //handleInput to collect data from input tag
  const handleInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

useEffect(()=>{
fetchTransaction();
},[])

const fetchTransaction= async ()=>{
const res=await fetch('http://localhost:4000/transaction'
);
const {data} =await res.json();
setTranactions(data);


}

  //HandleSubmit to submit form.
  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch(
      "http://localhost:4000/transaction", {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
      },
    }
    
    );
  
  }

  return (
    <div className="App" >

      <form onSubmit={handleSubmit}>
<br/>
        <input
          type='number'
          name='amount'
          onChange={handleInput}
          value={form.amount}
          placeholder='Enter transaction amount'
        />
        <br /><br />
        <input
          name='description'
          onChange={handleInput}
          value={form.description}
          placeholder='description'
          type='text' />
        <br /><br />
        <input
          name='date'
          placeholder='date'
          type='date'
          onChange={handleInput}
          value={form.date} />
        <br /><br />
        <button type='submit' >Submit</button>
        <br />
      </form>
      <br /><br />
      <table>
        <thead>
          <th>Amount</th>
          <th>Description</th>
          <th>Date</th>
        </thead>
        <tbody>
       {transactions.map((e)=>(  
       <tr key={e._id}>
            <td>{e.amount}</td>
            <td>{e.description}</td>
            <td>{e.date}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
