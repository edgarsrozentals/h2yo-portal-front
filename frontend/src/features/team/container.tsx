import React, { useEffect, useState } from 'react';
import { get } from '../../api';
import { UserData } from '../../components/common/types';
import Team from '../../components/team';
import TeamTable from '../../components/team/table';

export default function TeamContainer () {

  const [data, setData] = useState<Array<UserData>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const loadUsers = async() => {

    setLoading(true);
    const response = await get('users').catch(console.error);
    
    setLoading(false);
    if (response.status === 200) {
    
      setData(response.data);
    } else {
      setError('Failed to load users data');
    }
  };

  useEffect(()=>{
    loadUsers();
  }, []);

  return <Team data={data} />;
}