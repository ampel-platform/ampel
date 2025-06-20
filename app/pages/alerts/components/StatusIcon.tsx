type AmpelStatusIconProps = {
  ampelStatus: number;
  cx: number;
  cy: number;
  index: number;
};

export default function StatusIcon({ ampelStatus, cx, cy }: AmpelStatusIconProps) {
  switch (ampelStatus) {
    case 1:
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
    case 3:
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
