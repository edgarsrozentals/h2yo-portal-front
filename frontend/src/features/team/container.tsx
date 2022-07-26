import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get, put, remove } from '../../api';
import { SelectType, UserData } from '../../components/common/types';
import Team from '../../components/team';
import TeamTable from '../../components/team/table';
import { getPermissions } from '../user/userSlice';

export default function TeamContainer () {

  const [data, setData] = useState<Array<UserData>>([]);
  const [roles, setRoles] = useState<Array<SelectType>>([]);
  const [locations, setLocations] = useState<Array<SelectType>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const permissions = useSelector(getPermissions);

  const loadUsers = async() => {

    setLoading(true);
    const response = await get('users').catch(console.error);
    
    setLoading(false);
    if (response.status === 200) {
    
      setData(response.data.users);
      setLocations(response.data.options.locations);
      setRoles(response.data.options.roles);
    } else {
      setError('Failed to load users data');
    }
  };

  const locationSelectHandler = async (userData: UserData, data: SelectType[]) => {

    setLoading(true);
    const response = await put('users/'+userData.id+'/locations', { locations: data.map(x=>x.id) }).catch(console.error);
    
    setLoading(false);
    if (response.status === 200) {
    
      loadUsers();
    } else {
      setError('Failed to set location');
      
      loadUsers();
    }
  };

  const roleSelectHandler = async (userData: UserData, data: SelectType[]) => {

    setLoading(true);
    const response = await put('users/'+userData.id+'/roles', { roles: data.map(x=>x.id) }).catch(console.error);
    
    setLoading(false);
    if (response.status === 200) {
    
      loadUsers();
    } else {
      setError('Failed to set role');
      loadUsers();
    }
  };

  const deleteMemberHandler = async (data: UserData) => {
    
    setLoading(true);
    const response = await remove('users/' + data.id).catch(console.error);
    
    setLoading(false);
    if (response.status === 200) {
    
      loadUsers();
    } else {
      setError(response.message ?? 'Failed to delete');
      loadUsers();
    }

    return;
  };

  useEffect(()=>{
    loadUsers();
  }, []);

  return <Team 
    error={error}
    data={data} 
    locations={locations} 
    roles={roles} 
    onSelectLocation={locationSelectHandler}
    onSelectRole={roleSelectHandler}
    onDeleteMember={deleteMemberHandler}
    showLocations={permissions.includes('MANAGE_TEAM_LOCATIONS')}
  />;
}