import clsx from "clsx";
import { Icon } from "../icons";
import { Text } from "../text";
import type { BreadcrumbsProps } from "./type";

export function Breadcrumbs({
  items = [],
  separator = "caret-right",
  separatorClassName,
  linkComponent: LinkComponent = "a",
}: BreadcrumbsProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <Icon
                  name={separator}
                  className={clsx("shrink-0 text-gray-600", separatorClassName)}
                  size={16}
                />
              )}

              {isLast ? (
                <Text
                  value={item.label}
                  variant="t1"
                  weight="medium"
                  className="text-gray-700"
                />
              ) : item.href ? (
                <LinkComponent
                  href={item.href}
                  className="inline-flex items-center underline-offset-2 transition-colors hover:underline"
                >
                  <Text
                    value={item.label}
                    variant="t1"
                    weight="medium"
                    className="text-info-500"
                  />
                </LinkComponent>
              ) : (
                <Text
                  value={item.label}
                  variant="t1"
                  weight="medium"
                  className="text-info-500"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
