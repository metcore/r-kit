// extension/preserve-attributes.ts
import { Extension } from '@tiptap/core';

/**
 * Override parseHTML untuk semua node agar tidak drop atribut unknown
 */
export const PreserveAttributes = Extension.create({
  name: 'preserveAttributes',

  addGlobalAttributes() {
    return [
      {
        types: [
          'paragraph',
          'heading',
          'bulletList',
          'orderedList',
          'listItem',
          'blockquote',
          'codeBlock',
          'link',
          'button',
          'table',
          'iframe',
          'a',
        ],
        attributes: {
          style: {
            default: null,
            parseHTML: (el) => el.getAttribute('style'),
            renderHTML: (attrs) => {
              const style = attrs['style'] as string;
              return style ? { style } : {};
            },
          },
          class: {
            default: null,
            parseHTML: (el) => el.getAttribute('class'),
            renderHTML: (attrs) => {
              const cls = attrs['class'] as string;
              return cls ? { class: cls } : {};
            },
          },
          id: {
            default: null,
            parseHTML: (el) => el.getAttribute('id'),
            renderHTML: (attrs) => {
              const id = attrs['id'] as string;
              return id ? { id } : {};
            },
          },
          onclick: {
            default: null,
            parseHTML: (el) => el.getAttribute('onclick'),
            renderHTML: (attrs) => {
              const onclick = attrs['onclick'] as string;
              return onclick ? { onclick } : {};
            },
          },
          src: {
            default: null,
            parseHTML: (el) => el.getAttribute('src'),
            renderHTML: (attrs) => {
              const src = attrs['src'] as string;
              return src ? { src } : {};
            },
          },
          bordered: {
            default: null,
            parseHTML: (element) => {
              const val = element.getAttribute('data-bordered');
              if (val === null) return null;
              return val === 'true';
            },
            renderHTML: (attributes) => {
              if (attributes.bordered === null) return {};
              return {
                'data-bordered': String(attributes.bordered),
              };
            },
          },
        },
      },
    ];
  },
});
