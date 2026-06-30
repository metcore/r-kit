interface SliderThumbProps {
  left: number;
  fill: string;
}

export default function SliderThumb({
  left,
  fill,
}: SliderThumbProps): React.ReactElement {
  return (
    <div
      className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.2),0_1px_3px_rgba(0,0,0,0.3)]"
      style={{ left: `${left}%`, background: fill }}
    />
  );
}
