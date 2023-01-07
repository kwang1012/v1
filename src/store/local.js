import { createSlice } from '@reduxjs/toolkit';

export const localSlice = createSlice({
  name: 'local',
  initialState: {
    likes: {},
  },
  reducers: {
    thumb: (state, { payload }) => {
      const commentId = payload;
      if (!state.likes[commentId]) {
        state.likes[commentId] = true;
      } else {
        state.likes[commentId] = false;
      }
    },
  },
});

export const { thumb } = localSlice.actions;

export default localSlice.reducer;
