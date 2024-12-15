import { createSlice } from '@reduxjs/toolkit';

export const MAX_TRANSFER_COUNT = 3;

const initialState = {
  transfers: new Array(MAX_TRANSFER_COUNT + 1).fill(true),
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  selectors: {
    selectFilters: (state) => state.transfers,
  },
  reducers: {
    toggleAllTransfers: (state, action) => {
      state.transfers = state.transfers.map(() => action.payload);
    },
    toggleTransfersCount: (state, action) => {
      state.transfers = state.transfers.map((item, index) => {
        if (index === action.payload) {
          return !item;
        }
        return item;
      });
    },
  },
});

export const { toggleAllTransfers, toggleTransfersCount } = filterSlice.actions;
export const { selectFilters } = filterSlice.selectors;
export default filterSlice.reducer;
