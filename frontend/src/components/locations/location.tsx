import { Box, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import React from 'react';

export type LocationPropps = {
  name: string,
  street: string,
  street2: string,
  zip: string,
  city: string,
  country: string,
  devices?: any,
  allDevices?: any,
  contactsAssigned?: any,
}

const Location = ({ name, street, street2, zip, city, country, allDevices }: LocationPropps) => {

  const theme = useTheme();

  return <Card sx={{ width: '260px', height: '380px' }}>
    <CardContent sx={{ backgroundColor: theme.palette.primary.dark, padding: theme.spacing(1) }}>
      <Typography variant="h6" color="common.white">{name}</Typography>
    </CardContent>
    <CardContent sx={{ padding: theme.spacing(1), display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      alignContent: 'space-between',
      height: '314px'
    }}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div><Typography variant="body1">Address</Typography></div>
          <div><Typography variant="caption">EDIT</Typography></div>
        </Box>
        <Box>
          <Typography variant="body2">{street}</Typography>
          <Typography variant="body2">{street2}</Typography>
          <Typography variant="body2">{zip}</Typography>
          <Typography variant="body2">{city}</Typography>
          <Typography variant="body2">{country}</Typography>
        </Box>
      </Box>
      <Box sx={{ borderTop: '1px solid', borderColor: theme.palette.gray }}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Devices in this location</InputLabel>
          <Select
            size="small"
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={['Device #3', 'Device #1']}
            input={<OutlinedInput label="Devices in this location" />}
          >
            {['Device #3', 'Device #1'].map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Contacts assigned</InputLabel>
          <Select
            size="small"
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={['Raivis Studens']}
            input={<OutlinedInput label="Name" />}
          >
            {['Raivis Studens'].map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </CardContent>
  </Card>
  ;
};

export default Location;