import { Box, Container, Typography } from '@mui/material';
import Location, { LocationPropps } from './location';
import React from 'react';
import { useTheme } from '@mui/system';

type LocationProps = {
  locations: Array<LocationPropps>
}

const Locations = ({ locations }: LocationProps) => {

  const theme = useTheme();

  return <Container maxWidth="md" sx={{ padding: theme.spacing(6) }}>
    <Typography variant="h4">Locations</Typography>
    <Typography variant="body1">See your delivery addresses & assigned local contact persons</Typography>
    <Box style={{ 
      display: 'flex', 
      justifyContent: 'center', 
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
            name={x.name}
            street={x.street}
            street2={x.street2}
            country={x.country}
            zip={x.zip}
            city={x.city}
          /></Box>)}</Box></Box>
  </Container>;
};

export default Locations;