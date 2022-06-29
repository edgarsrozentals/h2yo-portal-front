import React, { useEffect, useState } from 'react';
import { get, post, put } from '../../api';
import Login, { ILoginCompState } from '../../components/account/login';

import {
  BrowserRouter as Router,
  useNavigate,
} from 'react-router-dom';
import { addData, addOdooData } from '../user/userSlice';
import { useDispatch, useStore } from 'react-redux';
import Locations from '../../components/locations';
import { SelectType } from '../../components/common/types';
import { LocationFormType } from '../../components/locations/location';
import ClientCompanies from '../../components/clientCompanies';

const ClientCompaniesContainer = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const fetchCompanies = async () => {
    
    setLoading(true);
    const response = await get('companieslocations').catch(console.error);

    setLoading(false);
    if (response.status === 200) {

      setData(response.data);

    } else {
      setError('Failed to load location data');
    }
  };

  useEffect(()=>{

    fetchCompanies();
  },[]);

  return (
    <ClientCompanies data={data} />
  );
};

export default ClientCompaniesContainer;