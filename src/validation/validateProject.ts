export const validateProject = (project: Project) => {
  // there should be comprehensive validation here (yup library would be helpful)

  const booleanArray = project.items.map(({ height, rotation, width }) => {
    if (isNaN(rotation) || isNaN(height) || isNaN(width)) return true;
    return false;
  });

  if (booleanArray.includes(true)) {
    return 'Incorrect project data';
  }

  return false;
};
