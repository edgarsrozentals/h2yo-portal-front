import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get, post } from '../../api';
import Devices from '../../components/devices';
import { getDevices, addData } from './devicesSlice';


export default function DevicesContainer() {

  const data = useSelector(getDevices);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState<string>();

  const fetchData = async () => {

    const response = await get('devices');
    
    if (response.status !== 200) {
      setErrorMessage(response.message);
      return;
    }

    if (errorMessage) {
      setErrorMessage(undefined);
    }

    dispatch(addData(response.data));
    
    response;
      
  };

  useEffect(()=>{

    fetchData();
  }, []);

  return <Devices errorMessage={errorMessage} data={data} />;
}