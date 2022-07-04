import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

type AccountDetailsProps = {
  data: any,
  disabledProps: Array<string>,
  errorFields: Array<string>,
  hideFields: Array<string>,
  onSetData: React.Dispatch<React.SetStateAction<any>>
}

export default function ProfileDetails ({ data, hideFields, disabledProps, onSetData, errorFields }: AccountDetailsProps) {

  return <Grid
    container 
    spacing={1}
  >
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        size="small" 
        label="First Name"
        variant="outlined" 
        autoComplete="off"
        error={errorFields.includes('userFirstName')}
        fullWidth
        disabled={disabledProps.includes('userFirstName')}
        value={data.userFirstName} 
        onChange={(ev)=>{onSetData({ ...data, ...{ userFirstName: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField
        autoComplete="off"
        size="small" 
        label="Last Name"
        variant="outlined" 
        error={errorFields.includes('userLastName')}
        fullWidth
        disabled={disabledProps.includes('userLastName')}
        value={data.userLastName} 
        onChange={(ev)=>{onSetData({ ...data, ...{ userLastName: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        size="small" 
        label="Email"
        autoComplete="off"
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
        autoComplete="off"
        error={errorFields.includes('userPhone')}
        fullWidth
        disabled={disabledProps.includes('userPhone')}
        value={data.userPhone} 
        onChange={(ev)=>{onSetData({ ...data, ...{ userPhone: ev.target.value } });}}
      />
    </Grid>
    {!hideFields.includes('userExistingPassword') ? <Grid item md={6} sm={6} xs={12}>
      <TextField 
        size="small" 
        label="Password" 
        type="password" 
        variant="outlined" 
        autoComplete="off"
        error={errorFields.includes('userExistingPassword')}
        fullWidth
        value={ data.userExistingPassword } 
        disabled={ disabledProps.includes('userExstingPassword') }
        onChange={(ev)=>{onSetData({ ...data, ...{ userPassword: ev.target.value } });}}
      /> 
    </Grid>: null}
    {!hideFields.includes('userPassword') ? <Grid item md={6} sm={6} xs={12}>
      <TextField 
        size="small" 
        label="Password" 
        type="password" 
        variant="outlined" 
        autoComplete="off"
        error={errorFields.includes('userPassword')}
        fullWidth
        value={ data.userPassword } 
        disabled={ disabledProps.includes('userPassword') }
        onChange={(ev)=>{onSetData({ ...data, ...{ userPassword: ev.target.value } });}}
      />
    </Grid> : null}
    {!hideFields.includes('userPassword2') ? <Grid item md={6} sm={6} xs={12}>
      <TextField 
        size="small" 
        label="Confirm password" 
        type="password" 
        variant="outlined" 
        autoComplete="off"
        fullWidth
        value={ data.userPassword2 } 
        error={errorFields.includes('userPassword2')}
        disabled={ disabledProps.includes('userPassword2') }
        onChange={(ev)=>{onSetData({ ...data, ...{ userPassword2: ev.target.value } });}}
      />
    </Grid> : null}
  </Grid>;
}