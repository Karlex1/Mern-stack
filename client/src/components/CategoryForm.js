import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Autocomplete, Button, Container } from '@mui/material';
import { Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/auth.js';

//initial form
const initialForm = {
  label: '',
  icon: '',
}
const icons = ['user'];
function CategoryForm({ editCategory }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const token = Cookies.get('user_token');
  const [form, setForm] = useState(initialForm);
  useEffect(() => {
    if (editCategory._id !== undefined) {
      setForm(editCategory)
    }
  }, [editCategory])

  function getCategoriesnameById() {
    return (
      user.categories.find((category) => category._id === form.category_id) ?? ''
    )
  }
  // state for form data.
  // token stored in cookies

  //date handle function

  //input of form handle
  const handleInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  //HandleSubmit to submit form.
  async function handleSubmit(event) {
    event.preventDefault();
    editCategory._id === undefined ? create() : update();
  }
  //reload func
  function reload(res, _user) {
    if (res.ok) {
      dispatch(setUser({ user: _user }));
      setForm(initialForm)

    }
  }
  //func to create transaction : sending data to transAPI
  async function create() {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/category`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
    );
    const _user = {
      ...user,
      categories: [...user.categories, { ...form }],
    };
    reload(res, _user);
  }
  //func to update trans api
  async function update() {
    const res = await fetch(
      ` ${ process.env.REACT_APP_API_URL } /category/${editCategory._id}`, {
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
    );
    const _user = {
      ...user, categories: user.categories.map((cat) =>
        cat._id === editCategory._id ? form : cat
      )
    }
    reload(res, _user);
  }


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
              sx={{ marginBottom: 1, marginLeft: 1 }}>  Add New Category </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{
              display: "flex", alignItems: 'center',
              justifyContent: 'center',
            }} >


              <TextField
                name='label'
                onChange={handleInput}
                value={form.label}
                label="label"
                id="filled-size-small"
                placeholder='Enter Category'
                variant="outlined"
                size="small"
                sx={{ marginLeft: 5, marginRight: 5 }}
                type='text'
              />
              <Autocomplete
                value={getCategoriesnameById()}
                onChange={(event, newValue) => {
                  setForm({ ...form, icon: newValue });
                }}
                // inputValue={form.category}
                // onInputChange={(event, newInputValue) => {
                //   setInputValue(newInputValue);
                // }}
                id="icons"
                options={icons}
                size="small"
                sx={{ marginRight: 5 }}
                renderInput={(params) => <TextField {...params} label="Icon" />}
              />
              {editCategory._id !== undefined ? <Button type='submit'
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
export default CategoryForm;