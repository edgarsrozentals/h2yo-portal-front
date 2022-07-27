import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DeviceData } from '../../features/devices/devicesSlice';
import { Box } from '@mui/system';
import { Alert, Theme, Typography } from '@mui/material';
import PortalTable from '../common/table/portalTable';
import { WideButton } from '../common/button';

type DevicesComponentProps = {
    data: Array<DeviceData>,
    errorMessage?: string,
    onReload: () => void,
    deviceRefresh: boolean
}

export default function DevicesComponent ({ data, deviceRefresh, errorMessage, onReload }: DevicesComponentProps) {


  const [onlyActive, setOnlyActive] = useState(false);

  if (onlyActive) {
    data = data.filter(x=>(x.status === 'Active'));
  }

  return <Box>
    <Box sx={{ padding: (theme)=>theme.spacing(2, 2) }}>
      <Typography variant="h4">Manage Devices</Typography>
      <Typography variant="body1">All H2YO Devices</Typography>
    </Box>
    {errorMessage ? <Box><Alert severity="error">{errorMessage}</Alert></Box> : null}
    <Box sx={{ padding: (theme)=>theme.spacing(2, 2), display: 'flex' }}>
      <WideButton sx={{ margin: (theme: Theme)=>theme.spacing(2) }} disabled={deviceRefresh} onClick={onReload}>Refresh</WideButton>
      <WideButton 
        variant={onlyActive ? 'contained':'outlined'}
        sx={{ margin: (theme: Theme)=>theme.spacing(2) }} 
        onClick={()=>setOnlyActive(!onlyActive)}>Only Active</WideButton>
    </Box>
    <PortalTable 
      headCells={[
        { 
          disablePadding: false,
          id: 'id',
          label: 'Id',
          numeric: false  
        },
        { 
          disablePadding: false,
          id: 'id',
          label: 'SN',
          numeric: false  
        },
        { 
          disablePadding: false,
          id: 'name',
          label: 'Name',
          numeric: false  
        },
        { 
          disablePadding: false,
          id: 'ownerId',
          label: 'Owner ID',
          numeric: true  
        },
        { 
          disablePadding: false,
          id: 'ownerName',
          label: 'Owner Name',
          numeric: false  
        },
        { 
          disablePadding: false,
          id: 'customerId',
          label: 'Customer ID',
          numeric: true  
        },
        { 
          disablePadding: false,
          id: 'customerName',
          label: 'Customer Name',
          numeric: false  
        },
        { 
          disablePadding: false,
          id: 'locationId',
          label: 'Location ID',
          numeric: true  
        },
        { 
          disablePadding: false,
          id: 'locationName',
          label: 'Location Name',
          numeric: false  
        },
        { 
          disablePadding: false,
          id: 'dateCreated',
          label: 'Date Created',
          numeric: false  
        },
        { 
          disablePadding: false,
          id: 'status',
          label: 'Status',
          numeric: false  
        }
      ]}
      data={data}
    />
  </Box>;
}