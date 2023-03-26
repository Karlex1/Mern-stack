import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate as navigated } from 'react-router-dom';
import '../index.css'
import Cookies from 'js-cookie';

export default function appBar() {

  const navigate = navigated();

  function logout() {
    Cookies.remove("user_token");
    navigate("/login");
  }
  return (
    <Box sx={{ flexGrow: 1 }} className='appBarMargin'>
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6" component="div"
            sx={{ flexGrow: 1 }} >
            <Link to='/' className='appBar'>  MERNstack</Link>

          </Typography>
          <Link to='/login' className='appBar'> <Button color="inherit">Login</Button></Link>
          <Link to='/register' className='appBar'> <Button color="inherit">Register</Button></Link>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}