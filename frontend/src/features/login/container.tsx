import React, { useEffect, useState } from 'react';
import { post } from '../../api';
import Login, { ILoginCompState } from '../../components/account/login';

import {
  BrowserRouter as Router,
  useNavigate,
} from 'react-router-dom';
import { addData, addOdooData } from '../user/userSlice';
import { useDispatch, useStore } from 'react-redux';

const LoginContainer = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginError, setLoginError] = useState<string>('');

  const handleLogin = async ({ login, password }: ILoginCompState) => {

    const response = await post('auth', { username: login, password: password });

    if (response.result) {

      dispatch(addData(response.data));
      dispatch(addOdooData(response.odooData));
      //set user data
      navigate('/home');
    } else {
      setLoginError('Wrong email or password!');
    }
  };

  return (<>
    <Login 
      onLogin={handleLogin} 
      loginError={loginError} 
      onForgotPassword={()=>{navigate('/resetpassword');}}
    />
  </>);
};

export default LoginContainer;