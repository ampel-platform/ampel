interface AmpelStatusIconProps {
  ampelStatus: number;
  cx: number;
  cy: number;
  index: number;
}

/**
 * Renders an SVG icon representing the ampel status at a specified position.
 *
 * Depending on the `ampelStatus` value, the icon is rendered as:
 * - A red circle for status 1
 * - A yellow triangle for status 2
 * - A green square for status 3
 * If the status is not recognized, a default white circle is rendered.
 *
 * @param {AmpelStatusIconProps} props - The properties for the status icon.
 * @param {number} props.ampelStatus - The status number determining the icon's shape and color.
 * @param {number} props.cx - The x-coordinate for the icon's position.
 * @param {number} props.cy - The y-coordinate for the icon's position.
 * @param {number} props.index - The index of the data point in the dataset.
 *
 * @returns {React.ReactNode } The rendered icon element.
 */

// eslint-disable-next-line no-undef
export function StatusIcon({ ampelStatus, cx, cy }: AmpelStatusIconProps): React.ReactNode {
  switch (ampelStatus) {
    case 3:
      return <circle cx={cx} cy={cy} r={5} fill={'red'} stroke='black' strokeWidth={1} />;
    case 2:
      return (
        <polygon
          points={`${cx},${cy - 5} ${cx - 6},${cy + 6} ${cx + 6},${cy + 6}`}
          fill={'yellow'}
          stroke='black'
          strokeWidth={1}
        />
      );
    case 1:
      return (
        <rect
          x={cx - 5.5}
          y={cy - 5.5}
          width={11}
          height={11}
          fill={'limegreen'}
          stroke='black'
          strokeWidth={1}
        />
      );
    default:
      return <circle r={4} fill={'white'} stroke='black' strokeWidth={1} />;
  }
}
