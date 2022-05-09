import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const RenderCard = ({ title, description }: {title: string, description: string}) => {
    
  return <Card><Box sx={{ display: 'flex', flexDirection: 'row' }}>
    <Box sx={{ width: '4em', height: 'auto', display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        Icon
      </CardContent>
    </Box>
    <Box sx={{ alignItems: 'left', pl: 1, pb: 1 }}>
      <Typography variant="h5" component="div">{title}</Typography>
      <Typography variant="body2">
        {description}
      </Typography>
    </Box>
  </Box>
  </Card>;
};

const dashboardItems = [
  { title: 'Deliver', description: 'Manage your locations & add new ones' },
  { title: 'Invoices', description: 'view order history & invoices' },
  { title: 'Cartriges', description: 'Learn about your products' },
  { title: 'Account details', description: 'Billing information & account details' }
];

export default function Dashboard() {

  const navigate = useNavigate();

  return <Box maxWidth={800}>
    <Grid 
      container 
      alignItems={'center'}
      padding={5}
      spacing={2}
    >{dashboardItems.map((x, i)=><Grid key={i} item md={6} sm={6} xs={12}><RenderCard {...x} /></Grid>)}</Grid>
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
          <Grid item md={2} sm={2} xs={2}>
            <div>TEST</div>
          </Grid>
          <Grid item md={8} sm={8} xs={8}>
            <Typography variant="body1" component="div">Water dispensed</Typography>
            <Typography variant="h5" component="div">13440L*</Typography></Grid>
        </Grid>
      </Grid>
      <Grid item md={4} sm={4} xs={12}>
        <Grid container>
          <Grid item md={2} sm={2} xs={2}>
            <div>TEST</div>
          </Grid>
          <Grid item md={8} sm={8} xs={8}>
            <Typography variant="body1" component="div">Plastic bottles saved</Typography>
            <Typography variant="h5" component="div">10200*</Typography></Grid>
        </Grid>
      </Grid>
      <Grid item md={4} sm={4} xs={12}>
        <Grid container>
          <Grid item md={2} sm={2} xs={2}>
            <div>TEST</div>
          </Grid>
          <Grid item md={8} sm={8} xs={8}>
            <Typography variant="body1" component="div">Money saved</Typography>
            <Typography variant="h5" component="div">1040 Є*</Typography></Grid>
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
      <Grid item md={4} sm={4} xs={12}>
        <Typography variant="h5" component="div">Let us know!</Typography>
        <Typography variant="body1" component="div">Reach out if there are any quations or need for support!</Typography>
      </Grid>
      <Grid item md={8} sm={8} xs={12}>
        <Button size="medium" variant="contained" onClick={()=>{navigate('/contacts');}}>
            Contacts
        </Button>
      </Grid>
    </Grid>
  </Box>;
}