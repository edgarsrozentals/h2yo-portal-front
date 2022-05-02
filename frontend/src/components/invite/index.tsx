import { Alert, Box, FormControl, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export enum ContactRole {
  CUSTOMER = 'CUSTOMER',
  ACCOUNT_OWNER = 'HOD',
  LOCATION = 'LOCATION',
  LOCATION_USER = 'LOCATION MNG',
  CUSTOMER_USER = 'CUSTOMER MNG',
  VENDOR = 'VENDOR',
  ADMIN = 'ADMIN',
  ACCOUNT_OWNER_USER = 'ACCOUNT USER',
  ACCOUNT_OWNER_MNG = 'ACCOUNT OWNER MNG'
}

export interface IInviteCompState {
  email: string, 
  accountOwnerOdoo: number,
}

type ComponentProps = {
  onInvite: (data: IInviteCompState) => Promise<void>,
  inviteError: string,
  message: string,
  accountOwners: Array<{id: number, name: string}>,
}


export default function Invite (
  { onInvite, inviteError, message, accountOwners }: ComponentProps
) {

  const [data, setData] = useState<IInviteCompState>({ 
    email: '', 
    accountOwnerOdoo: 0
  });
  const [error, setError] = useState<string>('');

  const submitHandler = (event: any) => {
    
    event.preventDefault();
    setError('');
    
    if (data.email === '') {
      setError('Please enter your email address!');
      return false;
    }

    if (data.accountOwnerOdoo === 0 && accountOwners.length > 0) {
      setError('Please enter the password!');
      return false;
    }

    onInvite(data);
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

  const errorText = error !== '' ? error : inviteError;

  return <>
    <Typography variant="h2" gutterBottom component="div" align="center" />
    <FormControl>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center">
        {message ? <Grid item><Alert severity="success">{message}</Alert></Grid> : null}
        {errorText ? <Grid item><Alert severity="error">{errorText}</Alert></Grid> : null}
        {accountOwners && accountOwners.length > 0 ? <FormControl fullWidth>
          <InputLabel id="account-owner-select-label">Account Owner</InputLabel>
          <Select
            size="small" 
            labelId="account-owner-select-label"
            value={data.accountOwnerOdoo}
            label="Account Owner"
            onChange={(ev)=>setData({ ...data, ...{ accountOwnerOdoo: typeof ev.target.value === 'string' ? parseInt(ev.target.value) : ev.target.value } })}
          >
            {accountOwners.map((elem, i)=>(<MenuItem key={elem.id} value={elem.id}>{elem.name}</MenuItem>))}
          </Select>
        </FormControl> : ''}
        <Grid item>
          <TextField 
            size="small" 
            label="Email" 
            variant="outlined" 
            value={data.email} 
            onChange={(ev)=>{setData({ ...data, ...{ email: ev.target.value } });}}
          />
        </Grid>
        <Grid item>
          <LoadingButton type="submit" size="medium" loading={false} variant="contained" 
            onClick={submitHandler}
          >
          Invite
          </LoadingButton>
        </Grid>
      </Grid>
    </FormControl>
  </>;
}