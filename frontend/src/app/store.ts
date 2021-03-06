import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import logger from 'redux-logger';
import cartrigesReducer from '../features/cartriges/cartrigesSlice';
import devices from '../features/devices/devicesSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    // prepend and concat calls can be chained
      .concat(logger),
  reducer: {
    counter: counterReducer,
    user: userReducer,
    cartriges: cartrigesReducer,
    devices: devices
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
