import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

type CompanyBillingProps = {
  data: any,
  disabledProps: Array<string>,
  onSetData: React.Dispatch<React.SetStateAction<any>>
}

export default function CompanyBilling({ disabledProps, onSetData, data }: CompanyBillingProps){

  return <Grid
    container
    spacing={1}
  >
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        fullWidth
        size="small" 
        label="Contact phone number" 
        variant="outlined" 
        value={data.phone} 
        disabled={disabledProps.includes('phone')}
        onChange={(ev)=>{onSetData({ ...data, ...{ phone: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        fullWidth
        size="small" 
        label="E-mail"
        variant="outlined" 
        value={data.email}
        disabled={disabledProps.includes('email')}
        onChange={(ev)=>{onSetData({ ...data, ...{ email: ev.target.value } });}}
      />
    </Grid>
  </Grid>;
}