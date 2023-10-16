import { createSlice } from '@reduxjs/toolkit';

import { getProject } from './projectActions';

interface ProjectState {
  loading: boolean;
  project?: Project;
}

const initialState: ProjectState = {
  loading: false,
  project: undefined,
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProject.fulfilled, (state, { payload }) => ({
        project: payload,
        loading: false,
      }))
      .addCase(getProject.rejected, (state) => {
        state.loading = false;
        state.project = undefined;
      });
  },
});
