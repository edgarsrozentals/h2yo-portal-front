import { Alert, Box, Container, Typography } from '@mui/material';
import Location, { LocationPropps, LocationFormType } from './location';
import React from 'react';
import { useTheme } from '@mui/system';
import { SelectType } from '../common/types';

type LocationProps = {
  error: string,
  locations: Array<LocationPropps>,
  onChangeDevice: (id: number, data: Array<SelectType>) => Promise<void>,
  onChangeResponsible: (id: number, data: Array<SelectType>) => Promise<void>,
  onChangeLocation: (id: number, data: LocationFormType) => Promise<void>,
  allDevices: Array<SelectType>,
  allResponsibles: Array<SelectType> 
}

const Locations = ({ error, allDevices, allResponsibles, locations, onChangeDevice, onChangeResponsible, onChangeLocation }: LocationProps) => {

  const theme = useTheme();

  return <Container sx={{ padding: theme.spacing(6) }}>
    <Typography variant="h4">Locations</Typography>
    <Typography variant="body1">See your delivery addresses & assigned local contact persons</Typography>
    {error ? <Alert severity="error">{error}</Alert> : null}
    <Box style={{
      display: 'flex', 
      justifyContent: 'left', 
    }}>
      
      <Box style={{
        display: 'flex', 
        padding: theme.spacing(4,0,0,0),
        justifyContent: 'left', 
        flexWrap: 'wrap', 
        alignItems: 'strech',
        gap: '10px',
        rowGap: '10px',
        columnGap: '20px'
      }}>{locations.map((x: LocationPropps, i: number) => <Box
          key={i} 
        >
          <Location
            onLocationSave={onChangeLocation}
            id={x.id}
            name={x.name}
            street={x.street}
            street2={x.street2}
            country={x.country}
            zip={x.zip}
            city={x.city}
            responsibles={x.responsibles}
            allResponsibles={allResponsibles}
            allDevices={allDevices}
            devices={x.devices}
            onChangeDevice={onChangeDevice}
            onChangeResponsible={onChangeResponsible}
          /></Box>)}</Box></Box>
  </Container>;
};

export default Locations;