import { Alert, Box, Button, Container, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import MultiSelectChip from '../common/input/multiSelectChip';
import TableCP, { RowData } from '../common/table';
import { SelectType, UserData } from '../common/types';
import TeamTable from './table';


export default function Team({ data }: {data: UserData[] }) {
    
  const theme = useTheme();

  return <Container sx={{ padding: theme.spacing(6) }}>
    <Typography variant="h4">My team</Typography>
    <Typography variant="body1">Manage your team and assigned roles.</Typography>
    <Box sx={{ padding: theme.spacing(4, 0, 0, 0) }}>
      <TeamTable data={data} />
    </Box>
    <Box sx={{ padding: theme.spacing(4, 0, 0, 0) }}>
      <Button variant="contained">Invite new member</Button>
    </Box>
  </Container>;
}