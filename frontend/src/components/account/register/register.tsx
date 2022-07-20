import { Alert, Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { validateEmail } from '../../../features/user/email';
import CompanyDetails from '../../common/company/details';
import UserDetails from '../../common/user/profileDetails';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { IRegisterCompState } from './IRegisterCompState';
import { RegStage } from '../../../features/user/userSlice';

const steps = [
  'Welcome',
  'Your Details',
  'Company Details',
];


export default function Register (
  {
    onRegister,
    step,
    defaultProps,
    disabledProps,
    registerError,
    message,
    onLoginButton
  }: 
  {
    onRegister: (data: IRegisterCompState) => Promise<void>, 
    onLoginButton: () => void, 
    registerError: string,
    message: string,
    defaultProps: IRegisterCompState,
    disabledProps: Array<string>,
    registrationStage: RegStage,
    step: number
  }) {

  const [data, setData] = useState<IRegisterCompState>({ 
    userEmail: defaultProps?.userEmail ?? '', 
    userPassword: defaultProps?.userPassword ?? '',
    userPassword2: defaultProps?.userPassword2 ?? '',
    userName: defaultProps?.userName ?? '',
    userPhone: defaultProps?.userPhone ?? '',
    name: defaultProps?.name ?? '',
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

  const [errorFields, setErrorFields] = useState<Array<string>>([]);

  const [error, setError] = useState<string>('');

  useEffect(() => {

    setData({ ...data, ...defaultProps });
  }, [defaultProps]);

  useEffect(() => {

    setError(registerError);
  }, [registerError]);

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
    if (formProps.userName === '') {
      
      errorFieldsNew.push('name');
    }
    if (formProps.name === '') {
      
      errorFieldsNew.push('name');
    }
    if (formProps.userPhone === '') {
      
      errorFieldsNew.push('userPhone');
    }

    if (errorFieldsNew.length > 0) {
      setError('Please fill all required fields!');
    }
    
    setErrorFields(errorFieldsNew);
    
    if (errorFieldsNew.length === 0) {
      onRegister(data);
    }

    return;
  };


  useEffect(() => {
    const listener = (event: any) => {
      
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        
        //   submitHandler(event);
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  return <>
    
    <Container
      maxWidth="sm">
      <FormControl>
        {/*<Stepper activeStep={step-1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
          </Stepper>*/}
        {error ? <Grid item><Alert severity="error">{error}</Alert></Grid> : null}
        {message !== '' ? 
          <><Alert severity="success">{message}</Alert> 
            <Button onClick={onLoginButton}>Login</Button>
          </>
          :
          <>
            {/* {step === 1 ? <RegisterStep1 /> : null }
            {step === 2 ? <RegisterStep2 data={data} onSetData={setData} disabledProps={[]} /> : null }
          {step === 3 ? <RegisterStep3 data={data} onSetData={setData} onRegister={submitHandler} disabledProps={[]} /> : null }*/}
            <Typography variant="h6" gutterBottom component="div" align="left">Your details</Typography>
            <UserDetails 
              disabledProps={[]} 
              hideFields={['userExistingPassword']} 
              errorFields={errorFields} 
              data={data} onSetData={setData} />
            <Typography variant="h6" gutterBottom component="div" align="left">Company details</Typography>
            <CompanyDetails errorFields={errorFields} disabledProps={[]} data={data} onSetData={setData} />
            <LoadingButton type="submit" size="small" loading={false} variant="contained" 
              onClick={handleRegister}
            >
              REGISTER
            </LoadingButton>
          </>
        }
      </FormControl>
    </Container>
    
  </>;
}