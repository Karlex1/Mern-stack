import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Autocomplete, Button, Container } from '@mui/material';
import { Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';


function Foard({ fetchTransaction, editTransaction, setEditTransaction }) {
  const { categories } = useSelector((state) => state.auth.user);

  function getCategoriesnameById() {
    return (
      categories.find((category) => category._id === form.category_id) ?? ''
    )
  }
  //initial form
  const initialForm = {
    amount: '',
    description: '',
    date: new Date(),
    category_id: '',
  }
  // state for form data.
  const [form, setForm] = useState(
    initialForm
  );
// token stored in cookies
  const token = Cookies.get('user_token');

  // const categories = [
  //   { label: 'Travel' },
  //   { label: 'Shopping' },
  //   { label: 'Study' },
  //   { label: 'Given' },
  // ]
  //edit transaction
  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction)
    }
  }, [editTransaction])
//date handle function
  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }
  //input of form handle
  const handleInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }




  //HandleSubmit to submit form.
  async function handleSubmit(event) {
    event.preventDefault();
    editTransaction.amount === undefined ? create() : update();
  }
  //reload func
  function reload(res) {
    if (res.ok) {
      setForm(initialForm)
      fetchTransaction();
    }
  }
//func to create transaction : sending data to transAPI
  async function create() {
    const res = await fetch(
      'http://localhost:4000/transaction/', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
    );
    reload(res);
  }
  //func to update trans api
  async function update() {
    const res = await fetch(
      ` http://localhost:4000/transaction/${editTransaction._id}`, {
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
    )

    setEditTransaction({})
    reload(res);
  }
  const color = '#8AB4F1';
// front end
  return (
    <Container>
      <Container>
        <Card variant="outlined" sx={{
          marginTop: 6, marginBottom: 3, minWidth: '550'
        }} >
          <CardContent sx={{
            backgroundColor: 'rgb(240,255,252)'
          }} >
            <Typography variant="h6" fontFamily='cursive'
              sx={{ marginBottom: 1, marginLeft: 1 }}>  Add New Transaction </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{
              display: "flex", alignItems: 'center',
              justifyContent: 'center',
            }} >


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
                type='number'
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
              <Autocomplete
                value={getCategoriesnameById()}
                onChange={(event, newValue) => {
                  setForm({ ...form, category_id: newValue._id });
                }}
                // inputValue={form.category}
                // onInputChange={(event, newInputValue) => {
                //   setInputValue(newInputValue);
                // }}
                id="controllable-states-demo"
                options={categories}
                size="small"
                sx={{ marginRight: 5 }}
                renderInput={(params) => <TextField {...params} label="Category" />}
              />
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

            </Box >
          </CardContent>
        </Card>
      </Container>
    </Container>
  );
}
export default Foard;