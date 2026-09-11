export const REPO_URL = 'https://github.com/metcore/r-kit';
export const NPM_URL = 'https://www.npmjs.com/package/@herca/r-kit';
export const ISSUES_URL = 'https://github.com/metcore/r-kit/issues';
export const HERCA_URL = 'https://herca.id';
export const PACKAGE_NAME = '@herca/r-kit';

export interface NavItem {
  /** Key di namespace `common`, di bawah `nav`. */
  key: 'docs' | 'components' | 'colors' | 'typography';
  to: string;
}

export const navItems: NavItem[] = [
  { key: 'docs', to: '/docs' },
  { key: 'components', to: '/playground' },
  { key: 'colors', to: '/playground/colors' },
  { key: 'typography', to: '/playground/typography' },
];

export interface ComponentEntry {
  name: string;
  to: string;
}

export interface ComponentCategory {
  /** Key di namespace `landing`, di bawah `catalog`. */
  key:
    | 'foundation'
    | 'form'
    | 'components'
    | 'navigation'
    | 'feedback'
    | 'dataDisplay'
    | 'examples';
  items: ComponentEntry[];
}

export const componentCategories: ComponentCategory[] = [
  {
    key: 'foundation',
    items: [
      { name: 'Typography', to: '/playground/typography' },
      { name: 'Colors', to: '/playground/colors' },
      { name: 'Icon', to: '/playground/icons' },
      { name: 'Image', to: '/playground/image' },
    ],
  },
  {
    key: 'form',
    items: [
      { name: 'Input', to: '/playground/input' },
      { name: 'Input Field', to: '/playground/input-field' },
      { name: 'Input Group', to: '/playground/input-group' },
      { name: 'Input File', to: '/playground/input-file' },
      { name: 'Input OTP', to: '/playground/input-otp' },
      { name: 'Input Password', to: '/playground/input-password' },
      { name: 'Input Phone Number', to: '/playground/input-phone-number' },
      { name: 'Text Area', to: '/playground/text-area' },
      { name: 'Text Editor', to: '/playground/text-editor' },
      { name: 'Select', to: '/playground/select' },
      { name: 'Checkbox', to: '/playground/checkbox' },
      { name: 'Radio Button', to: '/playground/radio-button' },
      { name: 'Switch', to: '/playground/switch' },
      { name: 'Slider', to: '/playground/slider' },
      { name: 'Counter', to: '/playground/counter' },
      { name: 'Color Picker', to: '/playground/color-picker' },
      { name: 'Drawing', to: '/playground/drawing' },
      { name: 'Date Picker', to: '/playground/date-picker' },
      { name: 'Time Picker', to: '/playground/time-picker' },
      { name: 'Month Picker', to: '/playground/month-picker' },
      { name: 'Year Picker', to: '/playground/year-picker' },
      { name: 'Day Picker', to: '/playground/day-picker' },
      { name: 'Day of Month Picker', to: '/playground/day-of-month-picker' },
    ],
  },
  {
    key: 'components',
    items: [
      { name: 'Button', to: '/playground/button' },
      { name: 'Button Group', to: '/playground/button-group' },
      { name: 'Button Icon', to: '/playground/button-icon' },
      { name: 'Badge', to: '/playground/badge' },
      { name: 'Chip', to: '/playground/chip' },
      { name: 'Card', to: '/playground/card' },
      { name: 'Avatar', to: '/playground/avatar' },
      { name: 'Modal', to: '/playground/modal' },
      { name: 'Sheet', to: '/playground/sheet' },
      { name: 'Dropdown', to: '/playground/dropdown' },
      { name: 'Calendar', to: '/playground/calendar' },
      { name: 'Progress Bar', to: '/playground/progress-bar' },
      { name: 'Timeline', to: '/playground/timeline' },
      { name: 'File View', to: '/playground/file-view' },
    ],
  },
  {
    key: 'navigation',
    items: [
      { name: 'Tabs', to: '/playground/tabs' },
      { name: 'Sidebar', to: '/playground/sidebar' },
      { name: 'Breadcrumb', to: '/playground/breadcrumb' },
      { name: 'Pagination', to: '/playground/pagination' },
      { name: 'Step', to: '/playground/step' },
    ],
  },
  {
    key: 'feedback',
    items: [
      { name: 'Toast', to: '/playground/toast' },
      { name: 'Alert', to: '/playground/alert' },
    ],
  },
  {
    key: 'dataDisplay',
    items: [
      { name: 'Table', to: '/playground/table' },
      { name: 'API Table', to: '/playground/api-table' },
      { name: 'List', to: '/playground/list' },
      { name: 'Accordion', to: '/playground/accordion' },
    ],
  },
  {
    key: 'examples',
    items: [
      { name: 'Invoice', to: '/playground/example/invoice' },
      { name: 'Profile', to: '/playground/example/profile' },
    ],
  },
];

export const componentCount = componentCategories.reduce(
  (total, category) => total + category.items.length,
  0
);
