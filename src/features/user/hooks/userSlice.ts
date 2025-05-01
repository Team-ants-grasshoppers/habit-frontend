import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLogin: boolean;
  userId: string | null;
  nickname: string | null;
  email: string | null;
  userProfile: string | null;
}

const initialState: UserState = {
  isLogin: false,
  userId: null,
  nickname: null,
  email: null,
  userProfile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        userId: string;
        nickname: string;
        email: string;
        userProfile: string | null;
      }>,
    ) => {
      state.isLogin = true;
      state.userId = action.payload.userId;
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
      state.userProfile = action.payload.userProfile || null;
    },
    logout: (state) => {
      state.isLogin = false;
      state.userId = null;
      state.nickname = null;
      state.email = null;
      state.userProfile = null;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
