type ProjectItemType = 'rectangle' | 'ellipse';

interface ProjectItem {
  color: string;
  height: number;
  id: string;
  rotation: number;
  type: ProjectItemType;
  width: number;
  x: number;
  y: number;
}

interface Project {
  height: number;
  id: string;
  items: ProjectItem[];
  name: string;
  width: number;
}

interface Coordinates {
  x: number;
  y: number;
}

interface Shape extends ProjectItem {
  borderHeight: number;
  borderWidth: number;
  centerX: number;
  centerY: number;
  distanceXBetweenCenters: number;
  distanceYBetweenCenters: number;
  highest: Coordinates;
  lowest: Coordinates;
}
