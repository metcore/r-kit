import { Editor, useEditorState } from '@tiptap/react';
import type { IconNameProps } from '../../icons';
import ToolbarGroup from './toolbar-group';
import ToolbarButton from './toolbar-button';

export default function TableGroup({
  editor,
  disabled = false,
}: {
  editor: Editor;
  disabled?: boolean;
}) {
  const { isInTable, isBordered, isInHeader } = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isInTable: editor.isActive('table'),
      isInHeader: editor.isActive('tableHeader'),
      isBordered: editor.isActive('table') && editor.getAttributes('table')['bordered'] !== 'false', //prettier-ignore
    }),
  });

  const tableButtons: {
    icon: IconNameProps;
    onClick: () => void;
    title: string;
    disabled?: boolean;
    requiresTable: boolean;
    active?: boolean;
    disabledByMap?: boolean;
  }[] = [
    {
      title: 'Add Table',
      icon: 'table',
      active: isInTable,
      onClick: () =>
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run(),
      disabled,
      requiresTable: false,
    },
    {
      title: 'Toggle Border',
      icon: 'table-delete',
      onClick: () => editor.chain().focus().toggleTableBorder().run(),
      requiresTable: true,
      active: !isBordered && isInTable,
    },
    {
      icon: 'table-add-row',
      onClick: () => editor.chain().focus().toggleHeaderCell().run(),
      title: 'Toggle header row',
      requiresTable: true,
      active: isInTable && isInHeader && isBordered,
      disabledByMap: !isBordered,
    },
    {
      icon: 'table-add-column',
      onClick: () => editor.chain().focus().addColumnAfter().run(),
      title: 'Add Column',
      requiresTable: true,
    },
    {
      icon: 'table-add-column',
      onClick: () => editor.chain().focus().mergeOrSplit().run(),
      title: 'Merge Cells',
      requiresTable: true,
    },
    {
      icon: 'table-delete-column',
      onClick: () => editor.chain().focus().deleteColumn().run(),
      title: 'Delete Column',
      requiresTable: true,
    },
    {
      icon: 'table-add-row',
      onClick: () => editor.chain().focus().addRowAfter().run(),
      title: 'Add Row',
      requiresTable: true,
    },
    {
      icon: 'table-delete-row',
      onClick: () => editor.chain().focus().deleteRow().run(),
      title: 'Delete Row',
      requiresTable: true,
    },
    {
      icon: 'table-delete',
      onClick: () => editor.chain().focus().deleteTable().run(),
      title: 'Delete Table',
      requiresTable: true,
    },
  ];

  return (
    <ToolbarGroup>
      {tableButtons.map(
        (
          {
            icon,
            onClick,
            title,
            requiresTable,
            active,
            disabledByMap = false,
          },
          index
        ) => (
          <ToolbarButton
            key={index}
            title={title}
            icon={icon}
            onClick={onClick}
            active={active}
            disabled={
              disabled || disabledByMap || (requiresTable && !isInTable)
            }
          />
        )
      )}
    </ToolbarGroup>
  );
}
