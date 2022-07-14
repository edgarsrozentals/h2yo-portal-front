import React, { useEffect } from 'react';
import { post } from '../../api';

import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { addData, addOdooData, setPermissions } from '../user/userSlice';
import { useDispatch } from 'react-redux';

const AutoLoginContainer = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentLocation = useLocation();

  const PREVENT_AUTO_LOGIN = ['/invite/accept', '/user-invite/accept', '/resetpassword', '/setnewpassword'];

  const autoLogin = async () => {

    let prevent = false;
    PREVENT_AUTO_LOGIN.map(x => {

      if (currentLocation.pathname.indexOf(x) > -1) {
        prevent = true;
      }
    });

    if (prevent) {
      return;
    }

    const response = await post('autoauth');

    if (response.status === 200) {
      dispatch(addData(response.data.data));
      dispatch(addOdooData(response.data.odooData));
      dispatch(setPermissions(response.data.permissions));

      if (currentLocation.pathname === '/') {
        navigate('/home');
      }
      
    } else {
      navigate('/');
    }
  };

  useEffect(()=>{

    autoLogin();
  },[]);

  return null;
};

export default AutoLoginContainer;