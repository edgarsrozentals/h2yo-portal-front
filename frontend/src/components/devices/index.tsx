import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DeviceData } from '../../features/devices/devicesSlice';
import { Box } from '@mui/system';
import { Alert } from '@mui/material';

type DevicesComponentProps = {
    data: Array<DeviceData>,
    errorMessage?: string
}

const DataRow = ({ dataEntry }: { dataEntry: DeviceData }) => {

  return <TableRow
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    <TableCell component="th" scope="row">{dataEntry.id}</TableCell>
    <TableCell>{dataEntry.SN}</TableCell>
    <TableCell>{dataEntry.ownerID}</TableCell>
    <TableCell>{dataEntry.ownerName}</TableCell>
    <TableCell>{dataEntry.customerID}</TableCell>
    <TableCell>{dataEntry.customerName}</TableCell>
    <TableCell>{dataEntry.locationID}</TableCell>
    <TableCell>{dataEntry.locationName}</TableCell>
    <TableCell>{dataEntry.dateCreated}</TableCell>
    <TableCell>{dataEntry.status}</TableCell>
  </TableRow>;
};

export default function DevicesComponent ({ data, errorMessage }: DevicesComponentProps) {

  return <Box>
    {errorMessage ? <Box><Alert severity="error">{errorMessage}</Alert></Box> : null}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>SN</TableCell>
            <TableCell>Owner ID</TableCell>
            <TableCell>Owner Name</TableCell>
            <TableCell>Customer ID</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Location ID</TableCell>
            <TableCell>Location Name</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((x, i)=>(<DataRow key={i} dataEntry={x} />))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>;
}