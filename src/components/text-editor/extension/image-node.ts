import { mergeAttributes } from '@tiptap/core';
import Image from '@tiptap/extension-image';
import type { DOMOutputSpec } from '@tiptap/pm/model';

interface ImageInsertAttributes {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  objectFit?: string;
  url?: string | null;
  urlTarget?: string | null;
  textAlign?: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageNode: {
      insertImage: (attrs: ImageInsertAttributes) => ReturnType;
    };
  }
}

const ImageNode = Image.extend({
  // jadikan block supaya bisa di-align
  inline: false,
  group: 'block',

  addCommands() {
    return {
      ...this.parent?.(),
      insertImage:
        (attrs) =>
        ({ chain }) =>
          chain().insertContent({ type: 'image', attrs }).run(),
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (el) => el.getAttribute('width'),
        renderHTML: (attrs) => {
          const width = attrs['width'] as number;
          return width ? { width } : {};
        },
      },
      height: {
        default: null,
        parseHTML: (el) => el.getAttribute('height'),
        renderHTML: (attrs) => {
          const height = attrs['height'] as number;
          return height ? { height } : {};
        },
      },
      objectFit: {
        default: 'contain',
        parseHTML: (el) => el.style.objectFit || 'contain',
        renderHTML: (attrs) => ({
          style: `object-fit: ${attrs['objectFit'] as string}`,
        }),
      },
      textAlign: {
        default: 'left',
        parseHTML: (el) =>
          el.closest('[data-image-wrapper]')?.getAttribute('data-align') ??
          'left',
        renderHTML: () => ({}), // dihandle di nodeView
      },
      url: {
        default: null,
        parseHTML: (el) =>
          el.getAttribute('data-url') ?? // ← tambah ini
          el.closest('a')?.getAttribute('href') ??
          null,
        renderHTML: (attrs: { url: string }) =>
          attrs['url'] ? { 'data-url': attrs['url'] } : {},
      },
      urlTarget: {
        default: '_self',
        parseHTML: (el) =>
          el.getAttribute('data-url-target') ?? // ← tambah ini
          el.closest('a')?.getAttribute('target') ??
          '_self',
        renderHTML: (attrs: { urlTarget: string }) =>
          attrs['urlTarget'] ? { 'data-url-target': attrs['urlTarget'] } : {},
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const {
      textAlign,
      objectFit,
      url,
      urlTarget,
      'data-url': dataUrl, // ← ambil dari sini
      'data-url-target': dataUrlTarget,
      ...rest
    } = HTMLAttributes as ImageInsertAttributes & Record<string, unknown>;

    const align = textAlign ?? 'left';
    const getJustify = (a: string) =>
      a === 'right' ? 'flex-end' : a === 'center' ? 'center' : 'flex-start';

    const resolvedUrl = url ?? dataUrl ?? null;
    const resolvedTarget = urlTarget ?? dataUrlTarget ?? '_self';

    const img: DOMOutputSpec = [
      'img',
      mergeAttributes(rest, {
        style: `object-fit: ${objectFit ?? 'contain'}`,
        // ← tambahkan data-* ke <img> supaya parseHTML bisa baca saat load HTML
        ...(url !== null ? { 'data-url': url } : {}),
        ...(urlTarget == null ? { 'data-url-target': urlTarget } : {}),
      }),
    ];

    const content: DOMOutputSpec =
      resolvedUrl != null
        ? ['a', { href: resolvedUrl, target: resolvedTarget }, img]
        : img;

    const wrapper: DOMOutputSpec = [
      'div',
      {
        'data-image-wrapper': '',
        'data-align': align,
        'style': `display:flex;justify-content:${getJustify(align)};`,
      },
      content,
    ];

    return wrapper;
  },

  addNodeView() {
    return ({ node }) => {
      const wrapper = document.createElement('div');
      wrapper.setAttribute('data-image-wrapper', '');

      const img = document.createElement('img');
      let anchor: HTMLAnchorElement | null = null;

      const update = (n: typeof node) => {
        const align = (n.attrs['textAlign'] as string) ?? 'left';
        const url = n.attrs['url'] as string | null;
        const urlTarget = (n.attrs['urlTarget'] as string) ?? '_self';

        const getJustify = (a: string) =>
          a === 'right' ? 'flex-end' : a === 'center' ? 'center' : 'flex-start';

        wrapper.style.cssText = `display: flex; justify-content: ${getJustify(align)};`;
        wrapper.setAttribute('data-align', align);

        if (n.attrs['src'] as string)
          img.setAttribute('src', n.attrs['src'] as string);
        if (n.attrs['alt'] as string)
          img.setAttribute('alt', n.attrs['alt'] as string);
        if (n.attrs['width'] as string)
          img.setAttribute('width', String(n.attrs['width']));
        if (n.attrs['height'] as string)
          img.setAttribute('height', String(n.attrs['height']));
        img.style.objectFit = (n.attrs['objectFit'] as string) ?? 'contain';

        wrapper.innerHTML = '';

        if (url !== null) {
          if (!anchor) anchor = document.createElement('a');
          anchor.href = url;
          anchor.target = urlTarget;
          anchor.appendChild(img);
          wrapper.appendChild(anchor);
        } else {
          anchor = null;
          wrapper.appendChild(img);
        }
      };

      update(node);

      return {
        dom: wrapper,
        update(updatedNode) {
          if (updatedNode.type.name !== 'image') return false;
          update(updatedNode);
          return true;
        },
      };
    };
  },
});

export default ImageNode;
