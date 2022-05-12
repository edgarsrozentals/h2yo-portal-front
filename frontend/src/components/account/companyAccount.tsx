import { LoadingButton } from '@mui/lab';
import { Container, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CompanyDetails from '../common/company/details';
import { IRegisterCompState } from './register/register';

interface IAccountProps {
  company?: string,
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
  onUpdate?: (data: IAccountProps) => void,
}

export default function CompanyAccount ({ defaultProps }: Props ) {

  const [data, setData] = useState<IAccountProps>({ 
    company: defaultProps?.company ?? '',
    vatNumber: defaultProps?.vatNumber ?? '',
    street: defaultProps?.street ?? '',
    street2: defaultProps?.street2 ?? '',
    apartment: defaultProps?.apartment ?? '',
    city: defaultProps?.city ?? '',
    country: defaultProps?.country ?? '',
    zip: defaultProps?.zip ?? '',
  });
    
  useEffect(() => {
    
  //  setData({ ...data, ...defaultProps });
  }, [defaultProps]);

  const submitHandler = () => {
      
    return;
  };

  return <FormControl>
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom component="div" align="left">
        Account
      </Typography>
      <Typography gutterBottom component="div" align="left">
        Update your account details below.
      </Typography>
      <Typography variant="h6" gutterBottom component="div" align="left">Company details</Typography>
      <hr />
      <CompanyDetails data={data} onSetData={setData} disabledProps={[]} />
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
    </Container>
  </FormControl>;
}