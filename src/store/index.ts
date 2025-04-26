import { configureStore } from '@reduxjs/toolkit';
import checkboxSelectionReducer from '../common/components/ui/hooks/checkboxSelectionSlice';
import userReducer from '../features/user/hooks/userSlice';
import recentClubReducer from '../store/recentClubSlice';
import recentThunderReducer from '../store/recentThunderSlice';

export const store = configureStore({
  reducer: {
    checkboxSelection: checkboxSelectionReducer,
    user: userReducer,
    recentClub: recentClubReducer,
    recentThunder: recentThunderReducer,
  },
});

// ✅ 여기가 중요!
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
