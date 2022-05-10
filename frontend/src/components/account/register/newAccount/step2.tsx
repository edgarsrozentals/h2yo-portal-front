import { LoadingButton } from '@mui/lab';
import { Checkbox, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { on } from 'stream';
import { validateEmail } from '../../../../features/user/email';
import UserDetails from '../../../common/user/accountDetails';


export default function RegisterStep2 (props: any) {

  const navigate = useNavigate();
  const [errorFields, setErrorFields] = useState<Array<string>>([]);

  const handleRegister = () => {
    
    if (!validateEmail(props.userEmail)) {
      setErrorFields([...errorFields, ...['userEmail']]);
    }
    if (props.userPassword !== props.userPassword2) {
      
      setErrorFields([...errorFields, ...['password']]);
    }
    if (props.userFirstName === '') {
      
      setErrorFields([...errorFields, ...['userFirstName']]);
    }
    if (props.userLastName === '') {
      setErrorFields([...errorFields, ...['userLastName']]);
    }
    if (props.userPhone === '') {
      setErrorFields([...errorFields, ...['userPhone']]);
    }

    navigate('/invite/accept/step3' + window.location.search);
    return;
  };

  return <>
    <Typography variant="h4" gutterBottom component="div" align="left">
        Account owner
    </Typography>
    <Typography variant="h6" gutterBottom component="div" align="left">Your details</Typography>
    <hr />
    <UserDetails errorFields={errorFields} {...props} />
    <Grid
      container 
      spacing={1}
    >
      <Grid item md={8} sm={8} xs={12}>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="I agree to Terms and Conditions" />
        </FormGroup>
      </Grid>
      <Grid item md={4} sm={4} xs={12}>
        <LoadingButton type="submit" size="medium" loading={false} variant="contained" 
          onClick={handleRegister}
        >
          REGISTER
        </LoadingButton>
      </Grid>
    </Grid>
  </>;
}
