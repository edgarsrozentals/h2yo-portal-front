import { Alert, Box, FormControl, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

export interface ILoginCompState {
  login: string, 
  password: string
}

export default function Login ({ onLogin, loginError }: {onLogin: (data: ILoginCompState) => Promise<void>, loginError: string}) {

  const [data, setData] = useState<ILoginCompState>({ login: '', password: '' });
  const [error, setError] = useState<string>('');

  const submitHandler = (event: any) => {
    
    event.preventDefault();

    if (data.login === '') {
      setError('Please enter your email address!');
      return false;
    }

    if (data.password === '') {
      setError('Please enter the password!');
      return false;
    }

    onLogin(data);
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

  const errorText = error !== '' ? error : loginError;

  return <>
    <Typography variant="h2" gutterBottom component="div" align="center">
      CUSTOMER PORTAL
    </Typography>
    <FormControl>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center">
        {errorText ? <Grid item><Alert severity="error">{errorText}</Alert></Grid> : null}
        <Grid item>
          <TextField size="small" label="Email" variant="outlined" 
            value={data.login} 
            onChange={(ev)=>{setData({ ...data, ...{ login: ev.target.value } });}}
          />
        </Grid>
        <Grid item>
          <TextField 
            size="small" 
            label="Password" 
            type="password" 
            variant="outlined" 
            value={data.password} 
            onChange={(ev)=>{setData({ ...data, ...{ password: ev.target.value } });}}
          />
        </Grid>
        <Grid item>
          <LoadingButton type="submit" size="medium" loading={false} variant="contained" 
            onClick={submitHandler}
          >
          LOGIN
          </LoadingButton>
        </Grid>
      </Grid>
    </FormControl>
  </>;
}
