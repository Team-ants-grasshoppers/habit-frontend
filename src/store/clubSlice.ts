import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as clubApi from '../features/club/api/clubApi';

interface ClubState {
  clubDetail: {
    name: string;
    description: string;
    category: string;
    region: string;
  } | null;
  members: {
    member_id: number;
    nickname: string;
    role: 'admin' | 'member' | 'pending';
  }[];
  loading: boolean;
  error: string | null;
}

const initialState: ClubState = {
  clubDetail: null,
  members: [],
  loading: false,
  error: null,
};

// 클럽 상세 정보 가져오기
export const fetchClubDetail = createAsyncThunk('club/fetchDetail', async (clubId: number) => {
  const data = await clubApi.fetchClubDetail(clubId);
  return data;
});

// 클럽 멤버 리스트 가져오기
export const fetchClubMembers = createAsyncThunk('club/fetchMembers', async (clubId: number) => {
  const data = await clubApi.fetchClubMembers(clubId);
  return data;
});

const clubSlice = createSlice({
  name: 'club',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClubDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.clubDetail = action.payload;
      })
      .addCase(fetchClubDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '불러오기 실패';
      })
      .addCase(fetchClubMembers.fulfilled, (state, action) => {
        state.members = action.payload;
      });
  },
});

export default clubSlice.reducer;
