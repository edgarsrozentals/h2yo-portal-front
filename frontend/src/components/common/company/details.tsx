import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

type CompanyDetailsProps = {
  data: any,
  disabledProps: Array<string>,
  errorFields?: Array<string>,
  onSetData: React.Dispatch<React.SetStateAction<any>>
}

export default function CompanyDetails({ disabledProps, onSetData, data, errorFields }: CompanyDetailsProps){

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
        value={data.name} 
        error={errorFields?.includes('name')}
        disabled={disabledProps.includes('name')}
        onChange={(ev)=>{onSetData({ ...data, ...{ name: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        fullWidth
        size="small"
        label="VAT reg Nr."
        variant="outlined"
        value={data.vatNumber}
        error={errorFields?.includes('vatNumber')}
        disabled={disabledProps.includes('vatNumber')}
        onChange={(ev)=>{onSetData({ ...data, ...{ vatNumber: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        fullWidth
        size="small" 
        label="Address Line 1"
        variant="outlined" 
        value={data.street} 
        error={errorFields?.includes('street')}
        disabled={disabledProps.includes('street')}
        onChange={(ev)=>{onSetData({ ...data, ...{ street: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        fullWidth
        size="small" 
        label="Address Line 2"
        variant="outlined" 
        value={data.street2} 
        error={errorFields?.includes('street2')}
        disabled={disabledProps.includes('street2')}
        onChange={(ev)=>{onSetData({ ...data, ...{ street2: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        fullWidth
        size="small" 
        label="City / Town" 
        variant="outlined" 
        value={data.city} 
        error={errorFields?.includes('city')}
        disabled={disabledProps.includes('city')}
        onChange={(ev)=>{onSetData({ ...data, ...{ city: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        fullWidth
        size="small" 
        label="Country / Region" 
        variant="outlined" 
        value={data.country} 
        error={errorFields?.includes('country')}
        disabled={disabledProps.includes('country')}
        onChange={(ev)=>{onSetData({ ...data, ...{ country: ev.target.value } });}}
      />
    </Grid>
    <Grid item md={6} sm={6} xs={12}>
      <TextField 
        fullWidth
        size="small" 
        label="ZIP" 
        variant="outlined" 
        value={data.zip} 
        error={errorFields?.includes('zip')}
        disabled={disabledProps.includes('zip')}
        onChange={(ev)=>{onSetData({ ...data, ...{ zip: ev.target.value } });}}
      />
    </Grid>
  </Grid>;
}