import { Alert, Box, Container, Grid, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import MultiSelectChip from '../common/input/multiSelectChip';
import TableCP, { RowData } from '../common/table';
import { SelectType } from '../common/types';
import { OrderTypeEntry } from './orderType';

export default function Orders({ data, locations, error }: {data: OrderTypeEntry[], locations: SelectType[], error: string }) {
    
  const theme = useTheme();

  const [locationsFiltred, setLocationsFiltred] = useState<SelectType[]>([]);

  const selectOptionsHandler = (filterVal: SelectType[] | SelectType) => {

    setLocationsFiltred(filterVal as SelectType[]);
    return;
  };

  const filterIds = locationsFiltred.map(x=>x.id);

  if (locationsFiltred.length > 0) {
    data = data.filter(x => filterIds.includes(x.location.id));
  }
  

  return <Container sx={{ padding: theme.spacing(6) }}>
    <Typography variant="h4">Orders</Typography>
    <Typography variant="body1">Keep Track of your orders</Typography>
    {error ? <Grid item><Alert severity="error">{error}</Alert></Grid> : null}
    <Box>
      <MultiSelectChip 
        label="Locations"
        value={locationsFiltred}
        selectOptions={locations}
        onSelectOption={selectOptionsHandler}
      />
      <TableCP data={data} />
    </Box>
  </Container>;
}