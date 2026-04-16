import { Extension } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineHeight: {
      setLineHeight: (lineHeight: string) => ReturnType;
      unsetLineHeight: () => ReturnType;
    };
  }
}

const LineHeight = Extension.create({
  name: 'lineHeight',

  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (el) => el.style.lineHeight || null,
            renderHTML: (attrs) => {
              const lh = attrs['lineHeight'] as string;
              return lh ? { style: `line-height: ${lh}` } : {};
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight:
        (lineHeight) =>
        ({ chain }) =>
          chain().setMark('textStyle', { lineHeight }).run(),
      unsetLineHeight:
        () =>
        ({ chain }) =>
          chain()
            .setMark('textStyle', { lineHeight: null })
            .removeEmptyTextStyle()
            .run(),
    };
  },
});

export default LineHeight;
