import React, { useEffect, useState } from 'react';
import Register from './register';
import UserDetails from '../../common/user/profileDetails';
import { Alert, Box, Checkbox, FormControlLabel, FormGroup, Grid, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../../features/user/email';
import { LoadingButton } from '@mui/lab';
import { IRegisterCompState } from './IRegisterCompState';
import { regStage } from '../../../features/user/userSlice';

export default function CompanyUserRegister (props: any) {

  const { defaultProps, onRegister, registrationStage } = props;

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


  const handleRegister = (ev: any) => {

    ev.preventDefault();
    
    const errorFieldsNew = [];

    const formProps = data;

    if (!validateEmail(formProps.userEmail ?? '')) {
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
      onRegister(data);
    }

    return;
  };

  return <Box>
    {errorText ? <Grid item>{errorText}</Grid> : null}
    <Typography variant="h6" gutterBottom component="div" align="left">Your details</Typography>
    <hr />
    {registrationStage === regStage.inProgress ? 
      <>
        <Grid item><Alert severity="success">Your account has been registered please login</Alert></Grid>
        <LoadingButton type="submit" size="medium" loading={false} variant="contained" 
          onClick={()=>navigate('/')}
        >
          Login
        </LoadingButton></>
      : null}
    {registrationStage === regStage.completed ?
      <>
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
      </>: null}
  </Box>;
}