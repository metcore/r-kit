import { Editor, useEditorState } from '@tiptap/react';
import clsx from 'clsx';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '../../dropdown';
import { Icon, type IconNameProps } from '../../icons';
import { Text } from '../../text/text';
import type { TextAlignValue } from '../type';
import ToolbarGroup from './toolbar-group';
import ToolbarButton from './toolbar-button';

export default function AlignmentGroup({
  editor,
  disabled = false,
  isAlignmentActive = true,
  isListActive = true,
}: {
  editor: Editor;
  disabled?: boolean;
  isAlignmentActive?: boolean;
  isListActive?: boolean;
}) {
  const activeState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      left: editor.isActive({ textAlign: 'left' }),
      center: editor.isActive({ textAlign: 'center' }),
      right: editor.isActive({ textAlign: 'right' }),
      justify: editor.isActive({ textAlign: 'justify' }),
      isInYoutube: editor.isActive('youtubeNode'),
      ul: editor.isActive('bulletList'),
      ol: editor.isActive('orderedList'),
      isInImage: editor.isActive('image'),
    }),
  });

  const alignments: { align: TextAlignValue; icon: IconNameProps }[] = [
    { align: 'left', icon: 'align-left' },
    { align: 'center', icon: 'align-center' },
    { align: 'justify', icon: 'align-justify' },
    { align: 'right', icon: 'align-right' },
  ];

  const getIcon = (state: typeof activeState) => {
    if (state.left) return 'align-left';
    if (state.center) return 'align-center';
    if (state.justify) return 'align-justify';
    if (state.right) return 'align-right';
    return 'align-left';
  };

  return (
    <ToolbarGroup>
      {isAlignmentActive && (
        <Dropdown>
          <DropdownTrigger className="outline-none" disabled={disabled}>
            <div
              title="Heading"
              className="flex items-center gap-1 rounded-lg border border-gray-300 p-2"
            >
              <Icon
                name={getIcon(activeState)}
                size={20}
                className="text-gray-900"
              />
              <Icon name="angle-down-small" size={18} />
            </div>
          </DropdownTrigger>
          <DropdownContent sideOffset={3} className="z-30 p-1" align="start">
            {alignments.map((align, index) => (
              <DropdownItem
                key={index}
                onClick={() =>
                  editor.chain().focus().setTextAlign(align.align).run()
                }
                className={clsx(
                  'rounded-md border-transparent py-1',
                  activeState[align.align] && 'bg-primary-50 border-primary-300'
                )}
              >
                <Icon name={align.icon} size={20} className="text-gray-900" />
                <Text weight="medium" className="text-gray-900">
                  {align.align}
                </Text>
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
      )}

      {isListActive && (
        <>
          <ToolbarButton
            title="Bullet List"
            icon="dot-points"
            active={activeState.ul}
            disabled={
              disabled || activeState.isInYoutube || activeState.isInImage
            }
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          />
          <ToolbarButton
            title="Numbering"
            icon="dot-number"
            active={activeState.ol}
            disabled={
              disabled || activeState.isInYoutube || activeState.isInImage
            }
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          />
        </>
      )}
    </ToolbarGroup>
  );
}
