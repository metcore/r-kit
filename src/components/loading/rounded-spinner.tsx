interface RoundedSpinnerProps {
  size?: number;
  radius?: number;
  stroke?: number;
  duration?: number;
}

function RoundedSpinner({
  size = 28,
  radius = 4,
  stroke = 2,
  duration = 1.4,
}: RoundedSpinnerProps) {
  // We use pathLength="100" so we can use dasharray 100 and animate dashoffset -100..0
  const inner = size - stroke; // inner width/height to keep stroke fully visible
  const offset = stroke / 2; // center stroke inside the viewBox

  return (
    <div style={{ width: size, height: size, display: "inline-block" }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: "block" }}
      >
        {/* faint background border */}
        <rect
          x={offset}
          y={offset}
          width={inner}
          height={inner}
          rx={radius}
          ry={radius}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={stroke}
        />
        {/* animated stroke on top */}
        <rect
          x={offset}
          y={offset}
          width={inner}
          height={inner}
          rx={radius}
          ry={radius}
          fill="none"
          stroke="#ffffff"
          strokeWidth={stroke}
          strokeLinecap="round"
          pathLength={100} /* normalizer: total path length = 100 */
          strokeDasharray="100"
          className="svg-border-anim"
          style={{
            animation: `dash ${duration}s linear infinite`,
            transformOrigin: "center",
          }}
        />
      </svg>
    </div>
  );
}

export { RoundedSpinner };
