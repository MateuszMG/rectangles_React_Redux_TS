import styles from './Shapes.module.css';
import { useShapes } from './useShapes';

const textIndentation = 5;

interface ShapesProps {
  project: Project;
}

export const Shapes = ({ project }: ShapesProps) => {
  const { height, shapes, width } = useShapes({ project });

  return (
    <div className={styles.svgWrapper}>
      <svg width={width} height={height}>
        {shapes.map(
          ({
            borderHeight,
            borderWidth,
            centerX,
            centerY,
            color,
            distanceXBetweenCenters,
            distanceYBetweenCenters,
            height,
            id,
            rotation,
            type,
            width,
            x,
            y,
          }) => (
            <g key={id}>
              {type === 'rectangle' ? (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={color}
                  transform={`rotate(${rotation} ${centerX} ${centerY})`}
                />
              ) : (
                <ellipse
                  cx={centerX}
                  cy={centerY}
                  rx={width / 2}
                  ry={height / 2}
                  fill={color}
                  transform={`rotate(${rotation} ${centerX} ${centerY})`}
                />
              )}

              <rect
                x={x - distanceXBetweenCenters}
                y={y - distanceYBetweenCenters}
                width={borderWidth}
                height={borderHeight}
                fill='none'
                stroke='red'
              />

              <text
                x={centerX + textIndentation}
                y={centerY}
                textAnchor='start'
                fill='white'
              >
                {rotation}&deg;
              </text>

              <circle cx={centerX} cy={centerY} r='3' fill='white' />
            </g>
          ),
        )}
      </svg>
    </div>
  );
};
