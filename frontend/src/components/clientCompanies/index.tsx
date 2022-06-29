import { Alert, Box, Button, Container, FormControl, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InviteContainer from '../../features/invite/container';
import { WideButton } from '../common/button';
import PageHeader from '../common/page/pageHeader';
import ClientCompaniesTable, { RowProps } from './table';

export default function ClientCompanies ({ data }: {data: RowProps[]}) {

  const navigate = useNavigate();

  return <Container maxWidth="md" sx={{ padding: (theme)=>theme.spacing(6) }}>
    <PageHeader
      title="Client companies"
      subTitle="List of clients and locations"
    />
    <ClientCompaniesTable data={data} />
    <WideButton onClick={()=>navigate('/invite')}>Invite new</WideButton>
  </Container>;
}