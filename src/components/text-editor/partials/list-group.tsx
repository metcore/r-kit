import { Editor, useEditorState } from '@tiptap/react';
import ToolbarGroup from './toolbar-group';
import ToolbarButton from './toolbar-button';

export function ListGroup({
  editor,
  disabled,
}: {
  editor: Editor;
  disabled?: boolean;
}) {
  const activeState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      ul: editor.isActive('bulletList'),
      ol: editor.isActive('orderedList'),
    }),
  });

  return (
    <ToolbarGroup>
      <ToolbarButton
        title="Bullet List"
        icon="dot-points"
        active={activeState.ul}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <ToolbarButton
        title="Ordered List"
        icon="dot-number"
        active={activeState.ol}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
    </ToolbarGroup>
  );
}
