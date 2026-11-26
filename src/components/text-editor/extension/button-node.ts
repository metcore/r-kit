import { Node } from '@tiptap/core';

const ButtonNode = Node.create({
  name: 'button',

  group: 'block',
  content: 'inline*',
  selectable: true,

  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: (el) => el.getAttribute('style'),
        renderHTML: (attrs: { style: string }) =>
          attrs.style ? { style: attrs.style } : {},
      },

      class: {
        default: null,
        parseHTML: (el) => el.getAttribute('class'),
        renderHTML: (attrs: { class: string }) =>
          attrs.class ? { class: attrs.class } : {},
      },

      type: {
        default: 'button',
        parseHTML: (el) => el?.getAttribute('type') ?? 'button',
        renderHTML: (attrs) => ({ type: attrs.type }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'button',
        getAttrs: (element) => {
          const attrs: Record<string, string> = {};

          for (const attr of element.attributes) {
            // atribut event (onclick, onmouseover, ...) bisa menjalankan
            // script di dalam editor, jadi tidak ikut disimpan.
            if (attr.name.toLowerCase().startsWith('on') === true) continue;
            attrs[attr.name] = attr.value;
          }

          return attrs;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['button', HTMLAttributes, 0];
  },
});

export default ButtonNode;
