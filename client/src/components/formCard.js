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
import { DesktopDatePicker } from '@mui/x-date-pickers';



function Foard({ fetchTransaction, editTransaction,setEditTransaction }) {

  const initialForm = {
    amount: '',
    description: '',
    date: new Date(),
  }
  // state for form data.
  const [form, setForm] = useState(
    initialForm
  );

  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction)
    }
  }, [editTransaction])

  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }
  const handleInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    fetchTransaction();
  })


  //HandleSubmit to submit form.
  async function handleSubmit(event) {
    event.preventDefault();

    const res = editTransaction.amount === undefined ? create() : update();


    if (res.ok) {
      setForm(initialForm)
      fetchTransaction();
    }
  }

  async function create() {
    const res = await fetch(
      "http://localhost:4000/transaction/", {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
      },
    }
    )
    setForm(initialForm);
    return res;
  }
  async function update() {
    const res = await fetch(                                  
      `http://localhost:4000/transaction/${editTransaction._id}`, {
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
      },
    }
    )
    setForm(initialForm);
setEditTransaction({})
    return res;
  }


  const color = '#8AB4F1'
  return (
    <Box className='mlrb-9' >
      <Card variant="outlined"  >
        <CardContent
        >
          <Typography variant="h6" fontFamily='cursive'
            sx={{ marginBottom: 2, marginLeft: 2 }}
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
              variant="outlined"
              size="small"
              sx={{ marginLeft: 5, marginRight: 5 }}
            />
            <TextField
              name='description'
              label="Description"
              id="filled-size-small"
              variant="outlined"
              placeholder='Enter Description'
              size="small"
              sx={{ marginRight: 5 }}
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
                  <TextField sx={{
                    marginRight: 5, svg: { color }
                  }} size="small" variant="outlined" {...params} />
                )}
              />
            </LocalizationProvider>
            {editTransaction.amount !== undefined ? <Button type='submit'
              variant="contained"
              size='medium'
            >Update</Button> : <Button type='submit'
              variant="contained"
              size='medium'
            >Submit</Button>}
            {/* <Button type='submit'
              variant="contained"
              size='medium'
            >Submit</Button> */}
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
export default Foard;