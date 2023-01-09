import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { Input } from '@mui/material';


function App() {
  const initialForm = {
    amount: '',
    description: '',
    date: '',
  }
  // state for form data.
  const [form, setForm] = useState(
    initialForm
  );

  const [transactions, setTranactions] = useState([]);

  //handleInput to collect data from input tag
  const handleInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    fetchTransaction();
  }, [])

  const fetchTransaction = async () => {
    const res = await fetch('http://localhost:4000/transaction'
    );
    const { data } = await res.json();
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
    )
    if (res.ok) {
      setForm(initialForm)
      fetchTransaction();
    }
  }

  return (
    <div className="App" >
      <div style={{ width: '90vw', border: '1px solid ', marginLeft: '5vw', marginTop: '30px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', margin: '30px', justifyContent: 'center', flexDirection: 'row' }}>

          <Input
            type='number'
            name='amount'
            onChange={handleInput}
            value={form.amount}
            placeholder='Enter transaction amount'
            style={{ marginRight: '8px' }}
          />

          <Input
            style={{ marginRight: '8px' }}
            name='description'
            onChange={handleInput}
            value={form.description}
            placeholder='Description'
            type='text' />

          <Input
            name='date'
            placeholder='date'
            type='date'
            onChange={handleInput}
            value={form.date}
            style={{ marginRight: '8px' }} />

          <Button type='submit' variant='outlined'>Submit</Button>

        </form></div>
      <br /><br />
      <table>
        <thead>
          <th>Amount</th>
          <th>Description</th>
          <th>Date</th>
        </thead>
        <tbody>
          {transactions.map((e) => (
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
