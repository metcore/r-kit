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
      types: ['paragraph', 'heading', 'bulletList', 'orderedList'],
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
              return { style: `padding-left: ${indent}px` };
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
          let changed = false;

          state.doc.nodesBetween(from, to, (node, pos, parent) => {
            if (!this.options.types.includes(node.type.name)) return;
            if (parent?.type.name === 'listItem') return;

            const current = (node.attrs['indent'] as number) || 0;
            const next =
              levels.find((l) => l > current) ?? levels[levels.length - 1];

            if (next !== current) {
              tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: next });
              changed = true;
            }
          });

          // Kalau tidak ada node yang cocok (misal cursor di dalam listItem),
          // cari list parent dari $from
          if (!changed) {
            const $from = state.doc.resolve(from);

            for (let depth = $from.depth; depth >= 0; depth--) {
              const node = $from.node(depth);
              if (this.options.types.includes(node.type.name)) {
                const pos = $from.before(depth);
                const current = (node.attrs['indent'] as number) || 0;
                const next =
                  levels.find((l) => l > current) ?? levels[levels.length - 1];

                if (next !== current) {
                  tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    indent: next,
                  });
                }
                break;
              }
            }
          }

          if (dispatch) dispatch(tr);
          return true;
        },

      outdent:
        () =>
        ({ state, dispatch }) => {
          const { selection, tr } = state;
          const { from, to } = selection;
          const levels = this.options.indentLevels;
          let changed = false;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (!this.options.types.includes(node.type.name)) return;

            const current = (node.attrs['indent'] as number) || 0;
            const prev = [...levels].reverse().find((l) => l < current) ?? 0;

            if (prev !== current) {
              tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: prev });
              changed = true;
            }
          });

          if (!changed) {
            const $from = state.doc.resolve(from);

            for (let depth = $from.depth; depth >= 0; depth--) {
              const node = $from.node(depth);
              if (this.options.types.includes(node.type.name)) {
                const pos = $from.before(depth);
                const current = (node.attrs['indent'] as number) || 0;
                const prev =
                  [...levels].reverse().find((l) => l < current) ?? 0;

                if (prev !== current) {
                  tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    indent: prev,
                  });
                }
                break;
              }
            }
          }

          if (dispatch) dispatch(tr);
          return true;
        },
    };
  },
});
