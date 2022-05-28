import { Alert, FormControl } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

interface IConfirmEmailProps {
  externalError: string,
  message?: string
}

export default function ConfirmEmail ({ 
  externalError,
  message
}: IConfirmEmailProps) {

  return <>
    <FormControl>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center">
        {message ? <Grid item><Alert severity="success">{message}</Alert></Grid> : null}
        {externalError ? <Grid item><Alert severity="error">{externalError}</Alert></Grid> : null}
      </Grid>
    </FormControl>
  </>;
}