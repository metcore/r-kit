const sizeMap = {
  sm: "min-w-[14px] h-[14px] text-[10px]",
  md: "min-w-[18px] h-[18px] text-[11px]",
  lg: "min-w-[22px] h-[22px] text-[12px]",
};

const positionMap = {
  "top-right": "top-0.5 right-0.5 translate-x-1/2 -translate-y-1/2",
  "top-left": "top-0.5 left-0.5 -translate-x-1/2 -translate-y-1/2",
  "bottom-right": "bottom-0.5 right-0.5 translate-x-1/2 translate-y-1/2",
  "bottom-left": "bottom-0.5 left-0.5 -translate-x-1/2 translate-y-1/2",
};

const colorMap = {
  danger: {
    bg: "bg-danger-100",
    text: "text-danger-500",
  },
  success: {
    bg: "bg-success-100",
    text: "text-success-500",
  },
  warning: {
    bg: "bg-warning-100",
    text: "text-warning-500",
  },
  info: {
    bg: "bg-info-100",
    text: "text-info-500",
  },
  gray: {
    bg: "bg-gray-100",
    text: "text-gray-600",
  },
};

export { sizeMap, positionMap, colorMap };
