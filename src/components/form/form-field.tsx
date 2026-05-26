import React from 'react';
import { cn } from '../../lib/utils';
import type { FormFieldProps } from './type';
import { FormLabel } from './form-label';
import { FormDescription } from './form-description';
import { FormHint } from './form-hint';
import { FormErrorMessages } from './form-error-messages';
import { Icon } from '../icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  function FormField(
    {
      label,
      description,
      hint,
      errorMessages,
      required = false,
      size = 'md',
      htmlFor,
      className,
      children,
      tooltip,
    },
    ref
  ) {
    return (
      <div ref={ref} className={cn('flex flex-col gap-1', className)}>
        <div className="flex items-center gap-2">
          {label !== undefined && (
            <FormLabel htmlFor={htmlFor} required={required} size={size}>
              {label}
            </FormLabel>
          )}
          {tooltip !== undefined && (
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
        {description !== undefined && (
          <FormDescription size={size}>{description}</FormDescription>
        )}

        {children}

        {hint !== undefined && <FormHint size={size}>{hint}</FormHint>}

        {errorMessages !== undefined && (
          <FormErrorMessages messages={errorMessages} size={size} />
        )}
      </div>
    );
  }
);
