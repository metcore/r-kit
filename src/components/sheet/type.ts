import * as SheetPrimitive from '@radix-ui/react-dialog';
export type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root> & {
  id?: string;
  urlReplace?: boolean;
};
