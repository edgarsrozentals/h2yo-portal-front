import { LoadingButton } from '@mui/lab';
import { Grid, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import CompanyDetails from '../../../common/company/details';

export default function RegisterStep3 (props: any, onRegister: () => void) {

  const theme = useTheme();



  return <>
    <Typography variant="h6" gutterBottom component="div" align="left">Company details</Typography>
    <hr />
    <CompanyDetails {...props} />
    <Grid
      container 
      sx={{ margin: theme.spacing(2, 0) }}
    >
      <Grid item md={8} sm={8} xs={12} />
      <Grid item md={4} sm={4} xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>

        <LoadingButton type="submit" size="small" loading={false} variant="contained" 
          onClick={onRegister}
        >
          REGISTER
        </LoadingButton>
      </Grid>
    </Grid>
  </>;
}
