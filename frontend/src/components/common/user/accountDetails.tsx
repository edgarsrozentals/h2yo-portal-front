import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

type AccountDetailsProps = {
  data: any,
  disabledProps: Array<string>,
  errorFields: Array<string>,
  onSetData: React.Dispatch<React.SetStateAction<any>>
}

export default function AccountDetails ({ data, disabledProps, onSetData, errorFields }: AccountDetailsProps) {

  return <Grid 
    container 
    spacing={1}
  >
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        size="small" 
        label="First Name"
        variant="outlined" 
        error={errorFields.includes('firstName')}
        fullWidth
        disabled={disabledProps.includes('firstName')}
        value={data.userFirstName} 
        onChange={(ev)=>{onSetData({ ...data, ...{ userFirstName: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField
        size="small" 
        label="Last Name"
        variant="outlined" 
        error={errorFields.includes('lastName')}
        fullWidth
        disabled={disabledProps.includes('lastName')}
        value={data.userLastName} 
        onChange={(ev)=>{onSetData({ ...data, ...{ userLastName: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        size="small" 
        label="Email"
        variant="outlined" 
        error={errorFields.includes('userEmail')}
        fullWidth
        disabled={disabledProps.includes('userEmail')}
        value={data.userEmail} 
        onChange={(ev)=>{onSetData({ ...data, ...{ userEmail: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        size="small" 
        label="Phone"
        variant="outlined" 
        error={errorFields.includes('userPhone')}
        fullWidth
        disabled={disabledProps.includes('userPhone')}
        value={data.userEmail} 
        onChange={(ev)=>{onSetData({ ...data, ...{ userPhone: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        size="small" 
        label="Password" 
        type="password" 
        variant="outlined" 
        error={errorFields.includes('password')}
        fullWidth
        value={ data.userPassword } 
        disabled={ disabledProps.includes('password') }
        onChange={(ev)=>{onSetData({ ...data, ...{ userPassword: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        size="small" 
        label="Confirm password" 
        type="password2" 
        variant="outlined" 
        fullWidth
        value={ data.userPassword2 } 
        error={errorFields.includes('password')}
        disabled={ disabledProps.includes('password') }
        onChange={(ev)=>{onSetData({ ...data, ...{ userPassword2: ev.target.value } });}}
      />
    </Grid>
  </Grid>;
}