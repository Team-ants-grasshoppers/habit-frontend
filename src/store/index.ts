import { configureStore } from '@reduxjs/toolkit';
import checkboxSelectionReducer from '../common/components/ui/hooks/checkboxSelectionSlice';

export const store = configureStore({
  reducer: {
    checkboxSelection: checkboxSelectionReducer,
  },
});

// ✅ 여기가 중요!
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
