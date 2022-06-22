import { LoadingButton } from '@mui/lab';
import { Container, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function RegisterStep1 (props: any) {

  const navigate = useNavigate();

  const theme = useTheme();

  const submitHandler = () => {

    navigate('/invite/step2/accept' + window.location.search);
  };
  
  return <Container
    maxWidth="sm">
    <Typography sx={{ padding: theme.spacing(4, 0, 2, 0) }} variant="h4" component="div" align="left">
      Welcome
    </Typography>
    <Typography sx={{ padding: theme.spacing(1, 0) }} variant="body1" component="div" align="left">
    Thank you for choosing H2YO & welcome to your cartridge supply portal. Here you will be able to follow cartrige supply process.Please follow the registration to access the portal
    </Typography>
    <LoadingButton type="submit" size="small" loading={false} variant="contained" 
      onClick={submitHandler}
    >
      Start Registration
    </LoadingButton>
  </Container>;
}
