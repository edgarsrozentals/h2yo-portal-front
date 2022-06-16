import { Alert, Box, Button, Container, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MultiSelectChip from '../common/input/multiSelectChip';
import TableCP, { RowData } from '../common/table';
import { SelectType, UserData } from '../common/types';
import TeamTable, { TeamTableProps } from './table';

interface TeamProps extends TeamTableProps {
    error: string
}

export default function Team(props: TeamProps) {
    
  const { error } = props;

  const theme = useTheme();

  const navigate = useNavigate();

  return <Container sx={{ padding: theme.spacing(6) }}>
    <Typography variant="h4">My team</Typography>
    <Typography variant="body1">Manage your team and assigned roles.</Typography>
    {error ? <Alert severity="error">{error}</Alert> : null}
    <Box sx={{ padding: theme.spacing(4, 0, 0, 0) }}>
      <TeamTable {...props} />
    </Box>
    <Box sx={{ padding: theme.spacing(4, 0, 0, 0) }}>
      <Button size="small" sx={{ padding: theme.spacing(0.5, 6, 0.25, 6) }} variant="contained" onClick={()=>{ navigate('/invite'); }}>Invite new member</Button>
    </Box>
  </Container>;
}