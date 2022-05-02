import { Alert, Box, Button, FormControl, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

export interface IRegisterCompState {
  userEmail: string | undefined,
  userPassword: string | undefined,
  userFirstName: string | undefined,
  userLastName: string | undefined,
  company: string | undefined,
  legalAddress: string | undefined,
  VATNumber: string | undefined,
  locationStreet: string | undefined,
  locationBuilding: string | undefined,
  locationApt: string | undefined,
  locationCity: string | undefined,
  locationCountry: string | undefined,
  locationZIP: string | undefined,
}

export default function Register (
  { 
    onRegister,
    defaultProps,
    disabledProps,
    registerError,
    message,
    onLoginButton
  }: 
  { 
    onRegister: (data: IRegisterCompState) => Promise<void>, 
    onLoginButton: () => void, 
    registerError: string,
    message: string,
    defaultProps: IRegisterCompState,
    disabledProps: Array<string>
  }) {

  const [data, setData] = useState<IRegisterCompState>({ 
    userEmail: defaultProps?.userEmail ?? '', 
    userPassword: defaultProps?.userPassword ?? '',
    userFirstName: defaultProps?.userFirstName ?? '',
    userLastName: defaultProps?.userLastName ?? '',
    company: defaultProps?.company ?? '',
    legalAddress: defaultProps?.legalAddress ?? '',
    VATNumber: defaultProps?.VATNumber ?? '',
    locationStreet: defaultProps?.locationStreet ?? '',
    locationBuilding: defaultProps?.locationBuilding ?? '',
    locationApt: defaultProps?.locationApt ?? '',
    locationCity: defaultProps?.locationCity ?? '',
    locationCountry: defaultProps?.locationCountry ?? '',
    locationZIP: defaultProps?.locationZIP ?? '',
  });

  useEffect(() => {

    setData({ ...data, ...defaultProps });
  }, [defaultProps]);

  const [error, setError] = useState<string>('');

  const submitHandler = (event: any) => {
    
    event.preventDefault();

    if (data.userEmail === '') {
      setError('Please enter your email address!');
      return false;
    }

    if (data.userPassword === '') {
      setError('Please enter the password!');
      return false;
    }

    onRegister(data);
  };

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        
        submitHandler(event);
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  const errorText = error ?? registerError;

  return <>
    <Typography variant="h4" gutterBottom component="div" align="center">
      CUSTOMER PORTAL: Registration
    </Typography>
    <FormControl>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center">
        {errorText ? <Grid item>{errorText}</Grid> : null}
        {message !== '' ? 
          <><Alert severity="success">{message}</Alert> 
            <Button onClick={onLoginButton}>Login</Button>
          </>
          : 
          <>
            <Grid item>
              <TextField 
                size="small" 
                label="Email"
                variant="outlined" 
                disabled={disabledProps.includes('userEmail')}
                value={data.userEmail} 
                onChange={(ev)=>{setData({ ...data, ...{ userEmail: ev.target.value } });}}
              />
            </Grid>
            <Grid item>
              <TextField 
                size="small" 
                label="Password" 
                type="password" 
                variant="outlined" 
                value={ data.userPassword } 
                disabled={ disabledProps.includes('password') }
                onChange={(ev)=>{setData({ ...data, ...{ userPassword: ev.target.value } });}}
              />
            </Grid>
            <Grid item>
              <TextField 
                size="small" 
                label="First Name"
                variant="outlined" 
                disabled={disabledProps.includes('firstName')}
                value={data.userFirstName} 
                onChange={(ev)=>{setData({ ...data, ...{ userFirstName: ev.target.value } });}}
              />
            </Grid>
            <Grid item>
              <TextField 
                size="small" 
                label="Last Name"
                variant="outlined" 
                disabled={disabledProps.includes('lastName')}
                value={data.userLastName} 
                onChange={(ev)=>{setData({ ...data, ...{ userLastName: ev.target.value } });}}
              />
            </Grid>
            <Grid item>
              <TextField 
                size="small" 
                label="Company" 
                variant="outlined" 
                value={data.company} 
                disabled={disabledProps.includes('company')}
                onChange={(ev)=>{setData({ ...data, ...{ company: ev.target.value } });}}
              />
            </Grid>
            <Grid item>
              <TextField 
                size="small" 
                label="Legal Address" 
                variant="outlined" 
                value={data.legalAddress} 
                disabled={disabledProps.includes('legalAddress')}
                onChange={(ev)=>{setData({ ...data, ...{ legalAddress: ev.target.value } });}}
              />
            </Grid>
            <Grid item>
              <TextField 
                size="small"
                label="VATNumber"
                variant="outlined"
                value={data.VATNumber} 
                disabled={disabledProps.includes('VATNumber')}
                onChange={(ev)=>{setData({ ...data, ...{ VATNumber: ev.target.value } });}}
              />
            </Grid>
            <Grid item>
              <LoadingButton type="submit" size="medium" loading={false} variant="contained" 
                onClick={submitHandler}
              >
                REGISTER
              </LoadingButton>
            </Grid>
          </>
        }
      </Grid>
    </FormControl>
  </>;
}