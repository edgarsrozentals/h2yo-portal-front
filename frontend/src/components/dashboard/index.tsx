import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import TsunamiIcon from '@mui/icons-material/Tsunami';
import useTheme from '@mui/material/styles/useTheme';
import { Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { AccountCircleRounded, AddchartOutlined, BubbleChart, BubbleChartRounded, SettingsRounded, SupervisedUserCircleRounded } from '@mui/icons-material';
import { Bottle, Drop, Piggy } from './icons';
import { getPermissions } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';

const RenderCard = (props: {title: string, description: string, url: string, color: string, backgroundColor: string, SectionIcon: any, onClick: (url: string) => void}) => {
  const { title, description, onClick, url, color, SectionIcon, backgroundColor } = props;
  const theme = useTheme();

  return <Paper 
    sx={{ cursor: 'pointer', backgroundColor: backgroundColor }} 
    onClick={()=> onClick( url ) } elevation={0}>
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ width: '4em', height: 'auto', padding: theme.spacing(2, 2, 2, 2), display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flex: '1 0 auto', padding: theme.spacing(1.5), width: 50, height: 50, backgroundColor: color, borderRadius: 2 }}>
          <SectionIcon sx={{ width: '2em', height: 'auto', color: 'white' }} />
        </Box>
      </Box>
      <Box sx={{ alignItems: 'left', pl: 2, pb: 2, padding: theme.spacing(2, 2, 2, 3) }}>
        <Typography variant="h4" component="div">{title}</Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </Box>
    </Box>
  </Paper >;
};

const dashboardItems = [
  { title: 'Locations', SectionIcon: LocationOnIcon, description: 'See your location cartridges are delivered to', url: '/locations', backgroundColor: '#c060f01a',color: '#C060F0' },
  { title: 'Orders', SectionIcon: AddchartOutlined, description: 'View your cartridge invoices', url: '/orders', color: '#F0C000', backgroundColor: '#f0c0001a' },
  { title: 'Cartriges', SectionIcon: BubbleChartRounded, description: 'Learn about your cartridges', url: '/cartriges', backgroundColor: '#ff77771a', color: '#FF7777' },
  { title: 'My company', SectionIcon: SettingsRounded, description: 'Billing information & account details', url: '/account', backgroundColor: '#6ec3b91a', color: '#6EC3B9' },
  { title: 'My team', SectionIcon: SupervisedUserCircleRounded, description: 'Manage team roles & invite new team members', backgroundColor: '#6b9dff1a', url: '/team-management', color: '#6B9DFF', permission: 'MANAGE_TEAM' },
  { title: 'My profile', SectionIcon: AccountCircleRounded, description: 'Manage your Sign in details', url: '/account', backgroundColor: '#bac7231a', color: '#BAC723' }
];

export default function Dashboard() {

  const navigate = useNavigate();
  const theme = useTheme();

  const permissions = useSelector(getPermissions);

  const handleCardClick = (url: string) => {

    navigate(url);
  };

  return <>
    <Container>
      <Grid
        container 
        alignItems={'center'}
        padding={5}
        spacing={2}
      >{dashboardItems.filter(x=>{
          if (typeof x.permission === 'undefined') {
            return true;
          }

          return permissions.includes(x.permission);
        }).map((x, i)=>
          <Grid key={i} item md={6} sm={6} xs={12}>
            <RenderCard {...x} onClick={handleCardClick} />
          </Grid>)
        }</Grid>
      <Box style={{ borderBottom: '1px solid black' }}><Typography variant="h5" component="div">Make an impact with H2YO</Typography></Box>
      <Grid
        container 
        alignItems={'center'}
        padding={theme.spacing(0, 0, 8, 0)}
        spacing={2}
      >
        <Grid item md={4} sm={4} xs={12}>
          <Grid container>
            <Grid item md={3} sm={3} xs={3} sx={{ padding: theme.spacing(2) }}>
              <Drop />
            </Grid>
            <Grid item md={8} sm={8} xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
              <Typography variant="body1" component="div"><strong>Drinks dispensed</strong></Typography>
              <Typography variant="h5" component="div" color={theme.palette.primary.main}><strong>362</strong></Typography></Grid>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Typography variant="body2" fontSize="0.8em" component="div" />
          </Grid>
        </Grid>
        <Grid item md={4} sm={4} xs={12}>
          <Grid container>
            <Grid item md={3} sm={3} xs={3} sx={{ padding: theme.spacing(2) }}>
              <Bottle />
            </Grid>
            <Grid item md={8} sm={8} xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
              <Typography variant="body1" component="div"><strong>Plastic bottles saved</strong></Typography>
              <Typography variant="h5" component="div" color={theme.palette.primary.main}><strong>10200*</strong></Typography></Grid>
            <Grid item md={12} sm={12} xs={12}>
              <Typography variant="body2" fontSize="0.8em" component="div">*eqvivalent to 0.5L plastic bottles</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} sm={4} xs={12}>
          <Grid item>
            <Grid container>
              <Grid item md={3} sm={3} xs={3} sx={{ padding: theme.spacing(2) }}>
                <Piggy />
              </Grid>
              <Grid item md={9} sm={9} xs={9} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                <Typography variant="body1" component="div"><strong>Money saved</strong></Typography>
                <Typography variant="h5" component="div" color={theme.palette.primary.main}><strong>1040 Є*</strong></Typography></Grid>
          
            </Grid>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Typography variant="body2" fontSize="0.8em" component="div">* Compared to a tipical price of a soft drink at a retail cost of 0.50 eur/L</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
    <Box
      sx={{ background: 'url(/homebottombanner.webp)' }}
    >
      <Container>
        <Grid
          container 
          alignItems={'center'}
          padding={5}
          spacing={2}
        >
          <Grid item md={8} sm={8} xs={12}>
            <Typography variant="h4" component="div">Let us know!</Typography>
            <Typography variant="body1" component="div">Reach out if there are any quations or need for support!</Typography>
            <Button size="small" sx={{ margin: theme.spacing(2, 0), padding: theme.spacing(1, 6) }} variant="contained" onClick={()=>{navigate('/contacts');}}>
              CONTACT US
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>;
}