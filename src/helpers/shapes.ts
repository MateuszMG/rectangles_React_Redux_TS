export const getTheLowestAndHighestCoordinates = (
  coordinates: Coordinates[],
) => {
  const arrayOfX = coordinates.map(({ x }) => x);
  const arrayOfY = coordinates.map(({ y }) => y);

  const lowest = { x: Math.min(...arrayOfX), y: Math.min(...arrayOfY) };
  const highest = { x: Math.max(...arrayOfX), y: Math.max(...arrayOfY) };

  return {
    lowest,
    highest,
  };
};

export const calculateBoundaryPoints = (projectItem: ProjectItem) => {
  const { height, rotation, width, x, y } = projectItem;

  const centerX = x + width / 2;
  const centerY = y + height / 2;

  const angleInRadians = (rotation * Math.PI) / 180;
  const cosinus = Math.cos(angleInRadians);
  const sinus = Math.sin(angleInRadians);

  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const topLeftX = -halfWidth;
  const topLeftY = -halfHeight;
  const topRightX = halfWidth;
  const topRightY = -halfHeight;
  const bottomLeftX = -halfWidth;
  const bottomLeftY = halfHeight;
  const bottomRightX = halfWidth;
  const bottomRightY = halfHeight;

  const rotatedTopLeftX = centerX + cosinus * topLeftX - sinus * topLeftY;
  const rotatedTopLeftY = centerY + sinus * topLeftX + cosinus * topLeftY;

  const rotatedTopRightX = centerX + cosinus * topRightX - sinus * topRightY;
  const rotatedTopRightY = centerY + sinus * topRightX + cosinus * topRightY;

  const rotatedBottomLeftX =
    centerX + cosinus * bottomLeftX - sinus * bottomLeftY;
  const rotatedBottomLeftY =
    centerY + sinus * bottomLeftX + cosinus * bottomLeftY;

  const rotatedBottomRightX =
    centerX + cosinus * bottomRightX - sinus * bottomRightY;
  const rotatedBottomRightY =
    centerY + sinus * bottomRightX + cosinus * bottomRightY;

  return [
    { x: rotatedTopLeftX, y: rotatedTopLeftY },
    { x: rotatedTopRightX, y: rotatedTopRightY },
    { x: rotatedBottomLeftX, y: rotatedBottomLeftY },
    { x: rotatedBottomRightX, y: rotatedBottomRightY },
  ];
};

export const createShapesData = (projectItems: ProjectItem[]): Shape[] => {
  const shapes = projectItems.map((item) => {
    const { height, width, x, y } = item;

    const centerX = x + width / 2;
    const centerY = y + height / 2;

    const coordinates = calculateBoundaryPoints(item);
    const { highest, lowest } = getTheLowestAndHighestCoordinates(coordinates);

    const borderHeight = highest.y - lowest.y;
    const borderWidth = highest.x - lowest.x;

    const distanceXBetweenCenters = borderWidth / 2 - width / 2;
    const distanceYBetweenCenters = borderHeight / 2 - height / 2;

    return {
      ...item,
      borderHeight,
      borderWidth,
      centerX,
      centerY,
      distanceXBetweenCenters,
      distanceYBetweenCenters,
      highest,
      lowest,
    };
  });

  return shapes;
};

export const extractCoordinatesFromShapes = (
  shapes: Shape[],
): Coordinates[] => {
  const coordinates = shapes
    .map(({ highest, lowest }) => [
      {
        x: highest.x,
        y: highest.y,
      },
      {
        x: lowest.x,
        y: lowest.y,
      },
    ])
    .flat();

  return coordinates;
};

export const applyScaleToShapes = (shapes: Shape[], scale: number) => {
  const updatedShapes = shapes.map((item) => ({
    ...item,
    borderHeight: item.borderHeight * scale,
    borderWidth: item.borderWidth * scale,
    centerX: item.centerX * scale,
    centerY: item.centerY * scale,
    distanceXBetweenCenters: item.distanceXBetweenCenters * scale,
    distanceYBetweenCenters: item.distanceYBetweenCenters * scale,
    height: item.height * scale,
    width: item.width * scale,
    x: item.x * scale,
    y: item.y * scale,
    highest: {
      x: item.highest.x * scale,
      y: item.highest.y * scale,
    },
    lowest: {
      x: item.lowest.x * scale,
      y: item.lowest.y * scale,
    },
  }));

  return updatedShapes;
};
