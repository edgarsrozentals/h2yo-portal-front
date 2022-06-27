import { Box, Menu, Typography } from '@mui/material';
import React from 'react';
//import logo from './logo.svg';
//import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import LoginContainer from '../features/login/container';
import Shop from '../components/shop';
import MenuTabs from '../components/menu';
import { useSelector } from 'react-redux';
import { getPermissions, selectOdooData } from '../features/user/userSlice';
import RegisterContainer from '../features/user/registerCompanyContainer';
import InviteContainer from '../features/invite/container';
import PasswordResetEmailContainer from '../features/user/passwordResetEmailContainer';
import PasswordResetPasswordContainer from '../features/user/passwordResetPasswordContainer';
import PublicPage from './common/publicPage';
import AppBarComp from './appBar';
import CompanyAccountContainer from '../features/user/companyAccountContainer';
import Dashboard from './dashboard';
import UserProfileContainer from '../features/user/userProfileContainer';
import CartrigesContainer from '../features/cartriges/container';
import DebugContainer from '../features/debug/container';
import ConfirmEmailContainer from '../features/user/confirmEmailContainer';
import LocationsContainer from '../features/locations/container';
import OrdersContainer from '../features/orders/container';
import TeamContainer from '../features/team/container';
import PageFooter from './common/publicPage/footer';
import CustomerSupport from './customerSupport';
import Page from './common/page';
import RegisterUserContainer from '../features/user/registerUserContainer';

const OdooDataRender = ({ data }: { data: any }) => {

  return <>
    <div>{data.email}</div>
    <div>{data.display_name}</div>
    <div>{data.parent_name}</div>
    <div>{data.contact_address}</div>
    <div>{data.x_studio_parent_contact ? data.x_studio_parent_contact[1] : null}</div>
    <div>{data.x_studio_contact_type}</div>
  </>;
};

function App() {

  const odooData = useSelector(selectOdooData);
  const permissions = useSelector(getPermissions);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/debug" element={<Page><DebugContainer /></Page>} />
        <Route path="/home" element={<Page><Dashboard /></Page>} />
        <Route path="/locations" element={<Page><LocationsContainer /></Page>} />
        <Route path="/cartriges" element={<Page><CartrigesContainer /></Page>} />
        <Route path="/customer-support" element={<Page><CustomerSupport /></Page>} />
        <Route path="/orders" element={<Page><OrdersContainer /></Page>} />
        <Route path="/services" element={<Page><Box>Services content</Box></Page>} />
        <Route path="/profile" element={<Page><UserProfileContainer /></Page>} />
        {permissions.indexOf('MANAGE_TEAM') > -1 ? <Route path="/team-management" element={<Page><TeamContainer /></Page>} /> : null}
        <Route path="/company-account" element={<Page><CompanyAccountContainer /></Page>} />
        <Route path="/resetpassword" element={<>
          <PublicPage><PasswordResetEmailContainer /></PublicPage>
        </>} />
        <Route path="/confirmemail/:token/:email" element={<>
          <PublicPage><ConfirmEmailContainer /></PublicPage>
        </>} />
        <Route path="/setnewpassword/:token/:email" element={<>
          <PublicPage><PasswordResetPasswordContainer /></PublicPage>
        </>} />
        <Route path="/newpassword" element={<></>} />
        <Route path="/invite/:step/accept" element={<>
          <PublicPage includeBanner={false}><RegisterContainer /></PublicPage>
        </>} />
        <Route path="/user-invite/accept" element={<>
          <PublicPage includeBanner={false}><RegisterUserContainer /></PublicPage>
        </>} />
        <Route path="/invite" element={<><AppBarComp /><InviteContainer /></>} />
        <Route path="/" element={
          <PublicPage><LoginContainer /></PublicPage>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
