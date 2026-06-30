import { Editor, useEditorState } from '@tiptap/react';
import { Dropdown, DropdownContent, DropdownTrigger } from '../../dropdown';
import { Icon, type IconNameProps } from '../../icons';
import type { BaseInputAlignment, TextAlignValue } from '../type';
import SelectItem from './select-item';
import ToolbarButton from './toolbar-button';
import ToolbarGroup from './toolbar-group';

interface Alignment {
  label?: string;
  align: TextAlignValue;
  icon: IconNameProps;
}

interface Props extends BaseInputAlignment {
  editor: Editor;
  disabled?: boolean;
  isAlignmentActive?: boolean;
  isListActive?: boolean;
}

export default function AlignmentGroup({
  editor,
  disabled = false,
  isAlignmentActive = true,
  isListActive = true,
  labelCenter,
  labelJustify,
  labelLeft,
  labelRight,
}: Props) {
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

  const alignments: Alignment[] = [
    { align: 'left', icon: 'align-left', label: labelLeft },
    {
      align: 'center',
      icon: 'align-center',
      label: labelCenter,
    },
    {
      align: 'justify',
      icon: 'align-justify',
      label: labelJustify,
    },
    { align: 'right', icon: 'align-right', label: labelRight },
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
            {alignments.map((item, index) => (
              <SelectItem
                key={index}
                label={item?.label ?? item.align}
                icon={item.icon}
                active={activeState[item.align]}
                onClick={() =>
                  editor.chain().focus().setTextAlign(item.align).run()
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
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={
              disabled || activeState.isInYoutube || activeState.isInImage
            }
          />
          <ToolbarButton
            title="Numbering"
            icon="dot-number"
            active={activeState.ol}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={
              disabled || activeState.isInYoutube || activeState.isInImage
            }
          />
        </>
      )}
    </ToolbarGroup>
  );
}
