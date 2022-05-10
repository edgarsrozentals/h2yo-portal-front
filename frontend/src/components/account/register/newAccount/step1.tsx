import { LoadingButton } from '@mui/lab';
import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function RegisterStep1 (props: any) {

  const navigate = useNavigate();

  const submitHandler = () => {

    navigate('/invite/step2/accept' + window.location.search);
  };
  
  return <Container
    maxWidth="sm">
    <Typography variant="h4" component="div" align="left">
      Welcome
    </Typography>
    <Typography variant="body1" component="div" align="left">
    Thank you for choosing H2YO & welcome to your cartridge supply portal. Here you will be able to follow cartrige supply process.Please follow the registration to access the portal
    </Typography>
    <LoadingButton type="submit" size="medium" loading={false} variant="contained" 
      onClick={submitHandler}
    >
      Start Registration
    </LoadingButton>
  </Container>;
}
