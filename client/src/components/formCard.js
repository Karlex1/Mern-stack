import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import './Card.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker} from '@mui/x-date-pickers';


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
  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }
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
    <Box  className='mlrb-9'>
      <Card variant="outlined"  >
        <CardContent
         >
          <Typography variant="h6" fontFamily='cursive'
            
         >
            Add New Transaction </Typography>
          <form onSubmit={handleSubmit} >
            <TextField
              
              name='amount'
              onChange={handleInput}
              value={form.amount}
              label="Amount"
              id="filled-size-small"
              placeholder='Enter Transaction Amount'
              variant="filled"
              size="small"
            />
            <TextField
              name='description'
              label="Description"
              id="filled-size-small"
              variant="filled"
              placeholder='Enter Description'
              size="small"
              value={form.description}
              onChange={handleInput}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              inputFormat="DD/MM/YYYY"
              value={form.date}
              onChange={handleDate}
              
              renderInput={(params) => (
                <TextField sx={{ marginRight: 5 }} size="small"  {...params} />
              )}
            />
          </LocalizationProvider>
            <Button type='submit'
              variant="contained"
              size='medium'
              
            >Submit</Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
export default Foard;