import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ticketsAPI from '../../api/ticketsAPI';

const initialState = {
  searchId: null,
  countToRender: 5,
  stop: false,
  data: null,
  error: '',
  currentRequestId: null,
  requestCount: {
    errorsCount: 0,
    succeedCount: 0,
  },
};

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async (_, { signal }) => {
  const searchId = await ticketsAPI.fetchSearchId(signal);
  return searchId;
});

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (searchId, { getState, rejectWithValue }) => {
    const { data } = getState().tickets;

    try {
      const { tickets, stop } = await ticketsAPI.fetchTicketsById(searchId);

      return { tickets, stop };
    } catch (err) {
      if (data) {
        return rejectWithValue('Данные получены не полностью');
      }
      return rejectWithValue(err.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { searchId, currentRequestId, error } = getState().tickets;
      return !currentRequestId && !!searchId && !error;
    },
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  selectors: {
    selectFetchingError: (state) => state.error,
    selectFetchingSearchId: (state) => state.searchId,
    selectFetchingStop: (state) => state.stop,
    selectFetchingCountToRender: (state) => state.countToRender,
    selectFetchingData: (state) => state.data,
    selectRequestCount: (state) => state.requestCount,
  },
  reducers: {
    setCountToRender: (state, action) => {
      state.countToRender = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
      })
      .addCase(fetchTickets.pending, (state, action) => {
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.requestCount.errorsCount++;
        if (state.requestCount.errorsCount >= 3) {
          state.error = action.payload;
        }
        state.currentRequestId = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        if (!state.data) {
          state.data = action.payload.tickets;
        } else {
          state.data.push(...action.payload.tickets);
        }
        state.requestCount.errorsCount = 0;
        state.requestCount.succeedCount++;
        state.error = '';
        state.stop = action.payload.stop;
        state.currentRequestId = null;
      });
  },
});

export const { setCountToRender } = ticketsSlice.actions;
export const {
  selectFetchingError,
  selectFetchingStop,
  selectFetchingCountToRender,
  selectFetchingSearchId,
  selectFetchingData,
  selectRequestCount,
} = ticketsSlice.selectors;
export default ticketsSlice.reducer;
