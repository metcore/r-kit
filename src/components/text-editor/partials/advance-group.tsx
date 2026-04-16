import ToolbarButton from './toolbar-button';
import { Editor } from '@tiptap/react';
import ToolbarGroup from './toolbar-group';
import { useEffect, useState } from 'react';

export default function AdvanceGroup({
  onModeChange,
}: {
  editor: Editor;
  onModeChange: (isHtmlMode: boolean) => void;
}) {
  const [isHtmlMode, setIsHtmlMode] = useState(false);

  useEffect(() => {
    onModeChange(isHtmlMode);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHtmlMode]);
  return (
    <ToolbarGroup>
      <ToolbarButton
        title="Code Editor Mode"
        icon="code"
        active={isHtmlMode}
        onClick={() => {
          setIsHtmlMode(!isHtmlMode);
        }}
      />
    </ToolbarGroup>
  );
}
