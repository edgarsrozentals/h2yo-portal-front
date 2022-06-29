import React, { useEffect, useState } from 'react';
import { post, get } from '../../api';
import Login, { ILoginCompState } from '../../components/account/login';

import {
  BrowserRouter as Router,
  useNavigate,
} from 'react-router-dom';
import { addData, addOdooData, ContactRole, selectOdooData } from '../user/userSlice';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Invite, { IInviteCompState, IInviteRole } from '../../components/invite/form';

const InviteContainer = ({ inviteCompany }: {inviteCompany?: boolean} = { inviteCompany: false }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inviteError, setInviteError] = useState('');
  const [message, setMessage] = useState('');
  const [accountOwners, setAccountOwners] = useState([]);
  const [inviteRoles, setInviteRoles] = useState<IInviteRole[]>([]);

  const odooData: any = useSelector(selectOdooData);

  useEffect(() => {

    if (odooData.x_studio_contact_type === ContactRole.CUSTOMER_USER) {
      setInviteRoles([
        { role: ContactRole.CUSTOMER_USER, title: 'Account Owner Manager' },
        { role: ContactRole.LOCATION_USER, title: 'Location Manager' },
      ]);
    } else if (odooData.x_studio_contact_type === ContactRole.ACCOUNT_OWNER_MNG && !inviteCompany) {
      setInviteRoles([
        { role: ContactRole.ACCOUNT_OWNER_MNG, title: 'Account Owner Manager' },
        { role: ContactRole.ACCOUNT_OWNER_USER, title: 'Account Owner User' },
      ]);
    }

    if (odooData.x_studio_contact_type !== ContactRole.ADMIN) {
      return;
    }

    const fetchData = async () => {
      
      const response = await get('users/odooaccountowners');
      setAccountOwners(response.data);
    };
    
    fetchData().catch(console.error);

  }, []);

  const handleInvite = async ({ email, accountOwnerOdoo, userRole }: IInviteCompState) => {

    //const role = ContactRole.ACCOUNT_OWNER_MNG;

    const role = odooData.x_studio_contact_type;

    let inviteUserRole;
    let parentId = 0;
    switch (role) {
      case ContactRole.ADMIN: // admin invites hod level user
        inviteUserRole = ContactRole.ACCOUNT_OWNER_MNG;
        parentId = accountOwnerOdoo;
        break;
      case ContactRole.ACCOUNT_OWNER_MNG:
      case ContactRole.ACCOUNT_OWNER_USER: //hod level user invites company

        if (inviteCompany) {
          inviteUserRole = ContactRole.CUSTOMER_USER;
          accountOwnerOdoo = odooData.parent_id[0];
        } else {
          inviteUserRole = userRole;
          accountOwnerOdoo = odooData.x_studio_parent_contact[0];
          parentId = odooData.parent_id[0];
        }

        break;
      case ContactRole.CUSTOMER_USER:
        inviteUserRole = userRole;
        accountOwnerOdoo = odooData.x_studio_parent_contact[0];
        parentId = odooData.parent_id[0];
        break;
      case ContactRole.LOCATION_USER:
        inviteUserRole = ContactRole.LOCATION_USER;
        accountOwnerOdoo = odooData.x_studio_parent_contact[0];
        parentId = odooData.parent_id[0];
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
      inviteRoles={inviteRoles}
      message={message}
      accountOwners={accountOwners} 
    />
  </>);
};

export default InviteContainer;