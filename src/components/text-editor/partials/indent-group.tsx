import { Editor, useEditorState } from '@tiptap/react';
import ToolbarButton from './toolbar-button';
import ToolbarGroup from './toolbar-group';

interface Props {
  disabled?: boolean;
  editor?: Editor;
}

export default function IndentGroup({ disabled = false, editor }: Props) {
  const activeState = useEditorState({
    editor: editor!,
    selector: ({ editor }) => {
      const { selection, doc } = editor.state;
      const { from, to } = selection;

      const levels = [0, 20, 40, 60, 80, 100];
      const maxLevel = levels[levels.length - 1];

      let minIndent = Infinity;
      let maxIndent = -Infinity;

      const listTypes = ['bulletList', 'orderedList'];

      doc.nodesBetween(from, to, (node, _pos, parent) => {
        // Cek paragraph/heading yang bukan di dalam list
        if (
          ['paragraph', 'heading'].includes(node.type.name) &&
          parent?.type.name !== 'listItem'
        ) {
          const indent = (node.attrs['indent'] as number) || 0;
          if (indent < minIndent) minIndent = indent;
          if (indent > maxIndent) maxIndent = indent;
        }

        // Cek bulletList/orderedList
        if (listTypes.includes(node.type.name)) {
          const indent = (node.attrs['indent'] as number) || 0;
          if (indent < minIndent) minIndent = indent;
          if (indent > maxIndent) maxIndent = indent;
        }
      });

      // Fallback: kalau cursor di dalam list tapi nodesBetween tidak menemukan list node-nya
      if (minIndent === Infinity) {
        const $from = doc.resolve(from);
        for (let depth = $from.depth; depth >= 0; depth--) {
          const node = $from.node(depth);
          if (listTypes.includes(node.type.name)) {
            const indent = (node.attrs['indent'] as number) || 0;
            minIndent = indent;
            maxIndent = indent;
            break;
          }
        }
      }

      if (minIndent === Infinity) {
        minIndent = 0;
        maxIndent = 0;
      }

      return {
        canIndent: maxIndent < maxLevel,
        canOutdent: minIndent > 0,
        isInTable: editor.isActive('table'),
        isInImage: editor.isActive('image'),
        isInYoutube: editor.isActive('youtubeNode'),
      };
    },
  });

  return (
    <ToolbarGroup>
      <ToolbarButton
        title="Increase Indent"
        icon="left-indent"
        disabled={
          disabled ||
          !activeState.canIndent ||
          activeState.isInTable ||
          activeState.isInImage ||
          activeState.isInYoutube
        }
        onClick={() => editor?.chain().focus().indent().run()}
      />
      <ToolbarButton
        title="Decrease Indent"
        icon="right-indent"
        disabled={
          disabled ||
          !activeState.canOutdent ||
          activeState.isInTable ||
          activeState.isInImage ||
          activeState.isInYoutube
        }
        onClick={() => editor?.chain().focus().outdent().run()}
      />
    </ToolbarGroup>
  );
}
