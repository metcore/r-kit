import { Editor } from '@tiptap/react';

const handleResizeTable = (editor: Editor) => {
  editor.state.doc.descendants((node, pos) => {
    if (node.type.name !== 'table') return;

    const domNode = editor.view.nodeDOM(pos);
    if (!domNode) return;

    const table =
      domNode instanceof HTMLTableElement
        ? domNode
        : (domNode as HTMLElement).querySelector('table');

    if (table) {
      table.setAttribute('data-bordered', node.attrs.bordered ?? 'true');
    }
  });
};

export default handleResizeTable;
