import { Extension } from '@tiptap/core';

export interface IndentOptions {
  types: string[];
  indentLevels: number[];
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType;
      outdent: () => ReturnType;
    };
  }
}

export const Indent = Extension.create<IndentOptions>({
  name: 'indent',

  addOptions() {
    return {
      types: ['paragraph', 'heading'],
      indentLevels: [0, 20, 40, 60, 80, 100], // px
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              const margin = element.style.marginLeft;
              return margin ? parseInt(margin) : 0;
            },
            renderHTML: (attrs) => {
              const indent = attrs['indent'] as number;
              if (!indent) return {};
              return { style: `margin-left: ${indent}px` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      indent:
        () =>
        ({ state, dispatch }) => {
          const { selection, tr } = state;
          const { from, to } = selection;
          const levels = this.options.indentLevels;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (!this.options.types.includes(node.type.name)) return;

            const current = (node.attrs['indent'] as number) || 0;
            const next =
              levels.find((l) => l > current) ?? levels[levels.length - 1];

            if (next !== current) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                indent: next,
              });
            }
          });

          if (dispatch) dispatch(tr);
          return true;
        },

      outdent:
        () =>
        ({ state, dispatch }) => {
          const { selection, tr } = state;
          const { from, to } = selection;
          const levels = this.options.indentLevels;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (!this.options.types.includes(node.type.name)) return;

            const current = (node.attrs['indent'] as number) || 0;
            const prev = [...levels].reverse().find((l) => l < current) ?? 0;

            if (prev !== current) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                indent: prev,
              });
            }
          });

          if (dispatch) dispatch(tr);
          return true;
        },
    };
  },
});
