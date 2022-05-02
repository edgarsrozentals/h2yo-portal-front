import { Box, Menu, Typography } from '@mui/material';
import React from 'react';
//import logo from './logo.svg';
//import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import LoginContainer from './features/login/container';
import Shop from './components/shop';
import MenuTabs from './components/menu';
import { useSelector } from 'react-redux';
import { selectOdooData } from './features/user/userSlice';
import RegisterContainer from './features/user/registerContainer';
import InviteContainer from './features/invite/container';
import PasswordResetEmailContainer from './features/user/passwordResetEmailContainer';
import PasswordResetPasswordContainer from './features/user/passwordResetPasswordContainer';

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
          <Route path="/home" element={<><MenuTabs /><OdooDataRender data={odooData} /></>} />
          <Route path="/statistics" element={<><MenuTabs />Statistics content</>} />
          <Route path="/shop" element={<><MenuTabs /><Shop /></>} />
          <Route path="/resetpassword" element={<>
            <header className="App-header">
              <img src={'/h2yo_logo.webp'} className="App-logo" alt="logo" />
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >
                
                <PasswordResetEmailContainer />
              </Box>
            </header>
          </>} />
          <Route path="/setnewpassword/:token/:email" element={<>
            <header className="App-header">
              <img src={'/h2yo_logo.webp'} className="App-logo" alt="logo" />
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >
                <PasswordResetPasswordContainer />
              </Box>
            </header>
          </>} />
          <Route path="/newpassword" element={<></>} />
          <Route path="/invite/accept" element={<>
            <header className="App-header">
              <img src={'/h2yo_logo.webp'} className="App-logo" alt="logo" />
              <RegisterContainer />
            </header>
          </>} />
          <Route path="/invite" element={<><MenuTabs /><InviteContainer /></>} />
          <Route path="/" element={
            <header className="App-header">
              <img src={'/h2yo_logo.webp'} className="App-logo" alt="logo" />
              <Box
                component="form"
                noValidate
                autoComplete="off"
              ><LoginContainer /></Box>
            </header>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
