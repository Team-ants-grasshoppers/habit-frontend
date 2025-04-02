import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckboxSelectionSlice {
  selectedItems: string[];
}

const initialState: CheckboxSelectionSlice = {
  selectedItems: [],
};

const checkboxSelectionSlice = createSlice({
  name: 'checkboxSelection',
  initialState,
  reducers: {
    setSelectedItems(state, action: PayloadAction<string[]>) {
      state.selectedItems = action.payload;
    },
  },
});

export const { setSelectedItems } = checkboxSelectionSlice.actions;
export default checkboxSelectionSlice.reducer;
