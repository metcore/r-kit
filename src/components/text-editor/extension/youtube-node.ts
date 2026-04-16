// extension/youtube-node.ts
import { mergeAttributes, Node } from '@tiptap/core';

export interface YoutubeNodeAttrs {
  src: string;
  width: number;
  height: number;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    youtubeNode: {
      insertYoutube: (attrs: YoutubeNodeAttrs) => ReturnType;
    };
  }
}

const getJustify = (align: string) => {
  switch (align) {
    case 'left':
      return 'flex-start';
    case 'right':
      return 'flex-end';
    case 'center':
      return 'center';
    default:
      return 'center';
  }
};

const YoutubeNode = Node.create({
  name: 'youtubeNode',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (el) => el.getAttribute('src'),
        renderHTML: (attrs) => ({ src: attrs['src'] as string }),
      },
      width: {
        default: 650,
        parseHTML: (el) => parseInt(el.getAttribute('width') ?? '650'),
        renderHTML: (attrs) => ({ width: attrs['width'] as number }),
      },
      height: {
        default: 350,
        parseHTML: (el) => parseInt(el.getAttribute('height') ?? '350'),
        renderHTML: (attrs) => ({ height: attrs['height'] as number }),
      },
      textAlign: {
        default: 'center',
        parseHTML: (el) => el.style.textAlign || 'center',
        renderHTML: (attrs) => ({
          style: `text-align: ${attrs['textAlign'] as string}`,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'iframe[src*="youtube.com/embed"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'iframe',
      mergeAttributes(HTMLAttributes, {
        allow:
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
        referrerpolicy: 'strict-origin-when-cross-origin',
        allowfullscreen: 'true',
        class: 'rounded-lg',
        frameborder: '0',
      }),
    ];
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText =
        'display: flex; justify-content: center; margin: 0.5rem 0;';

      const updateAlignment = (align: string) => {
        wrapper.style.justifyContent = getJustify(align);
      };

      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', node.attrs['src'] as string);
      iframe.setAttribute('width', String(node.attrs['width']));
      iframe.setAttribute('height', String(node.attrs['height']));
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute(
        'allow',
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      );
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      iframe.style.cssText = 'border-radius: 8px; transition: outline 0.15s;';

      updateAlignment((node.attrs['textAlign'] as string) ?? 'center');
      wrapper.appendChild(iframe);

      const updateSelection = () => {
        const pos = typeof getPos === 'function' ? getPos() : null;
        if (pos === null || pos === undefined) return;

        const { from, to } = editor.state.selection;
        const isSelected = from <= pos && pos < to;

        iframe.style.outline = isSelected ? '2px solid #6366f1' : 'none';
        iframe.style.outlineOffset = isSelected ? '1px' : 'none';
      };

      // observe selection changes
      editor.on('selectionUpdate', updateSelection);
      editor.on('transaction', updateSelection);

      return {
        dom: wrapper,
        update(updatedNode) {
          if (updatedNode.type.name !== 'youtubeNode') return false;
          iframe.setAttribute('src', updatedNode.attrs['src'] as string);
          iframe.setAttribute('width', String(updatedNode.attrs['width']));
          iframe.setAttribute('height', String(updatedNode.attrs['height']));
          updateAlignment(
            (updatedNode.attrs['textAlign'] as string) ?? 'center'
          );
          updateSelection();
          return true;
        },
        destroy() {
          editor.off('selectionUpdate', updateSelection);
          editor.off('transaction', updateSelection);
        },
      };
    };
  },

  addCommands() {
    return {
      insertYoutube:
        (attrs) =>
        ({ chain }) =>
          chain().insertContent({ type: 'youtubeNode', attrs }).run(),
    };
  },
});

export default YoutubeNode;
