import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppBar, Container, Grid, Toolbar } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useTheme } from '@mui/system';
import PageFooter from './footer';
import H2yoLogo from '../logos/h2yo';
import FonteVivaLogo from '../logos/fonteviva';

type Props = {
  children: JSX.Element,
  includeBanner?: boolean
}

export default function PublicPage ({ children, includeBanner }: Props) {

  if (includeBanner === undefined) {
    includeBanner = true;
  }

  const theme = useTheme();

  return <>
    <Box sx={{ height: '100vh', display: 'flex', flexFlow: 'column' }}>
      <header style={{ backgroundColor: theme.palette.primary.dark, height: '80px' }}>
        <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.dark }}>
          <Toolbar disableGutters>
            <Box sx={{ display: 'flex', height: '17px', padding: theme.spacing(0, 4, 0, 7) }}>
              <div style={{ borderRight: '1px solid #ffffff', padding: theme.spacing(0, 1, 0, 1) }}><H2yoLogo width={67} height={17} /></div>
              <div style={{ padding: theme.spacing(0, 1, 0, 1) }}><FonteVivaLogo /></div>
            </Box>
            {/*<img src={'/h2yo_logo.webp'} className="App-logo" alt="logo" />
    <Typography variant="h4" gutterBottom component="div" align="center">
      CUSTOMER PORTAL
    </Typography>*/}
          </Toolbar>
        </AppBar>
      </header>
      <Grid
        container
        sx={{ flexGrow: 1, height: '100%' }}
      >
        <Grid item md={includeBanner ? 6 : 12} xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: theme.spacing(6) }}>{children}</Box>
        </Grid>
        {includeBanner ? <Grid item md={6} xs={12}>
          <div style={{ 
            backgroundImage: 'url("/banner.webp")', 
            backgroundSize: 'cover',
            width: '100%', 
            height: '100%' 
          }} />
        </Grid> : null}
      </Grid>
      <PageFooter />
    </Box>
  </>
  ;
}