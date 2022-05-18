import { Button, Grid } from '@mui/material';
import React from 'react';

type ComponentProps = {
    execute: (executeType: string) => void
}

export default function DebugComponent({ execute }: ComponentProps) {

  return <Grid
    container 
    alignItems={'center'}
    padding={5}
    spacing={2}
  >
    <Grid item md={8} sm={8} xs={12} />
    <Grid item md={4} sm={4} xs={12}>
      <Button size="medium" variant="contained" onClick={()=>{execute('starterpack');}}>
          Order Starter Pack (debug)
      </Button>
    </Grid>
  </Grid>;
}