import React, { useEffect, useState } from 'react';
import { get, post } from '../../api';
import Login, { ILoginCompState } from '../../components/account/login';

import {
  BrowserRouter as Router,
  useNavigate,
} from 'react-router-dom';
import { addData, addOdooData } from '../user/userSlice';
import { useDispatch, useStore } from 'react-redux';
import Locations from '../../components/locations';

const LocationsContainer = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLocations = async () => {

    setLoading(true);
    const response = await get('locations').catch(console.error);

    setLoading(false);
    if (response.status === 200) {

      setData(response.data);
    } else {
      //error
    }
  };

  useEffect(()=>{

    fetchLocations();
  },[]);

  return (<>
    <Locations locations={data} />
  </>);
};

export default LocationsContainer;