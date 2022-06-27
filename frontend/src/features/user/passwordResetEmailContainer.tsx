import React, { useEffect, useState } from 'react';
import { post, get } from '../../api';

import {
  BrowserRouter as Router,
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useStore } from 'react-redux';
import ResetPasswordEmail from '../../components/account/resetPassword/email';
import { IResetEmailCompState } from '../../components/account/resetPassword/email';

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
      onBackToLogin={loginButtonHandler}
      externalError={registerError} 
    />
    
  </>);
}