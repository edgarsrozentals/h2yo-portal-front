import { Box, Container, Paper, Theme, Typography, useTheme } from '@mui/material';
import React from 'react';
import { CartrigeType, ICartrigesState } from '../../features/cartriges/cartrigesSlice';
import PageHeader from '../common/page/pageHeader';


export default function CustomerSupport () {
    
  const theme = useTheme();

  return <Container>
    <PageHeader 
      title="Customer Support" 
      subTitle="Services provided in collaboration between Fonte Viva and H2YO"
    />
  </Container>
  ;
}