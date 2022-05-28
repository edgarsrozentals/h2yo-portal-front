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
import { selectOdooData } from '../features/user/userSlice';
import RegisterContainer from '../features/user/registerContainer';
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

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/debug" element={<><AppBarComp /><DebugContainer /></>} />
          <Route path="/home" element={<><AppBarComp /><Dashboard /></>} />
          <Route path="/delivery" element={<><AppBarComp />Delivery content</>} />
          <Route path="/cartriges" element={<><AppBarComp /><CartrigesContainer /></>} />
          <Route path="/services" element={<><AppBarComp />Services content</>} />
          <Route path="/profile" element={<><AppBarComp /><UserProfileContainer /></>} />
          <Route path="/company-account" element={<><AppBarComp /><CompanyAccountContainer /></>} />
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
            <PublicPage><RegisterContainer /></PublicPage>
          </>} />
          <Route path="/invite" element={<><AppBarComp /><InviteContainer /></>} />
          <Route path="/" element={
            <PublicPage><LoginContainer /></PublicPage>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
