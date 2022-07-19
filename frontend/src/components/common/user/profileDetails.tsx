import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { validateEmail } from '../../../features/user/email';

type AccountDetailsProps = {
  data: any,
  disabledProps: Array<string>,
  errorFields: Array<string>,
  hideFields: Array<string>,
  onSetData: React.Dispatch<React.SetStateAction<any>>
}

export default function ProfileDetails ({ data, hideFields, disabledProps, onSetData, errorFields }: AccountDetailsProps) {

  const [errorFieldsInternal, setErrorFieldsInternal] = useState<Array<string>>([]);
  
  useEffect(()=>{

    setErrorFieldsInternal(errorFields);
  }, [errorFields]);
  
  const setEmailHandler = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    //if (validateEmail(ev.target.value)) {
    onSetData({ ...data, ...{ userEmail: ev.target.value } });
    //} else {
    //  setErrorFieldsInternal(['userEmail']);
    //}
  };

  

  return <Grid
    container 
    spacing={1}
  >
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        size="small" 
        label="Name and surname"
        variant="outlined" 
        autoComplete="off"
        error={errorFieldsInternal.includes('userName')}
        fullWidth
        disabled={disabledProps.includes('userName')}
        value={data.userName} 
        onChange={(ev)=>{onSetData({ ...data, ...{ userName: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        size="small" 
        label="Contact phone number"
        variant="outlined" 
        autoComplete="off"
        error={errorFieldsInternal.includes('userPhone')}
        fullWidth
        disabled={disabledProps.includes('userPhone')}
        value={data.userPhone} 
        onChange={(ev)=>{onSetData({ ...data, ...{ userPhone: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        size="small" 
        label="Email"
        autoComplete="off"
        variant="outlined" 
        error={errorFieldsInternal.includes('userEmail')}
        fullWidth
        disabled={disabledProps.includes('userEmail')}
        value={data.userEmail} 
        onChange={(ev)=>{setEmailHandler(ev);}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12} />
    {!hideFields.includes('userExistingPassword') ? <Grid item md={6} sm={6} xs={12}>
      <TextField 
        size="small" 
        label="Password" 
        type="password" 
        variant="outlined" 
        autoComplete="off"
        error={errorFieldsInternal.includes('userExistingPassword')}
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
        error={errorFieldsInternal.includes('userPassword')}
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
        error={errorFieldsInternal.includes('userPassword2')}
        disabled={ disabledProps.includes('userPassword2') }
        onChange={(ev)=>{onSetData({ ...data, ...{ userPassword2: ev.target.value } });}}
      />
    </Grid> : null}
  </Grid>;
}