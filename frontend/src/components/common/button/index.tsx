import { Button } from '@mui/material';
import React from 'react';

export default Button;

export const RegularButton = (props: any) => (
  <Button size="small" sx={{ padding: (theme)=>theme.spacing(0.5, 2, 0.25, 2) }} variant="contained" {...props}>{props.children}</Button>
);

export const WideButton = (props: any) => (
  <Button size="small" sx={{ padding: (theme)=>theme.spacing(0.5, 6, 0.25, 6) }} variant="contained" {...props}>{props.children}</Button>
);