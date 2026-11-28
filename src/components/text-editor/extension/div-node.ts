import { Node } from '@tiptap/core';

/**
 * Pembungkus `<div>` dari mode kode atau HTML tempelan. Tanpa node ini
 * div dibuang dan cuma isinya yang tersisa, sehingga style di div hilang.
 * Atribut style/class/id-nya disimpan lewat PreserveAttributes.
 */
const DivNode = Node.create({
  name: 'div',
  group: 'block',
  content: 'block+',
  defining: true,

  parseHTML() {
    return [
      {
        tag: 'div',
        // pembungkus gambar milik ImageNode bukan konten pengguna
        getAttrs: (element) =>
          element.hasAttribute('data-image-wrapper') ? false : null,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', HTMLAttributes, 0];
  },
});

export default DivNode;
