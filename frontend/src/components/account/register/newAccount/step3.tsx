import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import CompanyDetails from '../../../common/company/details';

export default function RegisterStep3 (props: any, onRegister: () => void) {

  return <>
    <Typography variant="h6" gutterBottom component="div" align="left">Company details</Typography>
    <hr />
    <CompanyDetails {...props} disabledProps={['company']} />
    <LoadingButton type="submit" size="medium" loading={false} variant="contained" 
      onClick={onRegister}
    >
      REGISTER
    </LoadingButton>
  </>;
}
