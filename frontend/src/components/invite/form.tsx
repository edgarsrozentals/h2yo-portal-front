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

export type InviteFormProps = {
  onInvite: (data: IInviteCompState) => Promise<void>,
  inviteError: string,
  inviteRoles: Array<IInviteRole>,
  message: string,
  accountOwners: Array<{id: number, name: string}>,
}


export default function InviteForm (
  { onInvite, inviteError, message, accountOwners, inviteRoles }: InviteFormProps
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

  useEffect(()=>{
    if (inviteRoles && inviteRoles.length > 0) {
      setData({ ...data, ...{ userRole: inviteRoles[0].role } });
    }

  }, [inviteRoles]);

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
      {inviteRoles && inviteRoles.length > 0 ? <Grid item><FormControl fullWidth>
        
        <InputLabel id="account-owner-select-label">Role</InputLabel>
        <Select
          size="small"
          labelId="account-owner-select-label"
          value={data.userRole}
          fullWidth
          label="Role"
          sx={{ width: '400px' }}
          onChange={(ev)=>setData({ ...data, ...{ userRole: ev.target.value as ContactRole } })}
        >
          {inviteRoles.map((elem: IInviteRole, i)=>(<MenuItem key={i} value={elem.role}>{elem.title}</MenuItem>))}
        </Select>
      </FormControl></Grid> : ''}
      <Grid item md={12} sm={12} xs={12} sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'left' }}>
          <TextField 
            size="small" 
            label="Email" 
            variant="outlined" 
            value={data.email} 
            sx={{ width: '400px' }}
            onChange={(ev)=>{setData({ ...data, ...{ email: ev.target.value } });}}
          />
        </Box>
      </Grid>
      <Grid item md={12} sm={12} xs={12} sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'left' }}>
          <LoadingButton sx={{ padding: (theme) => theme.spacing(0.5, 2, 0.25, 2) }} type="submit" size="small" loading={false} variant="contained" 
            onClick={submitHandler}
          >
          Send invitation
          </LoadingButton>
        </Box>
      </Grid>
    </Grid>
  </>;
}