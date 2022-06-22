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
      color: '#F0C000',
      url: 'https://www.h2yo.co/vitamin-c'
    },
    {
      id: 2,
      name: 'VITAMIN D3 & K2',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
      color: '#6EC3B9',
      url: 'https://www.h2yo.co/vitamin-d3-2k'
    },
    {
      id: 3,
      name: 'MULTIVITAMIN',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
      color: '#C060F0',
      url: 'https://www.h2yo.co/vitamin-d3-2k'
    },
    {
      id: 4,
      name: 'MULTIVITAMIN',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
      color: '#6B9DFF',
      url: 'https://www.h2yo.co/multi-vitamin'
    },
    {
      id: 5,
      name: 'VITAMIN C',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
      color: '#D73080',
      url: 'https://www.h2yo.co/vitamin-c'
    },
    {
      id: 6,
      name: 'VITAMIN D3 & K2',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
      color: '#EF7402',
      url: 'https://www.h2yo.co/vitamin-d3-2k'
    },
    {
      id: 7,
      name: 'MULTIVITAMIN',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
      color: '#36B143',
      url: 'https://www.h2yo.co/multi-vitamin'
    },
    {
      id: 8,
      name: 'MULTIVITAMIN',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
      color: '#ADA345',
      url: 'https://www.h2yo.co/multi-vitamin'
    },
    {
      id: 9,
      name: 'VITAMIN C',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
      color: '#74C721',
      url: 'https://www.h2yo.co/vitamin-c'
    },
    {
      id: 10,
      name: 'VITAMIN D3 & K2',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
      color: '#FF7777',
      url: 'https://www.h2yo.co/vitamin-d3-2k'
    },
    {
      id: 11,
      name: 'MULTIVITAMIN',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
      color: '#846BFF',
      url: 'https://www.h2yo.co/multi-vitamin'
    },
    {
      id: 12,
      name: 'MULTIVITAMIN',
      contents: 'Liposomal 250ml',
      priceCart: '25.00',
      priceShot: '0.25',
      color: '#FB4550',
      url: 'https://www.h2yo.co/multi-vitamin'
    }
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
