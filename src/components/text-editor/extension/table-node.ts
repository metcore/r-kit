import type { CommandProps } from '@tiptap/core';
import { Table } from '@tiptap/extension-table';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customTable: {
      toggleTableBorder: () => ReturnType;
    };
  }
}

const TableNode = Table.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      bordered: {
        default: 'true',
        parseHTML: (element) => element.getAttribute('data-bordered') ?? 'true',
        renderHTML: (attributes) => ({
          'data-bordered': attributes.bordered ?? 'true',
        }),
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      toggleTableBorder:
        () =>
        ({ state, dispatch }: CommandProps) => {
          const { $anchor } = state.selection;

          let tableNode = null;
          let tablePos = -1;

          for (let depth = $anchor.depth; depth > 0; depth--) {
            if ($anchor.node(depth).type.name === 'table') {
              tableNode = $anchor.node(depth);
              tablePos = $anchor.before(depth);
              break;
            }
          }

          if (!tableNode || tablePos < 0) return false;

          const current = tableNode.attrs.bordered !== 'false';

          if (dispatch) {
            dispatch(
              state.tr.setNodeAttribute(
                tablePos,
                'bordered',
                current ? 'false' : 'true'
              )
            );
          }

          return true;
        },
    };
  },
});

export default TableNode;
