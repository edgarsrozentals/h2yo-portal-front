import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { SelectType } from '../types';
import { SelectProps } from '@mui/material';

interface IMultiSelectChip extends SelectProps {
  value: any,
  onSelectOption: (data: SelectType[]) => void,
  label: string,
  selectOptions: Array<SelectType>
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultiSelectChip (props: IMultiSelectChip) {

  const { selectOptions, label, value, onSelectOption, onChange, ...selectProps } = props;

  const valueIds = value.map((x: SelectType)=>x.id);

  const optionsIdMap: any = {};
  selectOptions.map((x: SelectType)=>optionsIdMap[x.id] = { id: x.id, name: x.name });

  const changeHandler = (event: any) => {

    if (props.multiple === undefined || props.multiple) {
      const values = event.target.value as Array<number>;
      onSelectOption(values.map(x=>optionsIdMap[x]));
    } else {
      onSelectOption([optionsIdMap[event.target.value]]);
    }

  };

  return <div>
    <FormControl sx={{ m: 1, width: 300 }} size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        size="small"
        sx={{ maxWidth: '230px' }}
        labelId="demo-multiple-chip-label"
        multiple
        value={value.map((x: SelectType)=>x.id)}
        onChange={changeHandler}
        input={<OutlinedInput id="select-multiple-chip" label={label} />}
        renderValue={(selected: Array<number>) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((x: number, i: number) => {
              if (typeof optionsIdMap[x] === 'undefined') {
                return <Chip size="small" key={i} label={'unknown_' + x} />;
              } else {
                return <Chip size="small" key={i} label={optionsIdMap[x].name} />;
              }
              
            })}
          </Box>
        )}
        MenuProps={MenuProps}
        {...selectProps}
      >
        {selectOptions.map((x: SelectType, i: number) => (
          <MenuItem
            dense={true}
            key={i}
            value={x.id}
          >
            {x.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>;
}