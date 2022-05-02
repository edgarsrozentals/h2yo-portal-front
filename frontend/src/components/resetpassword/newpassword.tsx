import { Alert, Box, FormControl, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { isNull } from 'util';
import { useNavigate } from 'react-router-dom';

export interface IResetPasswordNewState {
    password1: string, 
    password2: string, 
}

export enum FormState {
    DEFAULT,
    EXPIRED,
    SUCCESS,
}

interface IResetPasswordNewProps {
    onSetPassword: (data: IResetPasswordNewState) => Promise<void>, 
    externalError: string,
    message?: string,
    formState: FormState
}



export default function ResetPasswordNew ({ 
  onSetPassword,
  externalError,
  message,
  formState
}: IResetPasswordNewProps) {

  const [data, setData] = useState<IResetPasswordNewState>({ password1: '', password2: '' });
  const [error, setError] = useState<string>('');
  const [errorFields, setErrorFields] = useState<string[]>([]);
  
  const navigate = useNavigate();

  const submitHandler = (event: any) => {
    
    event.preventDefault();

    if (data.password1 === '') {
      setError('Please enter password!');
      return false;
    }

    if (data.password2 === '') {
      setError('Please repeat the password!');
      return false;
    }

    if (data.password1 !== data.password2) {
      setError('Passowrd doesn\'t match!');
    }

    onSetPassword(data);
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
    <Typography variant="h2" gutterBottom component="div" align="center">
      CUSTOMER PORTAL
    </Typography>
    <FormControl>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center">
        {message ? <Grid item><Alert severity="success">{message}</Alert></Grid> : null}
        {errorText ? <Grid item><Alert severity="error">{errorText}</Alert></Grid> : null}
        {formState === FormState.DEFAULT ? <><Grid item>
          <TextField 
            size="small"
            label="New Password" 
            type="password" 
            variant="outlined" 
            value={ data.password1 }
            onChange={(ev)=>{ setData({ ...data, ...{ password1: ev.target.value } }); }}
          />
        </Grid>
        <Grid item>
          <TextField 
            size="small"
            label="Repeat Password" 
            type="password" 
            variant="outlined" 
            value={ data.password2 }
            onChange={(ev)=>{ setData({ ...data, ...{ password2: ev.target.value } }); }}
          />
        </Grid>
        <Grid item>
          <LoadingButton type="submit" size="medium" loading={false} variant="contained" 
            onClick={submitHandler}
          >
          SET NEW PASSWORD
          </LoadingButton>
        </Grid></>: null}
        {formState === FormState.SUCCESS ? <><Grid item>
          <LoadingButton type="submit" size="medium" loading={false} variant="contained" 
            onClick={()=>navigate('/')}
          >
          Login
          </LoadingButton>
        </Grid></> : null}
      </Grid>
    </FormControl>
  </>;
}