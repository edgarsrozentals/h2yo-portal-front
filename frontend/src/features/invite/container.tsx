import React, { useEffect, useState } from 'react';
import { post, get } from '../../api';
import Login, { ILoginCompState } from '../../components/login';

import {
  BrowserRouter as Router,
  useNavigate,
} from 'react-router-dom';
import { addData, addOdooData, selectOdooData } from '../user/userSlice';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Invite, { ContactRole, IInviteCompState } from '../../components/invite';

const InviteContainer = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inviteError, setInviteError] = useState('');
  const [message, setMessage] = useState('');
  const [accountOwners, setAccountOwners] = useState([]);

  const odooData: any = useSelector(selectOdooData);
  
  useEffect(() => {

    if (odooData.x_studio_contact_type !== ContactRole.ADMIN) {
      return;
    }

    const fetchData = async () => {
      
      const response = await get('users/odooaccountowners');
      setAccountOwners(response.data);
    };
    
    fetchData().catch(console.error);

  }, []);

  const handleInvite = async ({ email, accountOwnerOdoo }: IInviteCompState) => {

    //const role = ContactRole.ACCOUNT_OWNER_MNG;

    const role = odooData.x_studio_contact_type;

    let inviteUserRole;
    let parentId = 0;
    switch (role) {
      case ContactRole.ADMIN:
        inviteUserRole = ContactRole.ACCOUNT_OWNER_MNG;
        parentId = accountOwnerOdoo;
        break;
      case ContactRole.ACCOUNT_OWNER_MNG:
      case ContactRole.ACCOUNT_OWNER_USER:
        inviteUserRole = ContactRole.CUSTOMER_USER;
        accountOwnerOdoo = odooData.parent_id[0];
        break;
      case ContactRole.LOCATION_USER:
        inviteUserRole = ContactRole.LOCATION_USER;
        accountOwnerOdoo = odooData.parent_id[0];
        break;
    }

    const response = await post('invite/user', {
      email: email,
      role: inviteUserRole,
      accountOwner: accountOwnerOdoo,
      parentId: parentId,
      inviteError: inviteError
    });

    if (response.result) {
      setMessage('Invite sent!');
    } else {
      setInviteError('Failed to invite!');
    }

    return;
  };

  return (<>
    <Invite 
      onInvite={handleInvite} 
      inviteError={inviteError} 
      message={message}
      accountOwners={accountOwners} 
    />
  </>);
};

export default InviteContainer;