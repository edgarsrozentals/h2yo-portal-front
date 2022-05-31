import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { get } from '../../api';

type ComponentProps = {
    execute: (executeType: string, data: any) => void
}

const cartrigeIDs = [
  '1111',
  '2222',
  '3333',
  '4444',
  '5555',
  '6666',
  '7777',
];

export default function DebugComponent({ execute }: ComponentProps) {

  const [accumParams, setAccumParams] = useState({ companyId: 0, locationId: 0 });
  const [accumData, setAccumData] = useState<Array<{name: string, volume: number}>>([]);

  const [starterData, setStarterData] = useState({ companyId: 0, locationId: 0 });
  const [repeatData, setRepeatData] = useState({
    '1111': 0,
    '2222': 0,
    '3333': 0,
    '4444': 0,
    '5555': 0,
    '6666': 0,
    '7777': 0,
    companyId: 0, 
    locationId: 0 
  });

  const getAccumDataHandler = async () => {

    const payload = await get('cartrige/accumulation');

    if (payload.status === 200) {
      setAccumData(payload.data);
    }
  };

  return <Grid
    container 
    alignItems={'center'}
    padding={5}
    spacing={2}
  >
    <Grid item md={8} sm={8} xs={12} />
    <Grid item md={12} sm={12} xs={12}>
      <TextField 
        size="small" 
        label="Company ID" 
        variant="outlined"
        sx={{ margin: 1 }}
        value={starterData.companyId} 
        onChange={(ev)=>{setStarterData({ ...starterData, ...{ companyId: parseInt(ev.target.value) } });}}
      />
      <TextField 
        size="small" 
        label="Location ID" 
        variant="outlined" 
        sx={{ margin: 1 }}
        value={starterData.locationId} 
        onChange={(ev)=>{setStarterData({ ...starterData, ...{ locationId: parseInt(ev.target.value) } });}}
      />
      <Button sx={{ margin: 1 }} 
        size="medium" variant="contained" 
        onClick={()=>{execute('starterpackinvoice', starterData);}}
      >
          Order Starter Pack (Invoice)
      </Button>
      <Button sx={{ margin: 1 }} 
        size="medium" variant="contained"
        onClick={()=>{execute('starterpackorder', starterData);}}
      >
          Order Starter Pack (Order)
      </Button>
    </Grid>
    <hr />
    <Grid item md={12} sm={12} xs={12}>
      <TextField 
        sx={{ margin: 1 }}
        size="small" 
        label="Company ID" 
        variant="outlined" 
        value={repeatData.companyId} 
        onChange={(ev)=>{setRepeatData({ ...repeatData, ...{ companyId: parseInt(ev.target.value) } });}}
      />
      <TextField 
        sx={{ margin: 1 }}
        size="small" 
        label="Location ID" 
        variant="outlined" 
        value={repeatData.locationId} 
        onChange={(ev)=>{setRepeatData({ ...repeatData, ...{ locationId: parseInt(ev.target.value) } });}}
      />
    </Grid>
    <Grid item md={12} sm={12} xs={12}>
      {cartrigeIDs.map((x, i)=> <TextField 
        key={i}
        type="number"
        size="small" 
        sx={{ margin: 1 }}
        label={x}
        variant="outlined" 
        value={(repeatData as any)[x]} 
        onChange={(ev)=>{setRepeatData({ ...repeatData, ...{ [x]: parseInt(ev.target.value) } });}}
      />)}
    </Grid>
    <Grid item>
      <Button sx={{ margin: 1 }} size="medium" variant="contained" onClick={()=>{execute('repeatorderpack', repeatData);}}>
          Order Repat Pack (Order)
      </Button>
    </Grid>
    <hr />
    <Grid item md={12} sm={12} xs={12}>
      <TextField 
        size="small" 
        sx={{ margin: 1 }}
        label="Company ID" 
        variant="outlined" 
        value={accumParams.companyId} 
        onChange={(ev)=>{setAccumParams({ ...accumParams, ...{ companyId: parseInt(ev.target.value) } });}}
      />
      <TextField 
        size="small" 
        sx={{ margin: 1 }}
        label="Location ID" 
        variant="outlined" 
        value={accumParams.locationId} 
        onChange={(ev)=>{setAccumParams({ ...accumParams, ...{ accumlocationIdParams: parseInt(ev.target.value) } });}}
      />

    </Grid>
    <Grid item md={12} sm={12} xs={12}>
      <Button sx={{ margin: 1 }} size="medium" variant="contained" onClick={getAccumDataHandler}>
          View Cartrige Order Accumulation
      </Button>
    </Grid>
    <Grid item md={12} sm={12} xs={12}>
      {accumData.map((x, i)=> <TextField 
        sx={{ margin: 1 }}
        key={i}
        type="number"
        size="small" 
        disabled={true}
        label={x.name}
        variant="outlined" 
        value={x.volume} 
      />)}
    </Grid>
  </Grid>;
}