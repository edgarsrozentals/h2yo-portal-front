import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function MenuPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export enum MenuTypes {
  HOME = 'home',
  STATISTICS = 'statistics',
  SHOP = 'shop',
  INVITE = 'invite',
  LOGOUT = '',
}
const MENU_MAP = [MenuTypes.HOME, MenuTypes.STATISTICS, MenuTypes.SHOP, MenuTypes.INVITE, MenuTypes.LOGOUT];

export default function MenuTabs() {
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();

  const setPageHandler = (page: MenuTypes) => {

    navigate('/' + page);
    
    return;
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);

    setPageHandler(MENU_MAP[newValue]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Statistics" {...a11yProps(1)} />
          <Tab label="Shop" {...a11yProps(2)} />
          <Tab label="Invite" {...a11yProps(3)} />
          <Tab label="Logout" {...a11yProps(4)} />
        </Tabs>
      </Box>
    </Box>
  );
}