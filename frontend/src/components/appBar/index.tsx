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
import { Avatar, useTheme } from '@mui/material';

export enum MenuTypes {
    HOME = 'home',
    DEVICES = 'devices',
    ORDER_HISTORY = 'order-history',
    TEAM_MANAGEMENT = 'team-management',
    ADDRESSES = 'addresses',
    PROFILE = 'profile',
    COMPANY_ACCOUNT = 'company-account',
    SHOP = 'shop',
    INVITE = 'invite',
    LOGOUT = '',
    LOCATIONS = 'locations',
    CARTRIGES = 'cartriges',
    SERVICES = 'services',
    ORDERS = 'orders',
    CUSTOMER_SUPPORT = 'customer-support',
    DEBUG = 'debug',
}

const settings = [
  [MenuTypes.COMPANY_ACCOUNT, 'Company Account'],
  [MenuTypes.CUSTOMER_SUPPORT, 'Customer Support'],
  [MenuTypes.PROFILE, 'Profile'],
  [MenuTypes.LOGOUT, 'Logout'],
  [MenuTypes.DEBUG, 'Debug'],
];

const pages = [
  [MenuTypes.HOME, 'Home'], 
  [MenuTypes.LOCATIONS, 'Locations'],
  [MenuTypes.CARTRIGES, 'Cartriges'],
  [MenuTypes.ORDERS, 'Orders'],
];

export default function AppBarComp () {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const theme = useTheme();

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
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.dark }}>
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
            <img src={'/h2yo_logo.webp'} className="App-logo" alt="logo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page[0]}
                onClick={() => {
                  setPageHandler(page[0] as MenuTypes); 
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: 'white', display: 'block', margin: theme.spacing(0, 3) }}
              >
                {page[1]}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Avatar sx={{ cursor: 'pointer', bgcolor: theme.palette.primary.main }} onClick={handleOpenUserMenu}>
                <ManageAccounts sx={{ color: theme.palette.common.white }} />
              </Avatar>
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
                <MenuItem 
                  key={setting[0]} 
                  onClick={()=> {
                    setPageHandler(setting[0] as MenuTypes);
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">{setting[1]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}