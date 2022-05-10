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

const RenderCard = (props: {title: string, description: string, url: string, onClick: (url: string) => void}) => {
  const { title, description, onClick, url } = props;
  const theme = useTheme();

  return <Paper onClick={()=> onClick( url ) } elevation={1}><Box sx={{ display: 'flex', flexDirection: 'row' }}>
    <Box sx={{ width: '4em', height: 'auto', display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
      <CardContent sx={{ flex: '1 0 auto', backgroundColor: 'lightgray', borderRadius: 2 }}>
        <TsunamiIcon sx={{ width: '2em', height: 'auto', }} />
      </CardContent>
    </Box>
    <Box sx={{ alignItems: 'left', pl: 2, pb: 2, padding: theme.spacing(2, 2, 2, 3) }}>
      <Typography variant="h5" component="div">{title}</Typography>
      <Typography variant="body2">
        {description}
      </Typography>
    </Box>
  </Box>
  </Paper >;
};

const dashboardItems = [
  { title: 'Deliver', description: 'Manage your locations & add new ones', url: '/deliver' },
  { title: 'Invoices', description: 'view order history & invoices', url: '/invoices' },
  { title: 'Cartriges', description: 'Learn about your products', url: '/cartriges' },
  { title: 'Account details', description: 'Billing information & account details', url: '/account' }
];

export default function Dashboard() {

  const navigate = useNavigate();
  const theme = useTheme();

  const handleCardClick = (url: string) => {

    navigate(url);
  };

  return <Container>
    <Grid 
      container 
      alignItems={'center'}
      padding={5}
      spacing={2}
    >{dashboardItems.map((x, i)=><Grid key={i} item md={6} sm={6} xs={12}><RenderCard {...x} onClick={handleCardClick} /></Grid>)}</Grid>
    <hr />
    <Grid
      container 
      alignItems={'center'}
      padding={5}
      spacing={2}
    >
      <Grid item md={6} sm={6} xs={12}><Typography variant="h5" component="div">Your impact using H2YO so far</Typography></Grid>
      <Grid item md={6} sm={6} xs={12}>H2YO helps your team to stay hydrated by making the process more enjoyable and providing only natural & health ingredients that are good for the body.</Grid>
    </Grid>
    <Grid
      container 
      alignItems={'center'}
      padding={5}
      spacing={2}
    >
      <Grid item md={4} sm={4} xs={12}>
        <Grid container>
          <Grid item md={3} sm={3} xs={3} sx={{ padding: theme.spacing(2) }}>
            <TsunamiIcon sx={{ width: '2em', height: 'auto', }} />
          </Grid>
          <Grid item md={8} sm={8} xs={8}>
            <Typography variant="body1" component="div">Water dispensed</Typography>
            <Typography variant="h5" component="div">13440L*</Typography></Grid>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="body2" fontSize="0.8em" component="div">* Dispensed via h2yo devices</Typography>
        </Grid>
      </Grid>
      <Grid item md={4} sm={4} xs={12}>
        <Grid container>
          <Grid item md={3} sm={3} xs={3} sx={{ padding: theme.spacing(2) }}>
            <TsunamiIcon sx={{ width: '2em', height: 'auto', }} />
          </Grid>
          <Grid item md={8} sm={8} xs={8}>
            <Typography variant="body1" component="div">Plastic bottles saved</Typography>
            <Typography variant="h5" component="div">10200*</Typography></Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Typography variant="body2" fontSize="0.8em" component="div">*eqvivalent to 0.5L plastic bottles</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4} sm={4} xs={12}>
        <Grid container>
          <Grid item md={3} sm={3} xs={3} sx={{ padding: theme.spacing(2) }}>
            <TsunamiIcon sx={{ width: '2em', height: 'auto', }} />
          </Grid>
          <Grid item md={9} sm={9} xs={9}>
            <Typography variant="body1" component="div">Money saved</Typography>
            <Typography variant="h5" component="div">1040 Є*</Typography></Grid>
          
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="body2" fontSize="0.8em" component="div">* Compared to a tipical price of a soft drink at a retail cost of 0.50 eur/L</Typography>
        </Grid>
      </Grid>
    </Grid>
    <hr />
    <Grid
      container 
      alignItems={'center'}
      padding={5}
      spacing={2}
    >
      <Grid item md={8} sm={8} xs={12}>
        <Typography variant="h5" component="div">Let us know!</Typography>
        <Typography variant="body1" component="div">Reach out if there are any quations or need for support!</Typography>
      </Grid>
      <Grid item md={4} sm={4} xs={12}>
        <Button size="medium" variant="contained" onClick={()=>{navigate('/contacts');}}>
            Contacts
        </Button>
      </Grid>
    </Grid>
  </Container>;
}