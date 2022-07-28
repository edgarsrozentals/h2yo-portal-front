import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Orders from '../../components/orders';
import { get } from '../../api';
import { RowData } from '../../components/common/table';
import { SelectType } from '../../components/common/types';
import { OrderTypeEntry } from '../../components/orders/orderType';

export default function OrdersContainer () {

  const [data, setData] = useState<Array<OrderTypeEntry>>([]);
  const [locations, setLocations] = useState<SelectType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const loadOrders = async () => {

    const response = await get('orders');

    setLoading(false);
    if (response.status === 200) {

      setLocations(response.data.options.locations);
      setData(response.data.data);

    } else {
      setError('Failed to load location data');
    }
  
    return;
  };

  useEffect(()=>{
    loadOrders();
  }, []);
  
  return (<Orders data={data} locations={locations} error={error} />);
}