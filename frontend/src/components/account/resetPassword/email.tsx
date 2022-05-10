import { Alert, Box, FormControl, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

export interface IResetEmailCompState {
  email: string, 
}

interface IResetPasswordEmailProps {
  onReset: (data: IResetEmailCompState) => Promise<void>, 
  externalError: string,
  message?: string
}

export default function ResetPasswordEmail ({ 
  onReset,
  externalError,
  message
}: IResetPasswordEmailProps) {

  const [data, setData] = useState<IResetEmailCompState>({ email: '' });
  const [error, setError] = useState<string>('');
  
  const submitHandler = (event: any) => {
    
    event.preventDefault();
    setError('');

    if (data.email === '') {
      setError('Please enter your email address!');
      return false;
    }

    onReset(data);
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

  const errorText = error !== '' ? error : externalError;

  return <>
    <FormControl>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center">
        <Grid item>
          <Typography variant="body1" gutterBottom>Input your email below in order to reset the password. Password reset instructions will be sent to it!</Typography>
        </Grid>
        {message ? <Grid item><Alert severity="success">{{ message }}</Alert></Grid> : null}
        {errorText ? <Grid item><Alert severity="error">{errorText}</Alert></Grid> : null}
        <Grid item>
          <TextField size="small" label="Email" variant="outlined" 
            value={data.email} 
            onChange={(ev)=>{setData({ ...data, ...{ email: ev.target.value } });}}
          />
        </Grid>
        <Grid item>
          <LoadingButton type="submit" size="medium" loading={false} variant="contained" 
            onClick={submitHandler}
          >
          SEND
          </LoadingButton>
        </Grid>
      </Grid>
    </FormControl>
  </>;
}