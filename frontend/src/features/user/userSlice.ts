import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export enum ContactRole {
  CUSTOMER = 'CUSTOMER',
  ACCOUNT_OWNER = 'HOD',
  LOCATION = 'LOCATION',
  LOCATION_USER = 'LOCATION MNG',
  CUSTOMER_USER = 'CUSTOMER MNG',
  VENDOR = 'VENDOR',
  ADMIN = 'ADMIN',
  ACCOUNT_OWNER_USER = 'ACCOUNT USER',
  ACCOUNT_OWNER_MNG = 'ACCOUNT OWNER MNG'
}

export enum RegStage {
  inProgress = 'inProgress',
  completed = 'completed',
  error = 'error',
}

export interface UserState {
  data: object;
  odooData: object;
  permissions: Array<string>,
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  odooData: {},
  data: {},
  permissions: [],
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    //   const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return '';
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addData: (state, action: PayloadAction<object>) => {

      state.data = action.payload;
    },
    addOdooData: (state, action) => {
      state.odooData = action.payload;
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      });
  },
});

export const selectOdooData = (state: RootState) => state.user.odooData;
export const selectData = (state: RootState) => state.user.data;
export const getPermissions = (state: RootState) => state.user.permissions;

export const { addData, addOdooData, setPermissions } = userSlice.actions;

export default userSlice.reducer;
