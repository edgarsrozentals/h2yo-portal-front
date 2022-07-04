import React, { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alert, Container, Grid } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useTheme } from '@mui/system';

export default function PageHeader ({ title, subTitle }: {title: string, subTitle: string | ReactElement}) {

  const theme = useTheme();

  return <Box sx={{ padding: theme.spacing(4, 0, 4, 0) }}>
    <Typography color={theme.palette.primary.dark} variant="h4" component="div" align="left">
      {title}
    </Typography>
    <Typography color={theme.palette.primary.dark} maxWidth={355} gutterBottom component="div" align="left">
      {subTitle}
    </Typography>
  </Box>;
}