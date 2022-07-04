import React, { useEffect, useState } from 'react';
import Register from './register';
import UserDetails from '../../common/user/profileDetails';
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../../features/user/email';
import { LoadingButton } from '@mui/lab';
import { IRegisterCompState } from './IRegisterCompState';

export default function CompanyUserRegister (props: any) {

  const { defaultProps, onRegister } = props;

  const [data, setData] = useState<IRegisterCompState>({ 
    userEmail: defaultProps?.userEmail ?? '', 
    userPassword: defaultProps?.userPassword ?? '',
    userPassword2: defaultProps?.userPassword ?? '',
    userFirstName: defaultProps?.userFirstName ?? '',
    userLastName: defaultProps?.userLastName ?? '',
    userPhone: defaultProps?.userPhone ?? '',
    company: defaultProps?.company ?? '',
    legalAddress: defaultProps?.legalAddress ?? '',
    VATNumber: defaultProps?.VATNumber ?? '',
    locationStreet: defaultProps?.locationStreet ?? '',
    locationBuilding: defaultProps?.locationBuilding ?? '',
    locationApt: defaultProps?.locationApt ?? '',
    locationCity: defaultProps?.locationCity ?? '',
    locationCountry: defaultProps?.locationCountry ?? '',
    locationZIP: defaultProps?.locationZIP ?? '',
    country: defaultProps?.country ?? '',
    city: defaultProps?.city ?? '',
  });
    
  useEffect(() => {
    
    setData({ ...data, ...defaultProps });
  }, [defaultProps]);

  const navigate = useNavigate();
  const [errorFields, setErrorFields] = useState<Array<string>>([]);

  const [errorText, setError] = useState<string>('');

  const theme = useTheme();

  const submitHandler = (event: any) => {
    
    event.preventDefault();

    if (data.userEmail === '') {
      setError('Please enter your email address!');
      return false;
    }

    if (!validateEmail(data.userEmail ?? '')) {
      setError('Incorrect email address!');
      return false;
    }

    if (data.userPassword === '') {
      setError('Please enter the password!');
      return false;
    }

    onRegister(data);
  };

  const handleRegister = (ev: any) => {

    ev.preventDefault();
    
    const errorFieldsNew = [];

    const formProps = props.data;

    if (!validateEmail(formProps.userEmail)) {
      errorFieldsNew.push('userEmail');

    }
    if (formProps.userPassword === '' || formProps.userPassword !== formProps.userPassword2) {
      
      errorFieldsNew.push('userPassword');
      errorFieldsNew.push('userPassword2');

    }
    if (formProps.userFirstName === '') {
      
      
      errorFieldsNew.push('userFirstName');

    }
    if (formProps.userLastName === '') {
      
      errorFieldsNew.push('userLastName');

    }
    if (formProps.userPhone === '') {
      
      errorFieldsNew.push('userPhone');
    }

    setErrorFields([...errorFields, ...errorFieldsNew]);

    if (errorFieldsNew.length === 0) {
      navigate('/invite/step3/accept' + window.location.search);
    }

    return;
  };

  return <Box>
    {errorText ? <Grid item>{errorText}</Grid> : null}
    <Typography variant="h6" gutterBottom component="div" align="left">Your details</Typography>
    <hr />
    <UserDetails onSetData={setData} data={data} hideFields={['userExistingPassword']} errorFields={errorFields} {...props} />
    <Grid
      container 
      sx={{ margin: theme.spacing(2, 0) }}
    >
      <Grid item md={8} sm={8} xs={12}>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="I agree to Terms and Conditions" />
        </FormGroup>
      </Grid>
      <Grid item md={4} sm={4} xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <LoadingButton type="submit" size="small" loading={false} variant="contained" 
          onClick={handleRegister}
        >
            Submit
        </LoadingButton>
      </Grid>
    </Grid>
  </Box>;
}