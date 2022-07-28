import { Alert, Box, Container, FormControl, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InviteContainer from '../../features/invite/container';
import PageHeader from '../common/page/pageHeader';

export default function InviteHod () {

  return <Container maxWidth="md" sx={{ padding: (theme)=>theme.spacing(6) }}>
    <PageHeader
      title="Invite HOD" 
      subTitle="Invite new HOD manager to H2YO"
    />
    <InviteContainer inviteCompany={true} />
  </Container>;
}