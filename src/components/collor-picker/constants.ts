const CHECKER: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(45deg,#cbd0d8 25%,transparent 25%),' +
    'linear-gradient(-45deg,#cbd0d8 25%,transparent 25%),' +
    'linear-gradient(45deg,transparent 75%,#cbd0d8 75%),' +
    'linear-gradient(-45deg,transparent 75%,#cbd0d8 75%)',
  backgroundSize: '10px 10px',
  backgroundPosition: '0 0,0 5px,5px -5px,-5px 0',
  backgroundColor: '#fff',
};

const boxBaseCls = 'box-border flex h-10 items-center rounded-[9px] border border-[#E4E6EB] bg-white'; //prettier-ignore
const inputBaseCls = 'w-full min-w-0 border-none bg-transparent text-[13px] text-[#1f2430] outline-none'; //prettier-ignore
const HUE_GRADIENT = 'linear-gradient(to right,#f00 0%,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,#f00 100%)'; //prettier-ignore
const DEFAULT_SAVED: string[] = [
  '#FF3B30',
  '#FF9500',
  '#FFCC4D',
  '#C026D3',
  '#FF8A80',
  '#B59B9E',
  '#B5E61D',
  '#5C1A1A',
  '#0A1A4F',
  '#310C0C',
  '#5B1E8A',
  '#2E5A14',
  '#2A8C8C',
];

export { CHECKER, boxBaseCls, inputBaseCls, HUE_GRADIENT, DEFAULT_SAVED };
