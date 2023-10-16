import { useEffect, useState } from 'react';

import { applyScaleToShapes } from '../helpers/shapes';

interface UseResizeSvg {
  height: number;
  shapes: Shape[];
  width: number;
}

export const useResizeSvg = ({ height, shapes, width }: UseResizeSvg) => {
  const [svgWidth, setSvgWidth] = useState(width);
  const [svgHeight, setSvgHeight] = useState(height);
  const [svgShapes, setSvgShapes] = useState(shapes);

  const resize = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const scale = Math.min(windowWidth / width, windowHeight / height);

    if (scale < 1) {
      const updatedWidth = width * scale;
      const updatedHeight = height * scale;

      const updatedShapes = applyScaleToShapes(svgShapes, scale);

      setSvgWidth(updatedWidth);
      setSvgHeight(updatedHeight);
      setSvgShapes(updatedShapes);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return {
    svgHeight,
    svgShapes,
    svgWidth,
  };
};
