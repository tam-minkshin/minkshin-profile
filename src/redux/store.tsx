import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import responseApiSlice from './slices';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})
export const store = configureStore({
  reducer: {
    response:responseApiSlice
  },
  middleware: customizedMiddleware,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;