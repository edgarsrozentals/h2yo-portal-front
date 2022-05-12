import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

type CompanyDetailsProps = {
  data: any,
  disabledProps: Array<string>,
  onSetData: React.Dispatch<React.SetStateAction<any>>
}

export default function CompanyDetails({ disabledProps, onSetData, data }: CompanyDetailsProps){

  return <Grid
    container 
    spacing={1}
  >
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        size="small" 
        fullWidth
        label="Company name" 
        variant="outlined" 
        value={data.company} 
        disabled={disabledProps.includes('company')}
        onChange={(ev)=>{onSetData({ ...data, ...{ company: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        fullWidth
        size="small" 
        label="Country / Region" 
        variant="outlined" 
        value={data.country} 
        disabled={disabledProps.includes('country')}
        onChange={(ev)=>{onSetData({ ...data, ...{ country: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        fullWidth
        size="small" 
        label="City / Town" 
        variant="outlined" 
        value={data.city} 
        disabled={disabledProps.includes('city')}
        onChange={(ev)=>{onSetData({ ...data, ...{ city: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        fullWidth
        size="small" 
        label="Street" 
        variant="outlined" 
        value={data.street} 
        disabled={disabledProps.includes('street')}
        onChange={(ev)=>{onSetData({ ...data, ...{ street: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        fullWidth
        size="small" 
        label="VAT Number" 
        variant="outlined" 
        value={data.vatNumber} 
        disabled={disabledProps.includes('vatNumber')}
        onChange={(ev)=>{onSetData({ ...data, ...{ vatNumber: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        fullWidth
        size="small"
        label="vatNumber"
        variant="outlined"
        value={data.vatNumber}
        disabled={disabledProps.includes('vatNumber')}
        onChange={(ev)=>{onSetData({ ...data, ...{ vatNumber: ev.target.value } });}}
      />
    </Grid>

  </Grid>;
}