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
import RegisterStep1 from './newAccount/step1';
import RegisterStep2 from './newAccount/step2';
import RegisterStep3 from './newAccount/step3';
import { IRegisterCompState } from './IRegisterCompState';

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
    step: number
  }) {

  const [data, setData] = useState<IRegisterCompState>({ 
    userEmail: defaultProps?.userEmail ?? '', 
    userPassword: defaultProps?.userPassword ?? '',
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

  const [error, setError] = useState<string>('');

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

  const errorText = error ?? registerError;

  return <>
    
    <Container
      maxWidth="sm">
      <FormControl>
        <Stepper activeStep={step-1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {errorText ? <Grid item>{errorText}</Grid> : null}
        {message !== '' ? 
          <><Alert severity="success">{message}</Alert> 
            <Button onClick={onLoginButton}>Login</Button>
          </>
          :
          <>
            {step === 1 ? <RegisterStep1 /> : null }
            {step === 2 ? <RegisterStep2 data={data} onSetData={setData} disabledProps={[]} /> : null }
            {step === 3 ? <RegisterStep3 data={data} onSetData={setData} onRegister={submitHandler} disabledProps={[]} /> : null }

          </>
        }
      </FormControl>
    </Container>
    
  </>;
}