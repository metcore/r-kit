import { Editor, useEditorState } from '@tiptap/react';
import ToolbarButton from './toolbar-button';
import ToolbarGroup from './toolbar-group';

interface Props {
  disabled?: boolean;
  editor?: Editor;
}

export default function IndentGroup({ disabled = false, editor }: Props) {
  const { canIndent, canOutdent, isInTable } = useEditorState({
    editor: editor!,
    selector: ({ editor }) => {
      const { selection, doc } = editor.state;
      const { from, to } = selection;

      const levels = [0, 20, 40, 60, 80, 100];
      const maxLevel = levels[levels.length - 1];

      let minIndent = Infinity;
      let maxIndent = -Infinity;

      doc.nodesBetween(from, to, (node) => {
        if (!['paragraph', 'heading'].includes(node.type.name)) return;
        const indent = (node.attrs['indent'] as number) || 0;
        if (indent < minIndent) minIndent = indent;
        if (indent > maxIndent) maxIndent = indent;
      });

      if (minIndent === Infinity) {
        minIndent = 0;
        maxIndent = 0;
      }

      return {
        canIndent: maxIndent < maxLevel,
        canOutdent: minIndent > 0,
        isInTable: editor.isActive('table'),
      };
    },
  });

  return (
    <ToolbarGroup>
      <ToolbarButton
        title="Indent"
        icon="left-indent"
        disabled={disabled || !canIndent || isInTable}
        onClick={() => editor?.chain().focus().indent().run()}
      />
      <ToolbarButton
        title="Outdent"
        icon="right-indent"
        disabled={disabled || !canOutdent || isInTable}
        onClick={() => editor?.chain().focus().outdent().run()}
      />
    </ToolbarGroup>
  );
}
