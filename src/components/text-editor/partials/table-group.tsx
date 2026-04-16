import { Editor, useEditorState } from '@tiptap/react';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '../../dropdown';
import { Icon } from '../../icons';
import ToolbarGroup from './toolbar-group';
import type { TableAction } from '../type';
import clsx from 'clsx';
import { Text } from '../../text/text';

export default function TableGroup({
  editor,
  disabled = false,
}: {
  editor: Editor;
  disabled?: boolean;
}) {
  const activeState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isInYoutube: editor.isActive('youtubeNode'),
      isInTable: editor.isActive('table'),
      isInHeader: editor.isActive('tableHeader'),
      isBordered: editor.isActive('table') && editor.getAttributes('table')['bordered'] !== 'false', //prettier-ignore
      isInImage: editor.isActive('image'),
      isMerged: (() => {
        const { selection } = editor.state;
        const cell = selection.$anchor.node(-1);
        return (
          (cell?.attrs?.colspan ?? 1) > 1 || (cell?.attrs?.rowspan ?? 1) > 1
        );
      })(),
    }),
  });

  const mainActions: TableAction[] = [
    {
      title: 'Add Table',
      icon: 'table',
      onClick: () =>
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run(),
      requiresTable: false,
      disabled,
    },
    {
      title: 'Header Cell',
      icon: 'table-header-cell',
      active: activeState.isInHeader,
      onClick: () => editor.chain().focus().toggleHeaderCell().run(),
      requiresTable: true,
      disabled,
    },
    {
      title: 'Merge Cell',
      icon: 'table-merge-cell',
      active: activeState.isMerged,
      onClick: () => editor.chain().focus().mergeOrSplit().run(),
      requiresTable: true,
      disabled,
    },
    {
      title: 'No Border',
      icon: 'table-no-border',
      active: !activeState.isBordered && activeState.isInTable,
      onClick: () => editor.chain().focus().toggleTableBorder().run(),
      requiresTable: true,
      disabled,
    },
    {
      title: 'Delete Table',
      icon: 'table-delete',
      active: false,
      onClick: () => editor.chain().focus().deleteTable().run(),
      requiresTable: true,
      disabled,
    },
  ];

  const rowActions: TableAction[] = [
    {
      title: 'Insert row',
      icon: 'table-add-row',
      onClick: () => editor.chain().focus().addRowAfter().run(),
      requiresTable: false,
      disabled,
    },
    {
      title: 'Delete Row',
      icon: 'table-delete-row',
      onClick: () => editor.chain().focus().addRowAfter().run(),
      requiresTable: false,
      disabled,
    },
  ];

  const columnActions: TableAction[] = [
    {
      title: 'Insert Column',
      icon: 'table-add-column',
      onClick: () => editor.chain().focus().addColumnAfter().run(),
      requiresTable: false,
      disabled,
    },
    {
      title: 'Delete Column',
      icon: 'table-delete-column',
      onClick: () => editor.chain().focus().addColumnBefore().run(),
      requiresTable: false,
      disabled,
    },
  ];

  return (
    <ToolbarGroup>
      <Dropdown>
        <DropdownTrigger
          className="outline-none"
          disabled={
            disabled || activeState.isInYoutube || activeState.isInImage
          }
        >
          <div
            title="Heading"
            className={clsx(
              'flex items-center gap-1 rounded-lg border border-gray-300 p-2',
              activeState.isInTable && 'bg-primary-1000',
              (disabled || activeState.isInYoutube || activeState.isInImage) &&
                'opacity-50'
            )}
          >
            <Icon
              name="table"
              size={18}
              className={clsx(
                activeState.isInTable ? 'text-white' : 'text-gray-900'
              )}
            />

            <Icon
              name="angle-down-small"
              size={17}
              className={clsx(
                activeState.isInTable ? 'text-white' : 'text-gray-900'
              )}
            />
          </div>
        </DropdownTrigger>
        <DropdownContent
          sideOffset={3}
          className="z-30 rounded-lg p-1"
          align="start"
        >
          {mainActions.map((action, index) => (
            <DropdownItem
              key={index}
              onClick={() => action.onClick()}
              disabled={
                Boolean(action.disabled) ||
                (action.requiresTable && !activeState.isInTable)
              }
              className={clsx(
                'rounded-md border-transparent py-1 disabled:opacity-50',
                Boolean(action.active) && 'bg-primary-50 border-primary-300'
              )}
            >
              <Icon name={action.icon} size={20} className="text-gray-900" />
              <Text weight="medium" className="text-gray-900">
                {action.title}
              </Text>
            </DropdownItem>
          ))}

          <div className="h-px w-full bg-gray-200" />

          {rowActions.map((action, index) => (
            <DropdownItem
              key={index}
              onClick={() => action.onClick()}
              disabled={
                Boolean(action.disabled) ||
                (action.requiresTable && !activeState.isInTable)
              }
              className={clsx(
                'rounded-md border-transparent py-1 disabled:opacity-50',
                Boolean(action.active) && 'bg-primary-50 border-primary-300'
              )}
            >
              <Icon name={action.icon} size={20} className="text-gray-900" />
              <Text weight="medium" className="text-gray-900">
                {action.title}
              </Text>
            </DropdownItem>
          ))}

          <div className="h-px w-full bg-gray-200" />

          {columnActions.map((action, index) => (
            <DropdownItem
              key={index}
              onClick={() => action.onClick()}
              disabled={
                Boolean(action.disabled) ||
                (action.requiresTable && !activeState.isInTable)
              }
              className={clsx(
                'rounded-md border-transparent py-1 disabled:opacity-50',
                Boolean(action.active) && 'bg-primary-50 border-primary-300'
              )}
            >
              <Icon name={action.icon} size={20} className="text-gray-900" />
              <Text weight="medium" className="text-gray-900">
                {action.title}
              </Text>
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    </ToolbarGroup>
  );
}
