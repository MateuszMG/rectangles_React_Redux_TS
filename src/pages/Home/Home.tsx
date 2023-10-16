import { Button } from '../../components/global/Button/Button';
import { TextInput } from '../../components/global/TextInput/TextInput';
import { Shapes } from '../../components/Shapes/Shapes';

import styles from './Home.module.css';
import { useHome } from './useHome';

export const Home = () => {
  const { fetchProject, handleProjectId, loading, project, projectId } =
    useHome();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <TextInput
          onChange={handleProjectId}
          placeholder='Project id'
          value={projectId}
        />
        <Button onClick={fetchProject}>Fetch project</Button>
      </header>

      {loading ? (
        <h1>Loading...</h1>
      ) : !project ? (
        <h1>Fetch initial project or enter project id </h1>
      ) : (
        <Shapes project={project} />
      )}
    </div>
  );
};
