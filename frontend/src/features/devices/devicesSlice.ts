import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export type DeviceData = {
  id: string,
  SN: string,
  name: string,
  ownerId: number,
  ownerName: string,
  customerId: number,
  customerName: string,
  locationId: number,
  locationName: string,
  dateCreated: string,
  status: string
}

export interface IDevicesState {
    data: Array<DeviceData>
  }

const initialState: IDevicesState = {
  data: [
  ],
};


export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addData: (state, action: PayloadAction<Array<DeviceData>>) => {

      state.data = action.payload;
    },
  },
});

export const getDevices = (state: RootState) => state.devices.data;

export const { addData } = devicesSlice.actions;

export default devicesSlice.reducer;
