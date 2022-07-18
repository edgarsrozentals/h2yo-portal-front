import { Alert, Avatar, Box, Checkbox, FormControl, FormControlLabel, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import LockIcon from '@mui/icons-material/Lock';

export interface ILoginCompState {
  login: string, 
  password: string
}

interface LoginProps {
  onLogin: (data: ILoginCompState) => Promise<void>, 
  onForgotPassword: () => void, 
  loginError: string,
  loading: boolean
}

export default function Login ({ 
  onLogin, 
  loginError,
  onForgotPassword,
  loading
}: LoginProps) {

  const [data, setData] = useState<ILoginCompState>({ login: '', password: '' });
  const [error, setError] = useState<string>('');

  //needed for autofill
  const loginField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);

  const theme = useTheme();

  const submitHandler = (event: any) => {
    
    event.preventDefault();

    let loginValue = data.login;
    let passwordValue = data.password;

    if (loginValue === '' && loginField.current && loginField.current?.value) {
      loginValue = loginField.current?.value;
    }

    if (passwordValue === '' && passwordField.current && passwordField.current?.value) {
      passwordValue = passwordField.current.value;
    }

    if (loginValue === '') {
      setError('Please enter your email address!');
      return false;
    }

    if (passwordValue === '') {
      setError('Please enter the password!');
      return false;
    }

    onLogin({ login: loginValue, password: passwordValue });
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

  const errorText = loginError !== '' ? loginError : error;

  return <>
    <FormControl
      fullWidth={true}
      sx={{ maxWidth: '600px' }}
    >
      <Grid
        sx={{ width: '100%' }}
        container
        spacing={2}
        direction="row"
        alignItems="left">
        <Grid item md={12} sm={12} xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}><Avatar sx={{ bgcolor: theme.palette.primary.main }}><LockIcon sx={{ color: theme.palette.white }} /></Avatar></Box>
          <Typography align="center" variant="h5" color="primary.dark" >Log In</Typography>
          <Typography align="center" variant="body2" >Your cartridge supply portal</Typography>
        </Grid>
        {errorText ? <Grid item md={12} sm={12} xs={12}><Alert severity="error">{errorText}</Alert></Grid> : null}
        <Grid item md={12} sm={12} xs={12}>
          <TextField  
            fullWidth
            inputRef={loginField}
            size="small" 
            label="Email" 
            variant="outlined" 
            value={data.login} 
            onChange={(ev)=>{setData({ ...data, ...{ login: ev.target.value } });}}
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <TextField 
            inputRef={passwordField}
            fullWidth
            size="small" 
            label="Password" 
            type="password" 
            variant="outlined" 
            value={data.password} 
            onChange={(ev)=>{setData({ ...data, ...{ password: ev.target.value } });}}
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <FormControlLabel control={<Checkbox defaultChecked />} sx={{ color: theme.palette.primary.dark }} label="I accept the Terms and Conditions" />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <LoadingButton sx={{ width: '100%' }} type="submit" size="medium" loading={loading} variant="contained" 
            onClick={submitHandler}
          >
          LOG IN
          </LoadingButton>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <Typography onClick={onForgotPassword} variant="body2" gutterBottom><a style={{ color: theme.palette.primary.main }} href="#">Forgot password?</a></Typography>
        </Grid>
      </Grid>
    </FormControl>
  </>;
}
