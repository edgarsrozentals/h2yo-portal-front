import React from 'react';
import { Box } from '@mui/material';

export default function PublicPage ({ children }) {
  return <header className="App-header">
    <img src={'/h2yo_logo.webp'} className="App-logo" alt="logo" />
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >{children}</Box>
  </header>;
}