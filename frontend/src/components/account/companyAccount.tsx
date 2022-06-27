import { LoadingButton } from '@mui/lab';
import { Alert, Box, Container, FormControl, Grid, MenuItem, Select, ThemeProvider, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CompanyBilling from '../common/company/billing';
import CompanyDetails from '../common/company/details';
import PageHeader from '../common/page/pageHeader';
import { IRegisterCompState } from './register/IRegisterCompState';

export interface IAccountProps {
  name?: string,
  legalAddress?: string,
  vatNumber?: string,
  street?: string,
  street2?: string,
  building?: string,
  apartment?: string,
  city?: string,
  country?: string,
  zip?: string,
}

type Props = {
  defaultProps?: IAccountProps,
  successMessage: string,
  errorMessage: string,
  onUpdate: (data: IAccountProps) => void,
}

export default function CompanyAccount ({ defaultProps, onUpdate, successMessage, errorMessage }: Props ) {

  const [data, setData] = useState<IAccountProps>({ 
    name: defaultProps?.name ?? '',
    vatNumber: defaultProps?.vatNumber ?? '',
    street: defaultProps?.street ?? '',
    street2: defaultProps?.street2 ?? '',
    apartment: defaultProps?.apartment ?? '',
    city: defaultProps?.city ?? '',
    country: defaultProps?.country ?? '',
    zip: defaultProps?.zip ?? '',
  });

  const theme = useTheme();
    
  useEffect(() => {
    
    setData(defaultProps ?? {} );
  }, [defaultProps]);

  const submitHandler = () => {
    onUpdate(data);
    return;
  };

  return <Container>
    <PageHeader
      title="My company"
      subTitle="Edit your company details & billing information"
    />
    <Typography gutterBottom component="div" align="left" />
    {successMessage ? <Grid item><Alert severity="success">{successMessage}</Alert></Grid> : null}
    {errorMessage ? <Grid item><Alert severity="error">{errorMessage}</Alert></Grid> : null}
    <Typography variant="body1" gutterBottom component="div" align="left" sx={{ borderBottom: '1px solid ' + theme.palette.primary.dark }}>Billing information</Typography>
    <Box sx={{ padding: theme.spacing(3) }}><CompanyDetails data={data} onSetData={setData} disabledProps={[]} /></Box>
    <Typography variant="body1" gutterBottom component="div" align="left" sx={{ borderBottom: '1px solid ' + theme.palette.primary.dark }}>Billing contact</Typography>
    <Box sx={{ padding: theme.spacing(3) }}><CompanyBilling data={data} onSetData={setData} disabledProps={[]} /></Box>
    {/*<Typography variant="h6" gutterBottom component="div" align="left">Payment Method</Typography>
      <hr />
      <Grid
        container 
        spacing={1}
      >
        <Grid item md={6} sm={6} xs={12}>
          <Select
            size="small"
            fullWidth
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={data.payementType}
            onChange={(ev)=>{setData({ ...data, ...{ payementType: ev.target.value } });}}
          >
            <MenuItem value={'bank_transfer'}>Bank Transfer</MenuItem>
            <MenuItem value={'credit_card'}>Debit/Credit Card</MenuItem>
          </Select>
        </Grid>
</Grid>*/}
    <Box sx={{ padding: theme.spacing(0, 3) }}>
      <Grid
        container
        spacing={1}
      >
        <Grid item md={8} sm={8} xs={12} />
        <Grid item md={4} sm={4} xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="baseline"
          >
            <LoadingButton type="submit" size="medium" loading={false} variant="contained" 
              onClick={submitHandler}
            >
            UPDATE
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </Container>;
}