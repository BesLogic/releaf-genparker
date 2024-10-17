import { createSlice } from '@reduxjs/toolkit';

export const treeDefinitionSlice = createSlice({
  name: 'treeDefinitions',
  initialState: {
    value: [],
  },
  reducers: {
    load: (_) => {
      void 0;
    },
    loaded: (state, result) => {
      state.value = result.payload;
    },
  },
});

export const { load, loaded } = treeDefinitionSlice.actions;

export const selectTreeDefinitions = (state) => state.treeDefinitions.value;

export default treeDefinitionSlice.reducer;