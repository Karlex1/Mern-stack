import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import dayjs from "dayjs";

export default function TTable({ transaction, fetchTransaction,setEditTransaction }) {
  const transactions = transaction;

  function formatDate(date) {
    return dayjs(date).format('DD/MM/YYYY')
  }

  async function remove(_id) {
    if (!window.confirm('Are you sure')) return;
    const res = await fetch(`http://localhost:4000/transaction/${_id}`, { method: 'DELETE', });

    if (res.ok) {
      fetchTransaction();
      window.alert('DELETED Successfully')
    }
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>Amount</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align='center'>Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((e) => (
            <TableRow key={e._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row" align='center'>
                {e.amount}
              </TableCell>
              <TableCell align='center'>
                {e.description}
              </TableCell>
              <TableCell align='center'>{formatDate(e.date)}
              </TableCell>
              <TableCell align='center'>
                < IconButton sx={{ marginRight: 0.5 }} color='primary'  onClick={()=>setEditTransaction(e)}>
                  <EditIcon />
                </IconButton>
                <IconButton color='warning' onClick={() => {
                  remove(e._id)
                }}>
                  <DeleteIcon />
                </ IconButton>
              </TableCell>
            </TableRow>))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}