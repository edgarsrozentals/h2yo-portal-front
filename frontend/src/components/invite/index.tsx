import { Alert, Box, FormControl, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { validateEmail } from '../../features/user/email';
import { ContactRole } from '../../features/user/userSlice';

export interface IInviteCompState {
  email: string, 
  accountOwnerOdoo: number,
  userRole?: ContactRole
}

export interface IInviteRole {
  role: ContactRole, 
  title: string
}

type ComponentProps = {
  onInvite: (data: IInviteCompState) => Promise<void>,
  inviteError: string,
  inviteRoles: Array<IInviteRole>,
  message: string,
  accountOwners: Array<{id: number, name: string}>,
}


export default function Invite (
  { onInvite, inviteError, message, accountOwners, inviteRoles }: ComponentProps
) {

  const [data, setData] = useState<IInviteCompState>({ 
    email: '', 
    accountOwnerOdoo: 0,
    userRole: undefined
  });
  const [error, setError] = useState<string>('');

  const submitHandler = (event: any) => {
    
    event.preventDefault();
    setError('');
    
    if (data.email === '') {
      setError('Please enter your email address!');
      return false;
    }

    if (!validateEmail(data.email ?? '')) {
      setError('Incorrect email address!');
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
      {inviteRoles && inviteRoles.length > 0 ? <FormControl fullWidth>
        <InputLabel id="account-owner-select-label">Role</InputLabel>
        <Select
          size="small"
          labelId="account-owner-select-label"
          value={data.accountOwnerOdoo}
          label="Account Owner"
          onChange={(ev)=>setData({ ...data, ...{ userRole: ev.target.value as ContactRole } })}
        >
          {inviteRoles.map((elem: IInviteRole, i)=>(<MenuItem key={i} value={elem.role}>{elem.title}</MenuItem>))}
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
  </>;
}