import React, { useEffect, useState } from 'react';
import { post, get, put } from '../../api';
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
import CompanyAccount, { IAccountProps } from '../../components/account/companyAccount';

export default function AccountContainer () {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [companyData, setCompanyData] = useState();

  const odooData: any = useSelector(selectOdooData);

  const [messageInternal, setMessageInternal] = useState<string>('');
  const [errorMessageInternal, setErrorMessageInternal] = useState<string>('');

  const fetchComapnyData = async() => {

    const result = await get('company');

    if (result.httpSatus === 200) {
      setCompanyData(result);
    } else {
      console.log('failed to fetch', result);
    }
    
  };
  

  useEffect(()=>{
    fetchComapnyData();
  },[]);
  
  const updateDataHandler = async (data: IAccountProps) => {

    const result = await put('company', data);

    if (result.httpStatus === 200) {
      setMessageInternal('Company data updated!');
    } else {
      setErrorMessageInternal('An error occured, failed to update. ' + result.data.message);
    }
  };

  return (<><CompanyAccount 
    successMessage={messageInternal}
    errorMessage={errorMessageInternal}
    onUpdate={updateDataHandler}
    defaultProps={companyData}
  />
  </>);
}