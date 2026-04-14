import type { IconNameProps } from '../../icons';
import type { TextAlignValue } from '../type';
import { Editor, useEditorState } from '@tiptap/react';
import ToolbarGroup from './toolbar-group';
import ToolbarButton from './toolbar-button';

export default function AlignmentGroup({
  editor,
  disabled = false,
}: {
  editor: Editor;
  disabled?: boolean;
}) {
  const activeState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      left: editor.isActive({ textAlign: 'left' }),
      center: editor.isActive({ textAlign: 'center' }),
      right: editor.isActive({ textAlign: 'right' }),
      justify: editor.isActive({ textAlign: 'justify' }),
      isInYoutube: editor.isActive('youtubeNode'),
    }),
  });

  const alignments: { align: TextAlignValue; icon: IconNameProps }[] = [
    { align: 'left', icon: 'align-left' },
    { align: 'center', icon: 'align-center' },
    { align: 'justify', icon: 'align-justify' },
    { align: 'right', icon: 'align-right' },
  ];

  return (
    <ToolbarGroup>
      {alignments.map(({ align, icon }) => (
        <ToolbarButton
          title={align}
          key={align}
          icon={icon}
          active={activeState[align]}
          disabled={disabled}
          onClick={() => editor.chain().focus().setTextAlign(align).run()}
        />
      ))}
    </ToolbarGroup>
  );
}
