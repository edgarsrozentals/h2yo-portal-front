import React, { useEffect, useState } from 'react';
import { post, get } from '../../api';
import Register from '../../components/account/register/company';
import { IRegisterCompState } from '../../components/account/register/IRegisterCompState';

import {
  BrowserRouter as Router,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { addData, addOdooData, ContactRole, RegStage } from './userSlice';
import { useDispatch, useStore } from 'react-redux';
import { Alert } from '@mui/material';

const RegisterCompanyContainer = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [defaultProps, setDefaultProps] = useState({});
  const [disabledProps, setDisabledProps] = useState<Array<string>>([]);
  const [registrationStage, setRegistrationStage] = useState(RegStage.inProgress);

  const [registerError, setRegisterError] = useState('');
  const [message, setMessage] = useState('');

  const { step } = useParams();

  const handleVerifyRegister = async () => {

    const urlParams = new URLSearchParams(window.location.search);
    
    const data = await get('invite/' + urlParams.get('token') + '/' + urlParams.get('email'));

    let name = '';
    const disabledProps = [];
    if (data.role === ContactRole.ACCOUNT_OWNER_MNG 
      || data.role === ContactRole.ACCOUNT_OWNER_USER
    ) {
      
      disabledProps.push('company');
      name = data.owner.name;
    }

    if (data.email) {
      disabledProps.push('userEmail');
    }

    
    setDisabledProps(disabledProps);

    setDefaultProps({ company: name, userEmail: data.email });

    return;
  };

  useEffect(() => {

    handleVerifyRegister();
  }, []);

  const handleRegister = async (data: IRegisterCompState) => {

    const urlParams = new URLSearchParams(window.location.search);
    const dataToSend: any = data;
    dataToSend.token = urlParams.get('token');
    dataToSend.inviteEmail = urlParams.get('email');

    const result = await post('invite/accept', dataToSend);

    if (result.status === 200) {
      setRegisterError('');
      setMessage('Registration completed!');
      setRegistrationStage(RegStage.completed);
    } else {
      if (result.message) {
        setRegisterError(result.message);

      } else {
        setRegisterError('An error occured! Failed to Register!');

      }
    }

    return;
  };

  const loginButtonHandler = () => {
    navigate('/');
  };
  
  return (<>
    
    <Register
      step={step ? parseInt(step?.replace('step', '')) : 1}
      onRegister={handleRegister} 
      message={message} 
      registrationStage={registrationStage}
      registerError={registerError} 
      disabledProps={disabledProps}
      defaultProps={defaultProps}
      onLoginButton={loginButtonHandler}
    />
    
  </>);
};

export default RegisterCompanyContainer;