import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortingBy: 'cheapest',
};

export const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  selectors: {
    selectSortingType: (state) => state.sortingBy,
  },
  reducers: {
    setSort: (state, action) => {
      state.sortingBy = action.payload;
    },
  },
});

export const { setSort } = sortingSlice.actions;
export const { selectSortingType } = sortingSlice.selectors;
export default sortingSlice.reducer;
