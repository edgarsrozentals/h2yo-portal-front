import React, { useEffect, useState } from 'react';
import { post, get } from '../../api';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useDispatch, useStore } from 'react-redux';
import ResetPasswordNew, { IResetPasswordNewState, FormState } from '../../components/account/resetPassword/newPassword';


export default function PasswordResetPasswordContainer () {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [defaultProps, setDefaultProps] = useState({});
  const [disabledProps, setDisabledProps] = useState<Array<string>>([]);

  const [registerError, setRegisterError] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>(FormState.EXPIRED);

  const { token, email } = useParams();
    
  const handleVerifyRegister = async () => {

    const urlParams = new URLSearchParams(window.location.search);

    const resp = await get('passwordreset/verify/' + token + '/' + email);

    if (!resp.result) {
      setRegisterError('Password reset link has expired or is invalid');
    } else {
      setFormState(FormState.DEFAULT);
    }

    return;
  };

  useEffect(() => {

    handleVerifyRegister();
  }, []);

  const handleReset = async (data: IResetPasswordNewState) => {

    const dataToSend: any = data;

    dataToSend.token = token;
    dataToSend.email = email;

    dataToSend.password = data.password1;

    const result = await post('passwordreset/setnewpassword', dataToSend);

    if (result.result) {
      setMessage('Registration completed!');
      setFormState(FormState.SUCCESS);
    } else {
      setRegisterError('An error occured! Failed to Register!');
    }

    return;
  };

  const loginButtonHandler = () => {
    navigate('/');
  };
  
  return (<>
    <ResetPasswordNew 
      formState={formState}
      onSetPassword={handleReset}
      message={message}
      externalError={registerError} 
    />
  </>);
}