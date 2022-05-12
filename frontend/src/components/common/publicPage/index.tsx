import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = {
  children: JSX.Element
}

export default function PublicPage ({ children }: Props) {
  return <header className="App-header">
    <img src={'/h2yo_logo.webp'} className="App-logo" alt="logo" />
    <Typography variant="h2" gutterBottom component="div" align="center">
      CUSTOMER PORTAL
    </Typography>
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >{children}</Box>
  </header>;
}