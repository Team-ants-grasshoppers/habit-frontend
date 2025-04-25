import { createSlice } from '@reduxjs/toolkit';

interface MemberState {
  memberId: string;
  nickname: string;
  profileImageUrl: string;
  role: 'admin' | 'member' | 'pending';
}

const initialState: MemberState[] = [];

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase('club/fetchClubMembers/fulfilled', (state, action) => {});
  },
});
