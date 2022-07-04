import { LoadingButton } from '@mui/lab';
import { Alert, Container, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProfileDetails from '../common/user/profileDetails';
import { IRegisterCompState } from './register/IRegisterCompState';
import useTheme from '@mui/material/styles/useTheme';
import PageHeader from '../common/page/pageHeader';
import { Box } from '@mui/system';

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

interface IPasswordState {
  existingPassword: string,
  newPassword: string,
  repeatNewPassword: string,
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

  const [passwordData, setPasswordData] = useState<IPasswordState>({ 
    existingPassword: '',
    newPassword: '',
    repeatNewPassword: ''
  });

  const [messageInternal, setMessageInternal] = useState<string>('');
  const [errorMessageInternal, setErrorMessageInternal] = useState<string>('');
  const [errorFields, setErrorFields] = useState<Array<any>>([]);
    
  useEffect(() => {
    
    setData({ ...data, ...defaultProps });
  }, [defaultProps]);

  const submitHandler = () => {
      
    onUpdate(data);
    return;
  };

  const submitPasswordHandler = () => {

    if (passwordData.newPassword !== passwordData.repeatNewPassword) {

      setMessageInternal('Passwords doesn\'t match');
      setErrorFields(['existingPassword', 'newPassword', 'repeatNewPassword']);
      return;
    }

    onUpdate({ ...defaultProps, ...{ userPassword: passwordData.newPassword } });
  };

  const errorText = errorMessage ?? messageInternal;
  const messageText = successMessage ?? errorMessageInternal;

  return <Container maxWidth="md">
    <FormControl>
      <PageHeader
        title="My profile"
        subTitle="Edit your Sign-in details"
      />
      <Typography variant="h6" gutterBottom component="div" align="left" color={theme.palette.primary.dark} sx={{ borderBottom: '1px solid ' + theme.palette.primary.dark }}>Details</Typography>
      {messageText ? <Grid item sx={{ margin: theme.spacing(2, 0) }}><Alert severity="success">{ messageText }</Alert></Grid> : null}
      {errorText ? <Grid item><Alert severity="error">{errorText}</Alert></Grid> : null}
      <Box sx={{ padding: theme.spacing(3) }}>
        <ProfileDetails hideFields={['userPassword', 'userPassword2', 'userExistingPassword']} errorFields={[]} data={data} onSetData={setData} disabledProps={[]} />

        <Box sx={{ padding: theme.spacing(3, 0) }}>
          <LoadingButton type="submit" size="small" loading={false} variant="contained" 
            onClick={submitHandler}
          >
            UPDATE DETAILS
          </LoadingButton>
        </Box>
      </Box>
      <Typography variant="h6" gutterBottom component="div" align="left" color={theme.palette.primary.dark} sx={{ borderBottom: '1px solid ' + theme.palette.primary.dark }}>Password</Typography>
      <Box sx={{ padding: theme.spacing(3) }}>
        <Grid
          container 
          spacing={1}
        >
          
          <Grid item md={6} sm={6} xs={12}>
            <TextField 
              size="small" 
              label="Existing password" 
              type="password" 
              variant="outlined" 
              fullWidth
              value={ passwordData.existingPassword } 
              onChange={(ev)=>{setData({ ...data, ...{ userPassword2: ev.target.value } });}}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <TextField 
              size="small" 
              label="New password" 
              type="password" 
              variant="outlined" 
              fullWidth
              value={ passwordData.newPassword } 
              onChange={(ev)=>{setData({ ...data, ...{ userPassword2: ev.target.value } });}}
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <TextField 
              size="small" 
              label="Repeat password" 
              type="password" 
              variant="outlined" 
              fullWidth
              value={ passwordData.repeatNewPassword } 
              onChange={(ev)=>{setData({ ...data, ...{ userPassword2: ev.target.value } });}}
            />
            <Box sx={{ padding: theme.spacing(3, 0) }}>
              <LoadingButton type="submit" size="small" loading={false} variant="contained" 
                onClick={submitPasswordHandler}
              >
                CHANGE PASSWORD
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
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
          />
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom component="div" align="left" color={theme.palette.primary.dark} sx={{ borderBottom: '1px solid ' + theme.palette.primary.dark }} />
      <Box sx={{ padding: theme.spacing(3) }}>
        <LoadingButton color="warning" type="submit" size="small" loading={false} variant="contained" 
          onClick={()=>{onDelete(data);}}
        >
        Delete My Profile
        </LoadingButton>
      </Box>
    </FormControl>
  </Container>;
}