import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alert, Container, Grid } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useTheme } from '@mui/system';

export default function PageFooter () {

  const theme = useTheme();

  return <footer>
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      flexDirection: 'column',
      backgroundColor: theme.palette.primary.dark, minHeight: '110px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography textAlign="center" variant="h6" color="common.white" maxWidth={440}>
          Essential vitamins & natural flavors with your daily workplace water
        </Typography>
      </Box>
    </Box>
  </footer>
  ;
}