import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CartridgeData } from './types';


type RenderAccumDataType = {
    data: CartridgeData
}

export default function RenderAccumData ({ data }: RenderAccumDataType) {

  return <TableRow
    key={data.cartridgeId}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    <TableCell component="th" scope="row">
      {data.cartridgeId}
    </TableCell>
    <TableCell>{data.days}</TableCell>
    <TableCell>
      {data.devices.map((x, i) => (
        <table key={i}>
          <tr><th>id</th><th>daysUsed</th>totalPumped<th />cartridgesUsed</tr>
          <tr><td>{x.id.substring(x.id.length-5, x.id.length)}</td><td>{x.daysUsed}</td><td>{x.totalPumped}</td><td>{x.cartridgesUsed}</td></tr>
        </table>
      ))}
    </TableCell>
    <TableCell>{data.avgDemand.toFixed(5)}</TableCell>
    <TableCell>{data.currentStock}</TableCell>
    <TableCell>{data.cartridgeCount.toFixed(5)}</TableCell>
  </TableRow>;
}