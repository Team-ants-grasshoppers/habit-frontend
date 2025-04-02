import { configureStore } from '@reduxjs/toolkit';
import checkboxSelectionReducer from '../common/components/ui/hooks/checkboxSelectionSlice';
import userReducer from '../features/user/hooks/userSlice';

export const store = configureStore({
  reducer: {
    checkboxSelection: checkboxSelectionReducer,
    user: userReducer,
  },
});

// ✅ 여기가 중요!
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
