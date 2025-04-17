import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckboxSelectionSlice {
  interests: string[];
  regions: string[];
}

const initialState: CheckboxSelectionSlice = {
  interests: [],
  regions: [],
};

const checkboxSelectionSlice = createSlice({
  name: 'checkboxSelection',
  initialState,
  reducers: {
    setInterests(state, action: PayloadAction<string[]>) {
      state.interests = action.payload;
    },
    setRegions(state, action: PayloadAction<string[]>) {
      state.regions = action.payload;
    },
  },
});

export const { setInterests, setRegions } = checkboxSelectionSlice.actions;
export default checkboxSelectionSlice.reducer;
