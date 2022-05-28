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

  const fetchLocations = async ({ login, password }: ILoginCompState) => {

    setLoading(true);
    const response = await get('locations').catch(console.error);

    setLoading(false);
    if (response.httpStatus === 200) {

      setData(data);
    } else {
      //error
    }
  };

  return (<>
    <Locations />
  </>);
};

export default LocationsContainer;