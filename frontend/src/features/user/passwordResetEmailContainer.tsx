import React, { useEffect, useState } from 'react';
import { post, get } from '../../api';
import Register from '../../components/register/company';
import { IRegisterCompState } from '../../components/register/register';

import {
  BrowserRouter as Router,
  useNavigate,
} from 'react-router-dom';
import { addData, addOdooData } from '../user/userSlice';
import { useDispatch, useStore } from 'react-redux';
import { ContactRole } from '../../components/invite';
import { Alert } from '@mui/material';
import ResetPasswordEmail from '../../components/resetpassword/email';
import { IResetEmailCompState } from '../../components/resetpassword/email';

export default function PasswordResetEmailContainer () {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [defaultProps, setDefaultProps] = useState({});
  const [disabledProps, setDisabledProps] = useState<Array<string>>([]);

  const [registerError, setRegisterError] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (data: IResetEmailCompState) => {

    const result = await post('passwordreset/email', data);

    if (result.result) {
      setMessage('Password reset instructions have been sent to ' + data.email + '!');
    } else {
      setRegisterError('An error occured! Failed to sent reset password link!');
    }

    return;
  };

  const loginButtonHandler = () => {
    navigate('/');
  };
  
  return (<>
    
    <ResetPasswordEmail 
      onReset={handleReset}
      externalError={registerError} 
    />
    
  </>);
}