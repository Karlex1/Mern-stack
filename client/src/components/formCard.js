import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import './Card.css';

function Foard({ se }) {
  const setTranactions = se;
  const initialForm = {
    amount: '',
    description: '',
    date: '',
  }
  // state for form data.
  const [form, setForm] = useState(
    initialForm
  );

  const handleInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    fetchTransaction();
  })

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
    <Box sx={{  marginTop: '10vw' }} >
      <Card variant="outlined" >
        <CardContent 
        style={{backgroundColor: 'rgb(222,186,206)' }}>
        <form onSubmit={handleSubmit} className='mlc'>
          <TextField
          className='hw2'
            name='amount'
            onChange={handleInput}
            value={form.amount}
            label="Amount"
            id="filled-size-small"
            placeholder='Enter Transaction Amount'
            variant="filled"
            size="small"
            sx={{ marginRight: '2vw' }}
            style={{marginTop:'0.5em'}}
          />
          <TextField
            name='description'
            label="Description"
            id="filled-size-small"
            variant="filled"
            size="small"
            className='hw2'
            value={form.description}
            onChange={handleInput}
            sx={{ marginRight: '2vw' }}
            style={{marginTop:'0.5em'}}
          />
          <TextField
          className='hw2'
            name='date'
            id="datetime-local"
            type="datetime-local"
            size='small'
            variant='filled'
            value={form.date}
            onChange={handleInput}
            sx={{ marginRight: '2vw' }}
            style={{marginTop:'0.5em'}}
          />
          <Button type='submit'
          className='medi'
          variant="contained"
          size='medium'
          sx={{marginTop:'1em'}}
          >Submit</Button>
        </form>
      </CardContent>
      </Card>
    </Box>
  );
}
export default Foard;