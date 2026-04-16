import { html } from '@codemirror/lang-html';
import { DragHandle as DragHandleComponent } from '@tiptap/extension-drag-handle-react';
import { Highlight } from '@tiptap/extension-highlight';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import { Color, TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { dracula } from '@uiw/codemirror-theme-dracula';
import CodeMirror from '@uiw/react-codemirror';
import clsx from 'clsx';
import { useState } from 'react';
import { FormField } from '../form';
import ButtonNode from './extension/button-node';
import { FontSize } from './extension/font-size';
import ImageNode from './extension/image-node';
import { Indent } from './extension/indent';
import LineHeight from './extension/line-height';
import { PreserveAttributes } from './extension/preserve-attributes';
import TableNode from './extension/table-node';
import YoutubeNode from './extension/youtube-node';
import formatHtml from './helpers/format-html';
import handleResizeTable from './helpers/handle-resize-table';
import AdvanceGroup from './partials/advance-group';
import AlignmentGroup from './partials/alignment-group';
import FormattingGroup from './partials/formatting-group';
import IndentGroup from './partials/indent-group';
import { InsertGroup } from './partials/insert-group';
import TableGroup from './partials/table-group';
import type { TextEditorProps } from './type';

export function TextEditor({
  ui,
  field,
  toolbar,
  editor: editorProps,
}: TextEditorProps) {
  // props
  const {
    disabled = false,
    className,
    size,
    toolbarClassName,
    dragHandleClassName,
    textEditorClassName,
  } = ui ?? {};
  const { value, onChange, placeholder, dragHandleProps, attachmentField } =
    editorProps ?? {};
  const { description, errorMessages, required, hint, label } = field ?? {};
  const {
    formatting = true,
    alignment = true,
    list = true,
    insert = true,
    table = true,
    indent = true,
    advance = true,
  } = toolbar ?? {};

  // local state
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlValue, setHtmlValue] = useState('');

  // main editor
  const editor = useEditor({
    content: value,
    editable: !disabled,
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Image,
      TableRow,
      TableCell,
      TableHeader,
      Subscript,
      ButtonNode,
      FontSize,
      TextStyle,
      LineHeight,
      Color,
      PreserveAttributes,
      HorizontalRule,
      YoutubeNode,
      ImageNode,
      Highlight.configure({ multicolor: true }),
      TableNode.configure({ resizable: true }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'youtubeNode', 'table', 'image'],
      }),
      Indent.configure({
        types: ['paragraph', 'heading', 'bulletList', 'orderedList'],
      }),
    ],
    editorProps: {
      handleClick(_view, _pos, event) {
        const target = event.target as HTMLElement;

        if (target.closest('a')) {
          event.preventDefault();
          return true; // stop handling
        }

        return false;
      },
    },
    onUpdate: ({ editor }) => {
      handleResizeTable(editor);
      setHtmlValue(editor.getHTML());

      if (!isHtmlMode) {
        onChange?.(editor);
      }
    },
  });

  const enterHtmlMode = async () => {
    if (editor === null) return;

    const formatted = await formatHtml(editor?.getHTML());
    setHtmlValue(formatted);
    setIsHtmlMode(true);
  };

  const exitHtmlMode = () => {
    if (editor === null) return;
    editor?.commands.setContent(htmlValue);

    requestAnimationFrame(() => {
      handleResizeTable(editor);
      setHtmlValue(editor?.getHTML());
    });

    setIsHtmlMode(false);
  };

  if (editor === undefined || editor === null) return null;

  return (
    <FormField
      label={label}
      className={className}
      description={description}
      errorMessages={errorMessages}
      hint={hint}
      required={required}
      size={size}
    >
      <div
        className={clsx(
          'relative flex w-full flex-col rounded-xl border',
          errorMessages !== undefined ? 'border-danger-500' : 'border-gray-300'
        )}
      >
        <div
          className={clsx(
            'sticky top-0 z-10 rounded-t-xl bg-white',
            toolbarClassName
          )}
        >
          <div className="scrollbar-hide flex flex-wrap divide-x divide-gray-300 overflow-x-auto border-b border-gray-300 *:p-2">
            {formatting && (
              <FormattingGroup disabled={isHtmlMode} editor={editor} />
            )}
            <AlignmentGroup
              disabled={isHtmlMode}
              editor={editor}
              isAlignmentActive={alignment}
              isListActive={list}
            />
            {indent && <IndentGroup disabled={isHtmlMode} editor={editor} />}
            {insert && (
              <InsertGroup
                disabled={isHtmlMode}
                editor={editor}
                attachmentField={attachmentField}
              />
            )}
            {table && <TableGroup disabled={isHtmlMode} editor={editor} />}
            {advance && (
              <AdvanceGroup
                editor={editor}
                onModeChange={async (nextMode) => {
                  if (nextMode) {
                    await enterHtmlMode();
                  } else {
                    exitHtmlMode();
                  }
                }}
              />
            )}
          </div>
        </div>

        <DragHandleComponent
          editor={editor}
          className={clsx('relative z-20', dragHandleClassName)}
          {...dragHandleProps}
        >
          <div className="custom-drag-handle absolute left-0" />
        </DragHandleComponent>

        <CodeMirror
          value={htmlValue}
          extensions={[html()]}
          onChange={(value) => setHtmlValue(value)}
          theme={dracula}
          className={clsx(isHtmlMode ? 'block' : 'hidden')}
        />
        <EditorContent
          placeholder={placeholder}
          disabled={disabled}
          editor={editor}
          className={clsx(
            '*:min-h-100 *:translate-y-1 *:px-5 *:py-2 *:outline-none',
            textEditorClassName,
            isHtmlMode && 'hidden'
          )}
        />
      </div>
    </FormField>
  );
}
