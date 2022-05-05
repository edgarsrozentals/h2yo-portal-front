import React, { useEffect, useState } from 'react';
import { post, get } from '../../api';
import Register from '../../components/account/register/company';
import { IRegisterCompState } from '../../components/account/register/register';

import {
  BrowserRouter as Router,
  useNavigate,
} from 'react-router-dom';
import { addData, addOdooData } from '../user/userSlice';
import { useDispatch, useStore } from 'react-redux';
import { Alert } from '@mui/material';
import ResetPasswordEmail from '../../components/account/resetPassword/email';
import { IResetEmailCompState } from '../../components/account/resetPassword/email';
import Account from '../../components/account/account';

export default function AccountContainer () {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  
  return (<><Account />
  </>);
}