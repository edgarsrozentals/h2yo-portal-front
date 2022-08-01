import React, { useEffect, useState } from 'react';
import { post, get, put } from '../../api';

import {
  BrowserRouter as Router,
  useNavigate,
} from 'react-router-dom';
import { addData, addOdooData, selectOdooData, selectData } from './userSlice';
import { useDispatch, useSelector, useStore } from 'react-redux';
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

    const userData: {name?: string, phone?: string, email?: string, password?: string, existingPassword?: string} = {
      name: data.userName,
      phone: data.userPhone,
      email: data.userEmail
    };

    if (data.userPassword) {
      userData.password = data.userPassword;
    }

    if (data.existingUserPassword) {
      userData.existingPassword = data.existingUserPassword;
    }

    const response = await put('users', userData);

    const oldData = { ...userData };
    
    dispatch(addData({ ...userData, ...{
      email: data.userEmail,
      name: data.userName,
      phone: data.userPhone,
    } }));

    if (response.status === 200) {

      setErrorMessageInternal('');
      setMessageInternal('Profile settings updated');
    } else {
      dispatch(addData(oldData));
      setMessageInternal('');
      setErrorMessageInternal(response.message);
    }

    return;
  };

  const handleDelete = (data: IUserProfileState) => {

    return;
  };

  
  return (<><UserProfile
    defaultProps={{ 
      userName: userData.name as string,
      userPhone: userData.phone as string,
      userEmail: userData.email as string,
    }}
    onUpdate={handleUpdate}
    onDelete={handleDelete}
    successMessage={messageInternal}
    errorMessage={errorMessageInternal}
  />
  </>);
}