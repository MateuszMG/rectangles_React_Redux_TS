import { ChangeEvent, useState } from 'react';

import { getProject } from '../../redux/project/projectActions';
import { useAppDispatch, useAppSelector } from '../../redux/store';

export const useHome = () => {
  const [projectId, setProjectId] = useState('');

  const dispatch = useAppDispatch();
  const { loading, project } = useAppSelector().project;

  const fetchProject = () => {
    dispatch(getProject({ projectId }));
    setProjectId('');
  };

  const handleProjectId = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectId(e.target.value);
  };

  return {
    fetchProject,
    handleProjectId,
    loading,
    project,
    projectId,
  };
};
