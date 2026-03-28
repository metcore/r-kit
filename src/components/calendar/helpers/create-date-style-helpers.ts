import { isToday } from './helpers';
import type { CalendarDay, CalendarStyleConfig } from '../type';

interface Props {
  isSelected: boolean;
  isDisabled: boolean;
  isCurrentMonth: boolean;
  styleConfig?: CalendarStyleConfig;
  day: CalendarDay;
}

export default function createDateStyleHelpers({
  isSelected,
  isDisabled,
  isCurrentMonth,
  styleConfig,
  day,
}: Props) {
  const getSelectedStyle = (styleConfig?: CalendarStyleConfig) => {
    return {
      backgroundColor: styleConfig?.selected?.background,
      color: styleConfig?.selected?.text,
    };
  };

  // Get style for disabled date
  const getDisabledStyle = (styleConfig?: CalendarStyleConfig) => {
    return {
      backgroundColor: styleConfig?.disabled?.background,
      color: styleConfig?.disabled?.text,
    };
  };

  // Get day style
  const getDayStyle = () => {
    if (isSelected) {
      return getSelectedStyle(styleConfig);
    } else if (isDisabled && day.month === 'current') {
      return getDisabledStyle(styleConfig);
    }

    return {};
  };

  // Get cursor classes
  const getCursorClass = () => {
    if (isDisabled && isCurrentMonth) {
      return 'cursor-not-allowed';
    }

    return 'cursor-pointer';
  };

  // Get text color classes
  const getTextColorClass = () => {
    if (!isCurrentMonth) {
      return '[&>h5]:text-gray-500';
    }

    if (isSelected && styleConfig?.selected?.text != null) {
      return '';
    }

    if (isSelected) {
      return '[&>h5]:text-white!';
    }

    if (isDisabled && styleConfig?.disabled?.text != null) {
      return '';
    }

    if (isDisabled) {
      return '*:text-red-500!';
    }

    if (isToday(day)) {
      return '*:text-info-500!';
    }

    return '*:text-gray-700!';
  };

  // Get background color classes
  const getBackgroundClass = () => {
    if (isSelected && styleConfig?.selected?.background != null) {
      return '';
    }

    if (isSelected) {
      return 'bg-primary-1000';
    }

    if (
      isDisabled &&
      isCurrentMonth &&
      styleConfig?.disabled?.background != null
    ) {
      return '';
    }

    if (isDisabled && isCurrentMonth) {
      return 'bg-red-500/30';
    }

    if (!isDisabled) {
      return 'hover:bg-gray-100 group-hover:bg-gray-100';
    }

    return '';
  };

  return { getBackgroundClass, getTextColorClass, getCursorClass, getDayStyle };
}
