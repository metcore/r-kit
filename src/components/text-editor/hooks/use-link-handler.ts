import { useRef, useState } from 'react';
import { Editor } from '@tiptap/react';

export default function useLinkHandler({ editor }: { editor: Editor }) {
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [url, setUrl] = useState('');
  const savedSelection = useRef<{ from: number; to: number } | null>(null);

  const handleOpen = (open: boolean) => {
    setIsLinkOpen(open);

    if (open) {
      const { from, to } = editor.state.selection;
      savedSelection.current = { from, to };

      const existing = editor.getAttributes('link').href as string | undefined;
      setUrl(existing ?? '');
    }
  };

  const applyLink = () => {
    if (!url) return;

    const saved = savedSelection.current;

    editor
      .chain()
      .focus()
      .setTextSelection(saved ?? editor.state.selection)
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();

    setIsLinkOpen(false);
  };

  const removeLink = () => {
    const saved = savedSelection.current;

    editor
      .chain()
      .focus()
      .setTextSelection(saved ?? editor.state.selection)
      .extendMarkRange('link')
      .unsetLink()
      .run();

    setUrl('');
    setIsLinkOpen(false);
  };

  const openLink = () => {
    const href = editor.getAttributes('link').href as string;
    if (href) {
      window.open(href, '_blank');
    }
  };

  return {
    openLink,
    removeLink,
    applyLink,
    handleOpen,
    isLinkOpen,
    url,
    setUrl,
    setIsLinkOpen,
  };
}
