import { Box, Container, Paper, Theme, Typography, useTheme } from '@mui/material';
import React from 'react';
import { CartrigeType, ICartrigesState } from '../../features/cartriges/cartrigesSlice';

type ComponentProps = {
    cartriges: Array<CartrigeType>
}

const renderCartrige = (cartridge: CartrigeType, theme: Theme) => {

  return <Paper elevation={1} sx={{ margin: theme.spacing(1), width: 180, fontSize: '0.9em' }}>
    <Typography>{cartridge.name}</Typography>
    <Typography>{cartridge.contents}</Typography>
    <Typography>{cartridge.priceCart} Є / per cart.</Typography>
    <Typography>{cartridge.priceShot} Є / per shot.</Typography>
  </Paper>;
};


export default function Cartriges ({ cartriges }: ComponentProps) {
    
  const theme = useTheme();

  return <Container maxWidth="md">
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {cartriges.map((x: CartrigeType)=>renderCartrige(x, theme))}
    </Box>
  </Container>
  ;
}