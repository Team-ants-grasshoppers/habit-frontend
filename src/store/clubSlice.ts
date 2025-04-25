import { createSlice } from '@reduxjs/toolkit';
import * as clubApi from '../features/club/api/clubApi';

interface ClubState {
  clubName: string;
  description: string;
  category: string;
  region: string;
  imageUrl: string;
  loading: boolean;
  error: string | null;
}
const initialState: ClubState = {
  clubName: '',
  description: '',
  category: '',
  region: '',
  imageUrl: '',
  loading: false,
  error: null,
};

const clubSlice = createSlice({
  name: 'club',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clubApi.fetchClubDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clubApi.fetchClubDetail.fulfilled, (state, action) => {
        state.loading = false;
        state = action.payload;
      })
      .addCase(clubApi.fetchClubDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '불러오기 실패';
      });
  },
});

export default clubSlice.reducer;
