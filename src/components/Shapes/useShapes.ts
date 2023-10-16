import { useMemo } from 'react';

import { useResizeSvg } from '../../hooks/useResizeSvg';

import {
  applyScaleToShapes,
  createShapesData,
  extractCoordinatesFromShapes,
  getTheLowestAndHighestCoordinates,
} from '../../helpers/shapes';

const svgPadding = 20;

interface UseShapesProps {
  project: Project;
}

export const useShapes = ({ project }: UseShapesProps) => {
  const shapes = useMemo(() => {
    const shapes = createShapesData(project.items);
    const shapesCoordinates = extractCoordinatesFromShapes(shapes);
    const boundaryCoordinates =
      getTheLowestAndHighestCoordinates(shapesCoordinates);
    const { highest, lowest } = boundaryCoordinates;

    const isShapeOutsideSvg =
      highest.x + svgPadding > project.width ||
      lowest.x - svgPadding < 0 ||
      highest.y + svgPadding > project.height ||
      lowest.y - svgPadding < 0;

    if (isShapeOutsideSvg) {
      const scaleX = project.width / (highest.x + svgPadding);
      const scaleY = project.height / (highest.y + svgPadding);
      const scale = Math.min(scaleX, scaleY);
      const updatedShapes = applyScaleToShapes(shapes, scale);
      return updatedShapes;
    }

    return shapes;
  }, [project]);

  const { svgHeight, svgShapes, svgWidth } = useResizeSvg({
    height: project.height,
    shapes,
    width: project.width,
  });

  return {
    height: svgHeight,
    shapes: svgShapes,
    width: svgWidth,
  };
};
