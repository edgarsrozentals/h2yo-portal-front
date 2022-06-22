import { Box, Container, Paper, Theme, Typography, useTheme } from '@mui/material';
import React from 'react';
import { CartrigeType, ICartrigesState } from '../../features/cartriges/cartrigesSlice';
import PageHeader from '../common/page/pageHeader';

type ComponentProps = {
    cartriges: Array<CartrigeType>
}

const renderCartrige = (cartridge: CartrigeType, theme: Theme) => {

  return <Paper elevation={2} sx={{ borderRadius: 4, padding: theme.spacing(2), margin: theme.spacing(1), width: 180, backgroundColor: cartridge.color }}>
    <Typography sx={{ fontSize: '0.9em' }}><strong>{cartridge.name}</strong></Typography>
    <Typography sx={{ fontSize: '0.9em' }} color={theme.palette.common.white}>{cartridge.contents}</Typography>
    <Typography variant="body1" sx={{ fontSize: '0.9em', marginTop: theme.spacing(1) }}>Price</Typography>
    <Typography sx={{ fontSize: '0.8em' }} variant="body2">{cartridge.priceCart} Є / per cart.</Typography>
    <Typography sx={{ fontSize: '0.8em' }} variant="body2">{cartridge.priceShot} Є / per shot.</Typography>
    <Typography variant="body1" sx={{ fontSize: '0.9em', marginTop: theme.spacing(1) }} color={theme.palette.common.white}>
      <a href={cartridge.url} target="_blank" style={{ textDecoration: 'none', color: theme.palette.common.white }} rel="noreferrer">LEARN MORE</a>
    </Typography>
  </Paper>;
};


export default function Cartriges ({ cartriges }: ComponentProps) {
    
  const theme = useTheme();

  return <Container>
    <PageHeader 
      title="Cartridges" 
      subTitle="Only the best flavors & vitamins for your workplace. Explore the various combinations."
    />
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {cartriges.map((x: CartrigeType)=>renderCartrige(x, theme))}
    </Box>
    <Box sx={{ borderBottom: '1px solid black', marginTop: theme.spacing(6) }}><Typography variant="h6" component="div">Ingridients</Typography></Box>
    <Typography variant="body2" component="div">All natural ingredients without artificial colorents or added sugar.</Typography>
    <Box sx={{ borderBottom: '1px solid black', marginTop: theme.spacing(6) }}><Typography variant="h6" component="div">Automatic re-supply</Typography></Box>
    <Typography sx={{ marginBottom: theme.spacing(6) }} variant="body2" component="div">We are re-supplying your cartridges roughtly every two weeks automatically based on your consumtion.</Typography>
  </Container>
  ;
}