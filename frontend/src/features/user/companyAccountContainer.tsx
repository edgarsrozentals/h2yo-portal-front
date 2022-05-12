import React, { useEffect, useState } from 'react';
import { post, get } from '../../api';
import Register from '../../components/account/register/company';
import { IRegisterCompState } from '../../components/account/register/register';

import {
  BrowserRouter as Router,
  useNavigate,
} from 'react-router-dom';
import { addData, addOdooData, selectOdooData } from './userSlice';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Alert } from '@mui/material';
import ResetPasswordEmail from '../../components/account/resetPassword/email';
import { IResetEmailCompState } from '../../components/account/resetPassword/email';
import Account from '../../components/account/userProfile';
import CompanyAccount from '../../components/account/companyAccount';

export default function AccountContainer () {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [companyData, setCompanyData] = useState();

  const odooData: any = useSelector(selectOdooData);

  const fetchComapnyData = async() => {

    const result = await get('company');

    if (result.status === 200) {
      setCompanyData(result.data);
    } else {
      console.log('failed to fetch', result);
    }
    
  };

  useEffect(() => {
    
    return;

  }, []);
  
  return (<><CompanyAccount 
    defaultProps={{ 
      company: odooData.parent_name,
      street: odooData.street,
      street2: odooData.street2,
    }}
  />
  </>);
}