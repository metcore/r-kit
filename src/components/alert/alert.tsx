import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  useState,
} from 'react';
import { cx } from 'class-variance-authority';
import {
  alertDescriptionVariants,
  alertTitleVariants,
  alertVariants,
  type AlertVariantProps,
} from './alert-variant';
import { ButtonIcon } from '../button-icon';
import { Icon, type IconNameProps } from '../icons';
import { Text } from '../text';
import type { ButtonColor } from '../button';

export type { AlertVariantProps };

export type AlertColor = NonNullable<AlertVariantProps['color']>;

export interface AlertProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color' | 'children'>,
    AlertVariantProps {
  title?: ReactNode;
  icon?: IconNameProps;
  description?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const ASSERTIVE_COLORS: ReadonlySet<AlertColor> = new Set([
  'danger',
  'warning',
  'orange',
]);

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    variant = 'solid',
    color = 'info',
    block = true,
    title,
    description,
    icon,
    dismissible = true,
    onDismiss,
    className,
    ...rest
  },
  ref
) {
  const [visible, setVisible] = useState(true);

  const assertive = ASSERTIVE_COLORS.has(color ?? 'info');

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
      return;
    }

    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={ref}
      role={assertive ? 'alert' : 'status'}
      aria-live={assertive ? 'assertive' : 'polite'}
      className={cx(alertVariants({ variant, color, block }), className)}
      {...rest}
    >
      {icon ? <Icon name={icon} /> : null}

      <div className="min-w-0 flex-1">
        {title != undefined ? (
          <Text variant="t2" className={alertTitleVariants({ variant, color })}>
            {title}
          </Text>
        ) : null}

        {description != undefined ? (
          <Text
            variant="t3"
            className={alertDescriptionVariants({ variant, color })}
          >
            {description}
          </Text>
        ) : null}
      </div>

      {dismissible ? (
        <ButtonIcon
          icon="times"
          variant="tertiary"
          size="sm"
          color={color as ButtonColor}
          onClick={handleDismiss}
        />
      ) : null}
    </div>
  );
});

Alert.displayName = 'Alert';

export { Alert };
export default Alert;
