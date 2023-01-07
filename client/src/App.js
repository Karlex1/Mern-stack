import { useState } from 'react'



function App() {
  // state for form data.
  const [form, setForm] = useState(
    {
      amount: '',
      desc: '',
      date: '',
    }
  );
  //handleInput to collect data from input tag
  const handleInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })

  }
  //HandleSubmit to submit form.
async function handleSubmit  (event)  {
    event.preventDefault();
  const res = await fetch(
    "http://localhost:4000/transaction",{
      method:'POST',
      body:form,
    }
   );
console.log(res);
  }

  return (
    <div className="App" >

      <form onSubmit={handleSubmit}>

        <input
          type='number'
          name='amount'
          onChange={handleInput}
          value={form.amount}
          placeholder='Enter transaction amount'
        />
<br/>
        <input
          name='desc'
          onChange={handleInput}
          value={form.desc}
          placeholder='description'
          type='text' />
<br/>
        <input
          name='date'
          placeholder='date'
          type='date'
          onChange={handleInput}
          value={form.date} />
<br/>
        <button type='submit' >Submit</button>
        <br/>
      </form>
    </div>
  );
}

export default App;
