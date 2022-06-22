import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alert, Container, Grid } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useTheme } from '@mui/system';
import PageFooter from '../publicPage/footer';
import AppBarComp from '../../appBar';

export default function Page ({ children }: {children: JSX.Element}) {

  const theme = useTheme();

  return <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh'
  }}><Box><AppBarComp />{children}</Box><PageFooter /></Box>;
}