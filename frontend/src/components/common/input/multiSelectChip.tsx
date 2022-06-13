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
  onChange: any,
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

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultiSelectChip (props: IMultiSelectChip) {

  const { selectOptions, label, ...selectProps } = props;

  return <div>
    <FormControl sx={{ m: 1, width: 300 }} size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        sx={{ maxWidth: '230px' }}
        labelId="demo-multiple-chip-label"
        multiple
        input={<OutlinedInput id="select-multiple-chip" label={label} />}
        renderValue={(selected: Array<SelectType>) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((x: SelectType, i: number) => (
              <Chip size="small" key={i} label={x.name} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
        {...selectProps}
      >
        {selectOptions.map((x: SelectType, i: number) => (
          <MenuItem
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