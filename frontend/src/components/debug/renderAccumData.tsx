import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CartridgeData } from './types';
import { Box } from '@mui/system';


type RenderAccumDataType = {
    data: CartridgeData,
    rowIndx: Number
}

const formatFromTimestamp = (timestamp: string) => {

  const d = new Date(timestamp),
    dformat = [d.getMonth()+1,
      d.getDate(),
      d.getFullYear()].join('-')+' '+
              [d.getHours() < 10 ? '0'+d.getHours() : d.getHours(),
                d.getMinutes() < 10 ? '0'+d.getMinutes() : d.getMinutes(),
                d.getSeconds() < 10 ? '0'+d.getSeconds() : d.getSeconds(),
              ].join(':');

  return dformat;
};

export default function RenderAccumData ({ data, rowIndx }: RenderAccumDataType) {

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
          <tr><th>id</th><th>daysUsed</th><th>totalPumped</th><th>cartridgesUsed</th></tr>
          <tr><td>{x.id.substring(x.id.length-5, x.id.length)}</td><td>{x.daysUsed}</td><td>{x.totalPumped.toFixed(5)}</td><td>{x.cartridgesUsed}</td></tr>
        </table>
      ))}
    </TableCell>
    <TableCell>{data.avgDemand.toFixed(5)}</TableCell>
    <TableCell>{data.currentStock}</TableCell>
    <TableCell><Box sx={{ display: 'flex' }}>{data.ordersInProgress.map((x, i)=>{

      return (<Box key={i} sx={{ fontSize: '0.9em', width: '80px' }}><Box>{rowIndx === 0 ? formatFromTimestamp(x.createdTime) : null}</Box><Box><strong>count:</strong> {x.cartridgeCount}</Box></Box>);

    })}</Box></TableCell>
    <TableCell>{data.cartridgeCount.toFixed(5)}</TableCell>
  </TableRow>;
}