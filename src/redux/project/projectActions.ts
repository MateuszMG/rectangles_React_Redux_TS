import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { reduxErrorHandler } from '../../helpers/errors';

import { apiPath } from '../../const';
import { validateProject } from '../../validation/validateProject';

interface GetProjectParams {
  projectId?: string;
}

export const getProject = createAsyncThunk<Project, GetProjectParams>(
  'project/getProject',
  async ({ projectId }, { rejectWithValue }) => {
    try {
      let id = projectId;

      if (!id) {
        const initResponse = await axios.get(`${apiPath}/init`);
        id = initResponse.data.id as string;
      }

      const res = await axios.get(`${apiPath}/project/${id}`);
      const project = res.data.project as Project;

      const error = validateProject(project);
      if (error) throw error;

      return project;
    } catch (error) {
      return reduxErrorHandler({ error, rejectWithValue });
    }
  },
);
