import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { selectCartriges } from './cartrigesSlice';
import Cartriges from '../../components/cartriges';

export default function CartrigesContainer () {


  const cartriges: any = useSelector(selectCartriges);
  
  return (<><Cartriges
    cartriges={cartriges}
  />
  </>);
}