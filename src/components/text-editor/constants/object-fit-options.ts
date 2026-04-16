import type { SelectOption } from '../../select/type';

const objectfitOptions: SelectOption[] = [
  {
    label: 'Contain (No Cropping)',
    value: 'contain',
  },
  {
    label: 'Cover (Cropping)',
    value: 'cover',
  },
  {
    label: 'Fill (May Distort)',
    value: 'fill',
  },
];

export default objectfitOptions;
