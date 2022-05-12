import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export type CartrigeType = {
  id: number,
  name: string,
  priceShot: string,
  priceCart: string,
  contents: string,
  color?: string,
  url?: string
}

export interface ICartrigesState {
    cartriges: Array<CartrigeType>
  }

const initialState: ICartrigesState = {
  cartriges: [
    {
      id: 1,
      name: 'VITAMIN C',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
    },
    {
      id: 2,
      name: 'VITAMIN D3 & K2',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
    },
    {
      id: 3,
      name: 'MULTIVITAMIN',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
    },
    {
      id: 4,
      name: 'MULTIVITAMIN',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
    },
    {
      id: 5,
      name: 'VITAMIN C',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
    },
    {
      id: 6,
      name: 'VITAMIN D3 & K2',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
    },
    {
      id: 7,
      name: 'MULTIVITAMIN',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
    },
    {
      id: 8,
      name: 'MULTIVITAMIN',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
    },
    {
      id: 9,
      name: 'VITAMIN C',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
    },
    {
      id: 10,
      name: 'VITAMIN D3 & K2',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
    },
    {
      id: 11,
      name: 'MULTIVITAMIN',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
    },
    {
      id: 12,
      name: 'MULTIVITAMIN',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
    },
  ],
};


export const cartrigesSlice = createSlice({
  name: 'cartriges',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  },
});

export const selectCartriges = (state: RootState) => state.cartriges.cartriges;

export default cartrigesSlice.reducer;
