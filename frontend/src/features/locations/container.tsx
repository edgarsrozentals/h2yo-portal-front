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
import { SelectType } from '../../components/common/types';
import { LocationFormType } from '../../components/locations/location';

const LocationsContainer = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [allDevices, setAllDevices] = useState<Array<SelectType>>([]);
  const [allResponsibles, setAllResponsibles] = useState<Array<SelectType>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const fetchLocations = async () => {
    
    setLoading(true);
    const response = await get('locations').catch(console.error);

    setLoading(false);
    if (response.status === 200) {

      setData(response.data.data);
      setAllDevices(response.data.options.allDevices);
      setAllResponsibles(response.data.options.allResponsibles);
    } else {
      setError('Failed to load location data');
    }
  };

  useEffect(()=>{

    fetchLocations();
  },[]);

  const deviceChangeHandler = async (id: number, data: SelectType[]) => {

    return;
  };

  const responsibleChangeHandler = async (id: number, data: SelectType[]) => {
    
    return;
  };

  const locationUpdateHandler = async (id: number, data: LocationFormType) => {

    setLoading(true);
    const response = await post('locations/' + id, data).catch(console.error);

      
    if (response.status === 200) {

      //setData(response.data.data);
    } else {
      setError('Failed to update location data');
      fetchLocations();
    }

    return;
  };

  return (<>
    <Locations 
      error={error}
      onChangeLocation={locationUpdateHandler}
      locations={data}
      onChangeDevice={deviceChangeHandler}
      onChangeResponsible={responsibleChangeHandler}
      allDevices={allDevices}
      allResponsibles={allResponsibles}
    />
  </>);
};

export default LocationsContainer;