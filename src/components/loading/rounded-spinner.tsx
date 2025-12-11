import { cn } from "../../lib/utils";

interface RoundedSpinnerProps {
  size?: number;
  radius?: number;
  stroke?: number;
  duration?: number;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "orange"
    | "purple"
    | "gray";
}

const COLOR_MAP = {
  primary: { bg: "stroke-primary-1000/30", fg: "stroke-primary-1000" },
  secondary: { bg: "stroke-white/30", fg: "stroke-white" },
  success: { bg: "stroke-success-500/30", fg: "stroke-success-500" },
  danger: { bg: "stroke-danger-500/30", fg: "stroke-danger-500" },
  warning: { bg: "stroke-warning-500/30", fg: "stroke-warning-500" },
  info: { bg: "stroke-info-500/30", fg: "stroke-info-500" },
  orange: { bg: "stroke-orange-500/30", fg: "stroke-orange-500" },
  purple: { bg: "stroke-purple-500/30", fg: "stroke-purple-500" },
  gray: { bg: "stroke-gray-500/30", fg: "stroke-gray-500" },
} as const;

function RoundedSpinner({
  size = 28,
  radius = 4,
  stroke = 2,
  duration = 1.4,
  color = "secondary",
}: RoundedSpinnerProps) {
  const inner = size - stroke;
  const offset = stroke / 2;
  const variant = COLOR_MAP[color];

  return (
    <div style={{ width: size, height: size, display: "inline-block" }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: "block" }}
      >
        {/* Faint background */}
        <rect
          x={offset}
          y={offset}
          width={inner}
          height={inner}
          rx={radius}
          ry={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className={variant.bg}
        />

        {/* Animated stroke */}
        <rect
          x={offset}
          y={offset}
          width={inner}
          height={inner}
          rx={radius}
          ry={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100"
          className={cn("svg-border-anim", variant.fg)}
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
