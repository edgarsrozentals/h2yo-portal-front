import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useTheme } from '@mui/system';
import PageFooter from './footer';

type Props = {
  children: JSX.Element,
  includeBanner?: boolean
}

export default function PublicPage ({ children, includeBanner }: Props = { children: (<></>), includeBanner: true }) {

  const theme = useTheme();

  return <>
    <Box sx={{ height: '100vh', display: 'flex', flexFlow: 'column' }}>
      <header style={{ backgroundColor: theme.palette.primary.dark, height: '80px' }}>
        <Box>
          {/*<img src={'/h2yo_logo.webp'} className="App-logo" alt="logo" />
    <Typography variant="h4" gutterBottom component="div" align="center">
      CUSTOMER PORTAL
    </Typography>*/}
        </Box>
      </header>
      <Grid
        container
        sx={{ flexGrow: 1, height: '100%' }}
      >
        <Grid md={includeBanner ? 6 : 12} xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: theme.spacing(6) }}>{children}</Box>
        </Grid>
        {includeBanner ? <Grid md={6} xs={12}>
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