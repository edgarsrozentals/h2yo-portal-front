import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ManageAccounts from '@mui/icons-material/ManageAccounts';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export enum MenuTypes {
    HOME = 'home',
    DEVICES = 'devices',
    ORDER_HISTORY = 'order-history',
    TEAM_MANAGEMENT = 'team-management',
    ADDRESSES = 'addresses',
    ACCOUNT = 'account',
    SHOP = 'shop',
    INVITE = 'invite',
    LOGOUT = 'logout',
}

const settings = [
  [MenuTypes.ADDRESSES, 'Addresses'], 
  [MenuTypes.ORDER_HISTORY, 'Order History'], 
  [MenuTypes.TEAM_MANAGEMENT, 'Team management'], 
  [MenuTypes.ACCOUNT, 'Account'], 
  [MenuTypes.LOGOUT, 'Logout']
];

const pages = [
  [MenuTypes.HOME, 'Home'], 
  [MenuTypes.DEVICES, 'Devices'], 
  [MenuTypes.SHOP, 'Shop']
];

export default function AppBarComp () {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const setPageHandler = (page: MenuTypes) => {

    navigate('/' + page);
    
    return;
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <img src={'/h2yo_logo.webp'} className="App-logo" alt="logo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page[0]} onClick={() => {
                  setPageHandler(page[0] as MenuTypes); 
                  handleCloseNavMenu();
                }}>
                  <Typography textAlign="center">{page[1]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page[0]}
                onClick={() => {
                  setPageHandler(page[0] as MenuTypes); 
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page[1]}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Button
                startIcon={<ManageAccounts />}
                id="demo-customized-button"
                aria-controls={Boolean(anchorElUser) ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorElUser) ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleOpenUserMenu}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Account & list
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting[0]} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={() => {setPageHandler(setting[0] as MenuTypes);}}>{setting[1]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}