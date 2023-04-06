import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { setUser } from '../store/auth';
import CategoryForm from '../components/CategoryForm';

export default function Category() {
  const user = useSelector((state) => state.auth.user);
  const token = Cookies.get("user_token");
  const dispatch = useDispatch();
  const [editCategory, setEditCategory] = React.useState({});
  function setEdit(category) {
setEditCategory(category)
  }

  async function remove(id) {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const _user = {
        ...user,
        categories: user.categories.filter((cat) => cat._id !== id),
      };
      dispatch(setUser({ user: _user }));
    }
  }




  return (
    <Container>
      <CategoryForm editCategory={editCategory}  />
      <TableContainer
        component={Paper}
        sx={{ borderRadius: '15px', backgroundColor: 'rgb(240,255,252)', marginTop: 7 }} >
        <Typography
          variant="h6"
          fontFamily='cursive'
          sx={{ marginBottom: 1, marginLeft: 5, marginTop: 2 }}>
          Category List
        </Typography>
        <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table" >
          <TableHead>
            <TableRow>
              <TableCell align='center'>Label</TableCell>
              <TableCell align="center">Icon</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {user.categories.map((row) => (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                <TableCell component="th" scope="row" align='center' >
                  {row.label}
                </TableCell>
                <TableCell align='center'>
                  {row.icon}
                </TableCell>
                <TableCell align='center'>
                  < IconButton
                    sx={{ marginRight: 0.5 }} color='primary'
                    onClick={() => setEdit(row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color='warning'
                    component='label'
                    onClick={() => { remove(row._id) }}
                  >
                    <DeleteIcon />
                  </ IconButton>
                </TableCell>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}