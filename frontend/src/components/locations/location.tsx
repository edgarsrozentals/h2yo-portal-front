import { Box, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import React, { useState } from 'react';
import { SelectType } from '../common/types';
import { SelectChangeEvent } from '@mui/material';
import SelectCP from '../common/input/multiSelectChip';
import MultiSelectChip from '../common/input/multiSelectChip';
import TextField from '@mui/material/TextField';


export type LocationFormType = {
  name: string,
  street: string,
  street2: string,
  zip: string,
  city: string,
  country: string
}

export type LocationPropps = {
  id: number,
  name: string,
  street: string,
  street2: string,
  zip: string,
  city: string,
  country: string,
  devices: Array<SelectType>,
  allDevices: Array<SelectType>,
  responsibles: Array<SelectType>,
  allResponsibles: Array<SelectType>,
  onLocationSave: (id: number, data: LocationFormType) => Promise<void>,
  onChangeDevice: (id: number, data: Array<SelectType>) => Promise<void>,
  onChangeResponsible: (id: number, data: Array<SelectType>) => Promise<void>,
}

const RenderTxtField = ({ edit, value, label, onChange }: {label: string, edit: boolean, value: string, onChange: (event: any) => void}) => {

  if (edit) {
    return <TextField size="small" sx={{ fontSize: '1.5em', marginBottom: '5px' }} label={label} onChange={onChange} variant="standard" value={value} />;
  } else {
    return <Typography variant="body2">{value}</Typography>;
  }

};

const Location = ({ id, name, street, street2, zip, city, country, 
  allDevices, 
  devices,
  responsibles,
  allResponsibles,
  onChangeDevice,
  onChangeResponsible,
  onLocationSave
}: LocationPropps) => {

  const theme = useTheme();
  const [editEnabled, setEditEnabled] = useState(false);
  const [formData, setFormData]= useState<LocationFormType>({
    name: name,
    street: street,
    street2: street2,
    zip: zip,
    city: city,
    country: country
  });

  const toggleEdit = () => {

    if (editEnabled) {
      onLocationSave(id, formData);
    }

    setEditEnabled(!editEnabled);
  };

  const deviceChangeHandler = (data: SelectType[]) => {

    onChangeDevice(id, data);
  };

  const responChangeHandler = (data: SelectType[]) => {

    onChangeResponsible(id, data);
  };
  

  return <Card sx={{ width: '260px', height: '380px' }}>
    <CardContent sx={{ backgroundColor: theme.palette.primary.dark, padding: theme.spacing(1) }}>
      <Typography variant="h6" color="common.white">{formData.name}</Typography>
    </CardContent>
    <CardContent sx={{ padding: theme.spacing(1), display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      alignContent: 'space-between',
      height: '314px',
      overflowY: 'auto',
      overflowX: 'hidden'
    }}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div><Typography variant="body1">Address</Typography></div>
          {/*<div><Typography variant="caption" sx={{ cursor: 'pointer' }} onClick={()=>toggleEdit()}>{editEnabled ? 'SAVE' : 'EDIT'}</Typography></div>*/}
        </Box>
        <Box>
          {editEnabled ? <RenderTxtField
            label={'Location name'}
            value={formData.name}
            edit={editEnabled}
            onChange={(event: any) => setFormData({ ...formData, ...{ name: event?.target?.value } })} 
          /> : null }
          <RenderTxtField
            label={'Address line 1'}
            value={formData.street}
            edit={editEnabled}
            onChange={(event: any) => setFormData({ ...formData, ...{ street: event?.target?.value } })} 
          />
          <RenderTxtField label={'Address line 2'} value={formData.street2} edit={editEnabled} 
            onChange={(event: any) => setFormData({ ...formData, ...{ street2: event?.target?.value } })} />
          <RenderTxtField label={'Zip'} value={formData.zip} edit={editEnabled}
            onChange={(event: any) => setFormData({ ...formData, ...{ zip: event?.target?.value } })} />
          <RenderTxtField label={'City'} value={formData.city} edit={editEnabled}
            onChange={(event: any) => setFormData({ ...formData, ...{ city: event?.target?.value } })} />
          <RenderTxtField label={'Country'} value={formData.country} edit={editEnabled}
            onChange={(event: any) => setFormData({ ...formData, ...{ country: event?.target?.value } })} />
        </Box>
      </Box>
      {!editEnabled ? <Box sx={{ borderTop: '1px solid', borderColor: theme.palette.gray }}>
        <MultiSelectChip
          label="Devices in this location"
          selectOptions={allDevices}
          value={devices}
          readOnly={true}
          onSelectOption={deviceChangeHandler}
        />
        <MultiSelectChip
          label="Contacts assigned"
          selectOptions={allResponsibles}
          value={responsibles}
          onSelectOption={responChangeHandler}
        />
      </Box> : null}
      
    </CardContent>
  </Card>
  ;
};

export default Location;