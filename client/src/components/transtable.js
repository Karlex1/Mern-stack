import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function TTable({transaction}) {
    const transactions=transaction;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>Amount</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="center">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {transactions.map((e) => (
            <TableRow key={e._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell  component="th" scope="row" align='center'>{e.amount}</TableCell>
              <TableCell align='right'>{e.description}</TableCell>
              <TableCell align='center'>{e.date}</TableCell>
            </TableRow>))}
        
        </TableBody>
      </Table>
    </TableContainer>
  );
}