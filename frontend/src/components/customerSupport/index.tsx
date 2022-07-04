import { Box, Container, Grid, Paper, Theme, Typography, useTheme } from '@mui/material';
import React from 'react';
import { CartrigeType, ICartrigesState } from '../../features/cartriges/cartrigesSlice';
import H2yoLogo from '../common/logos/h2yo';
import PageHeader from '../common/page/pageHeader';

export default function CustomerSupport () {
    
  const theme = useTheme();

  const entryTitleStyle = {
    marginBottom: 0,
  };

  const smallTitleStyle = {
    lineHeight: 0.4,
  };

  const textValueStyle = {
    fontWeight: 400,
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.dark
  };

  return <Container maxWidth="md">
    <PageHeader 
      title="Customer Support" 
      subTitle="Services provided in collaboration between Fonte Viva and H2YO"
    />
    <Box>
      <Box sx={{ borderBottom: '1px solid', borderTop: '1px solid', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid sx={{ maxWidth: 640, padding: theme.spacing(4, 0) }} container>
          <Grid item md={5} xs={12}>
            <img src="/support_fonteviva.png" style={{ width: 200, height: 'auto', marginBottom: theme.spacing(4) }} />
            <Typography sx={smallTitleStyle} variant="body2">phone</Typography>
            <Typography sx={textValueStyle} variant="h6">808 290 000</Typography>
            <Typography sx={smallTitleStyle} variant="body2">email</Typography>
            <Typography sx={textValueStyle} variant="h6">fonteviva@fonteviva.pt</Typography>
            <Typography sx={smallTitleStyle} variant="body2">web</Typography>
            <Typography sx={textValueStyle} variant="h6">www.fonteviva.pt</Typography>
          </Grid>
          <Grid md={7} xs={12} item sx={{
            backgroundImage: 'url("/support_devices.png")', 
            backgroundSize: 'cover',
            padding: theme.spacing(4)
          }}>
            <Typography color={theme.palette.common.white} variant="h6">Device</Typography>
            <Typography color={theme.palette.common.white} component="div" variant="body1">Contact for questions regarding devices
              <ul>
                <li>device management</li>
                <li>order new devices</li>
                <li>device technical problems</li>
              </ul>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ borderBottom: '1px solid', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid container sx={{ maxWidth: 640, padding: theme.spacing(4, 0), margin: theme.spacing(2, 0, 12, 0) }}>
          <Grid item md={5} xs={12}>
            <Box sx={{ width: 200, height: 'auto', marginBottom: theme.spacing(4) }}><H2yoLogo width={134} height={34} /></Box>
            <Typography sx={smallTitleStyle} variant="body2">phone</Typography>
            <Typography sx={textValueStyle} variant="h6">+371 23454664</Typography>
            <Typography sx={smallTitleStyle} variant="body2">email</Typography>
            <Typography sx={textValueStyle} variant="h6">info@h2yo.co</Typography>
            <Typography sx={smallTitleStyle} variant="body2">web</Typography>
            <Typography sx={textValueStyle} variant="h6">www.h2yo.co</Typography>
          </Grid>
          <Grid item md={7} xs={12} sx={{
            backgroundImage: 'url("/support_cartridges.png")', 
            backgroundSize: 'cover',
            padding: theme.spacing(4)
          }}>
            <Typography color={theme.palette.common.white} variant="h6">Device</Typography>
            <Typography color={theme.palette.common.white} variant="body1">Contact for questions regarding cartridges:
              <ul>
                <li>cartridge order & delivery</li>
                <li>cartridge catalog</li>
                <li>cartridge technical problems</li>
              </ul>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
  ;
}