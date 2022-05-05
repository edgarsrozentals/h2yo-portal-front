import { Alert, Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { validateEmail } from '../../../features/user/email';
import CompanyDetails from '../../common/company/details';

export interface IRegisterCompState {
  userEmail: string | undefined,
  userPassword: string | undefined,
  userFirstName: string | undefined,
  userLastName: string | undefined,
  userPhone: string | undefined,
  company: string | undefined,
  legalAddress: string | undefined,
  VATNumber: string | undefined,
  locationStreet: string | undefined,
  locationBuilding: string | undefined,
  locationApt: string | undefined,
  locationCity: string | undefined,
  locationCountry: string | undefined,
  locationZIP: string | undefined,
  city: string | undefined,
  country: string | undefined,
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
    userPhone: defaultProps?.userPhone ?? '',
    company: defaultProps?.company ?? '',
    legalAddress: defaultProps?.legalAddress ?? '',
    VATNumber: defaultProps?.VATNumber ?? '',
    locationStreet: defaultProps?.locationStreet ?? '',
    locationBuilding: defaultProps?.locationBuilding ?? '',
    locationApt: defaultProps?.locationApt ?? '',
    locationCity: defaultProps?.locationCity ?? '',
    locationCountry: defaultProps?.locationCountry ?? '',
    locationZIP: defaultProps?.locationZIP ?? '',
    country: defaultProps?.country ?? '',
    city: defaultProps?.city ?? '',
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

    if (!validateEmail(data.userEmail ?? '')) {
      setError('Incorrect email address!');
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
    <FormControl>
      <Container
        maxWidth="sm">
        {errorText ? <Grid item>{errorText}</Grid> : null}
        {message !== '' ? 
          <><Alert severity="success">{message}</Alert> 
            <Button onClick={onLoginButton}>Login</Button>
          </>
          :
          <>
            <Typography variant="h4" gutterBottom component="div" align="left">
              Account Registration
            </Typography>
            <Typography gutterBottom component="div" align="left">
              Please fill out the registration form to create your account.
            </Typography>
            <Typography variant="h6" gutterBottom component="div" align="left">Your details</Typography>
            <hr />
            <Grid 
              container 
              spacing={1}
            >
              <Grid item md={6} sm={6} xs={12}>
                <TextField 
                  size="small" 
                  label="First Name"
                  variant="outlined" 
                  fullWidth
                  disabled={disabledProps.includes('firstName')}
                  value={data.userFirstName} 
                  onChange={(ev)=>{setData({ ...data, ...{ userFirstName: ev.target.value } });}}
                />
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <TextField
                  size="small" 
                  label="Last Name"
                  variant="outlined" 
                  fullWidth
                  disabled={disabledProps.includes('lastName')}
                  value={data.userLastName} 
                  onChange={(ev)=>{setData({ ...data, ...{ userLastName: ev.target.value } });}}
                />
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <TextField 
                  size="small" 
                  label="Email"
                  variant="outlined" 
                  fullWidth
                  disabled={disabledProps.includes('userEmail')}
                  value={data.userEmail} 
                  onChange={(ev)=>{setData({ ...data, ...{ userEmail: ev.target.value } });}}
                />
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <TextField 
                  size="small" 
                  label="Phone"
                  variant="outlined" 
                  fullWidth
                  disabled={disabledProps.includes('userPhone')}
                  value={data.userEmail} 
                  onChange={(ev)=>{setData({ ...data, ...{ userPhone: ev.target.value } });}}
                />
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <TextField 
                  size="small" 
                  label="Password" 
                  type="password" 
                  variant="outlined" 
                  fullWidth
                  value={ data.userPassword } 
                  disabled={ disabledProps.includes('password') }
                  onChange={(ev)=>{setData({ ...data, ...{ userPassword: ev.target.value } });}}
                />
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <TextField 
                  size="small" 
                  label="Confirm password" 
                  type="password" 
                  variant="outlined" 
                  fullWidth
                  value={ data.userPassword } 
                  disabled={ disabledProps.includes('password') }
                  onChange={(ev)=>{setData({ ...data, ...{ userPassword2: ev.target.value } });}}
                />
              </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom component="div" align="left">Company details</Typography>
            <hr />
            <CompanyDetails data={data} onSetData={setData} disabledProps={[]} />
            <Grid
              container 
              spacing={1}
            >
              <Grid item md={8} sm={8} xs={12}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="I agree to Terms and Conditions" />
                </FormGroup>
              </Grid>
              <Grid item md={4} sm={4} xs={12}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="baseline"
                >
                  <LoadingButton type="submit" size="medium" loading={false} variant="contained" 
                    onClick={submitHandler}
                  >
                    REGISTER
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </>
        }
      </Container>
    </FormControl>
  </>;
}