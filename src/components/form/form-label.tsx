import { cn } from '../../lib/utils';
import type { FormLabelProps } from './type';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import { Icon } from '../icons';
import { Text } from '../text';

export const FormLabel: React.FC<FormLabelProps> = ({
  htmlFor,
  required = false,
  size = 'md',
  className,
  children,
  tooltip,
}) => {
  const textVariant = {
    sm: 't3',
    md: 't2',
    lg: 't1',
  } as const;
  const variant = textVariant[size ?? 'md'];
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'font-metropolis block font-semibold text-gray-900',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Text variant={variant} weight="semibold">
          {children}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </Text>

        {tooltip != undefined && (
          <Tooltip>
            <TooltipTrigger>
              <Icon
                name="question-circle-outline"
                className="text-info-500"
                size={15}
              />
            </TooltipTrigger>

            <TooltipContent side="bottom" className="text-center">
              {tooltip}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </label>
  );
};
