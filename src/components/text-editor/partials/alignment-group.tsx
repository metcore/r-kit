import { Editor, useEditorState } from '@tiptap/react';
import { Dropdown, DropdownContent, DropdownTrigger } from '../../dropdown';
import { Icon, type IconNameProps } from '../../icons';
import type { TextAlignValue } from '../type';
import SelectItem from './select-item';
import ToolbarButton from './toolbar-button';
import ToolbarGroup from './toolbar-group';

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
          <DropdownTrigger
            className="cursor-pointer outline-none"
            disabled={disabled}
          >
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
              <SelectItem
                key={index}
                label={align.align}
                icon={align.icon}
                active={activeState[align.align]}
                onClick={() =>
                  editor.chain().focus().setTextAlign(align.align).run()
                }
              />
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
