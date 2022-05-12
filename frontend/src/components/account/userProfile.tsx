import { LoadingButton } from '@mui/lab';
import { Alert, Container, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProfileDetails from '../common/user/profileDetails';
import { IRegisterCompState } from './register/register';
import useTheme from '@mui/material/styles/useTheme';

export interface IUserProfileState{
  userEmail?: string,
  userPassword?: string,
  existingPassword?: string,
  userFirstName?: string,
  userLastName?: string,
  userPhone?: string,
}

type Props = {
  defaultProps?: IUserProfileState,
  hideFields?: Array<string>,
  successMessage?: string,
  errorMessage?: string,
  onDelete: (data: IUserProfileState) => void,
  onUpdate: (data: IUserProfileState) => void,
}

export default function UserProfile ({ successMessage, errorMessage, defaultProps, hideFields, onDelete, onUpdate }: Props ) {

  const theme = useTheme();

  const [data, setData] = useState<IUserProfileState>({ 
    userEmail: defaultProps?.userEmail ?? '', 
    existingPassword: defaultProps?.userPassword ?? '',
    userPassword: defaultProps?.userPassword ?? '',
    userFirstName: defaultProps?.userFirstName ?? '',
    userLastName: defaultProps?.userLastName ?? '',
    userPhone: defaultProps?.userPhone ?? '',
  });

  const [messageInternal, setMessageInternal] = useState<string>('');
  const [errorMessageInternal, setErrorMessageInternal] = useState<string>('');
    
  useEffect(() => {
    
    setData({ ...data, ...defaultProps });
  }, [defaultProps]);

  const submitHandler = () => {
      
    onUpdate(data);
    return;
  };

  const errorText = errorMessage ?? messageInternal;
  const messageText = successMessage ?? errorMessageInternal;

  return <FormControl>
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom component="div" align="left">
        User profile
      </Typography>
      <Typography gutterBottom component="div" align="left">
        Update your account details below.
      </Typography>
      {messageText ? <Grid item sx={{ margin: theme.spacing(2, 0) }}><Alert severity="success">{messageText }</Alert></Grid> : null}
      {errorText ? <Grid item><Alert severity="error">{errorText}</Alert></Grid> : null}
      <ProfileDetails hideFields={hideFields ?? []} errorFields={[]} data={data} onSetData={setData} disabledProps={[]} />
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
      <hr />
      <LoadingButton type="submit" size="medium" loading={false} variant="contained" 
        onClick={()=>{onDelete(data);}}
      >
        Delete My Profile
      </LoadingButton>
    </Container>
  </FormControl>;
}