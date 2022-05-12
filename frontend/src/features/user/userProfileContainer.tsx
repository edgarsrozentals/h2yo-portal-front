import React, { useEffect, useState } from 'react';
import { post, get, put } from '../../api';
import Register from '../../components/account/register/company';
import { IRegisterCompState } from '../../components/account/register/register';

import {
  BrowserRouter as Router,
  useNavigate,
} from 'react-router-dom';
import { addData, addOdooData, selectOdooData, selectData } from './userSlice';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Alert } from '@mui/material';
import ResetPasswordEmail from '../../components/account/resetPassword/email';
import { IResetEmailCompState } from '../../components/account/resetPassword/email';
import Account, { IUserProfileState } from '../../components/account/userProfile';
import UserProfile from '../../components/account/userProfile';

export default function UserProfileContainer () {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const odooData: any = useSelector(selectOdooData);
  const userData: any = useSelector(selectData);

  const [messageInternal, setMessageInternal] = useState<string>('');
  const [errorMessageInternal, setErrorMessageInternal] = useState<string>('');
    

  const handleUpdate = async (data: IUserProfileState) => {

    const response = await put('users', {
      firstName: data.userFirstName,
      lastName: data.userLastName,
      phone: data.userPhone,
      email: data.userEmail,
      password: data.userPassword
    });

    if (response.status === 200) {
      setMessageInternal('Profile settings updated');
    } else {
      setErrorMessageInternal(response.data.message);
    }

    return;
  };

  const handleDelete = (data: IUserProfileState) => {

    return;
  };

  
  return (<><UserProfile
    defaultProps={{ 
      userFirstName: userData.firstName as string,
      userLastName: userData.lastName as string,
      userPhone: userData.userPhone as string,
      userEmail: userData.email as string,
    }}
    onUpdate={handleUpdate}
    onDelete={handleDelete}
    successMessage={messageInternal}
    errorMessage={errorMessageInternal}
  />
  </>);
}