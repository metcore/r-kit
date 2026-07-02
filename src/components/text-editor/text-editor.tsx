import { html } from '@codemirror/lang-html';
import { DragHandle as DragHandleComponent } from '@tiptap/extension-drag-handle-react';
import { Highlight } from '@tiptap/extension-highlight';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
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
import { useEffect, useState } from 'react';
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
  onDownload,
  description,
  errorMessages,
  disabled,
  hint,
  label,
  onChange,
  placeholder,
  required,
  value,
  size,
  height = 350,
  plugins,
}: TextEditorProps) {
  // props
  const {
    disabled: uiDisabled = false,
    className,
    size: uiSize,
    toolbarClassName,
    dragHandleClassName,
    textEditorClassName,
  } = ui ?? {};

  const {
    value: editorValue,
    onChange: editorOnChange,
    placeholder: editorPlaceholder,
    dragHandleProps,
    attachmentField,
  } = editorProps ?? {};

  const {
    description: fieldDescription,
    errorMessages: fieldErrorMessages,
    required: fieldRequired,
    hint: fieldHint,
    label: fieldLabel,
  } = field ?? {};

  const {
    formatting: toolbarFormatting,
    alignment: toolbarAlignment,
    list: toolbarList,
    insert: toolbarInsert,
    table: toolbarTable,
    indent: toolbarIndent,
    advance: toolbarAdvance,
  } = toolbar ?? {};

  // resolved props
  const resolvedLabel = label ?? fieldLabel;
  const resolvedDescription = description ?? fieldDescription;
  const resolvedErrorMessages = errorMessages ?? fieldErrorMessages;
  const resolvedHint = hint ?? fieldHint;
  const resolvedRequired = required ?? fieldRequired;
  const resolvedValue = value ?? editorValue;
  const resolvedOnChange = onChange ?? editorOnChange;
  const resolvedPlaceholder = placeholder ?? editorPlaceholder;
  const resolvedSize = size ?? uiSize;
  const resolvedDisabled = disabled ?? uiDisabled;

  const resolvedToolbar = {
    formatting: plugins?.showToolbar?.formatting ?? toolbarFormatting ?? true,
    alignment: plugins?.showToolbar?.alignment ?? toolbarAlignment ?? true,
    list: plugins?.showToolbar?.list ?? toolbarList ?? true,
    insert: plugins?.showToolbar?.insert ?? toolbarInsert ?? true,
    table: plugins?.showToolbar?.table ?? toolbarTable ?? true,
    indent: plugins?.showToolbar?.indent ?? toolbarIndent ?? true,
    advance: plugins?.showToolbar?.advance ?? toolbarAdvance ?? false,
  };

  // local state
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlValue, setHtmlValue] = useState('');

  // main editor
  const editor = useEditor({
    content: undefined,
    editable: !resolvedDisabled,
    immediatelyRender: true,
    autofocus: false,
    extensions: [
      StarterKit.configure({
        underline: false,
        link: false,
        horizontalRule: false,
      }),
      Underline,
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
        resolvedOnChange?.(editor);
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

  useEffect(() => {
    if (editor === null) return;
    if (resolvedValue === undefined) return;
    if (editor.getHTML() === resolvedValue) return;

    editor.commands.setContent(resolvedValue);
  }, [editor, resolvedValue]);

  if (editor === undefined || editor === null) return null;

  return (
    <FormField
      label={resolvedLabel}
      className={className}
      description={resolvedDescription}
      errorMessages={resolvedErrorMessages}
      hint={resolvedHint}
      required={resolvedRequired}
      size={resolvedSize}
    >
      <div
        className={clsx(
          'relative z-auto flex w-full flex-col rounded-xl border',
          resolvedErrorMessages !== undefined
            ? 'border-danger-500'
            : 'border-gray-300'
        )}
      >
        <div
          className={clsx(
            'sticky top-0 z-1 rounded-t-xl bg-white',
            toolbarClassName
          )}
        >
          <div className="scrollbar-hide flex flex-wrap divide-x divide-gray-300 overflow-x-auto border-b border-gray-300 *:p-2">
            {resolvedToolbar?.formatting && (
              <FormattingGroup
                disabled={isHtmlMode}
                editor={editor}
                paragrapghLabel={plugins?.inputParagraph?.labelParagraph}
              />
            )}
            <AlignmentGroup
              disabled={isHtmlMode}
              editor={editor}
              isAlignmentActive={resolvedToolbar?.alignment}
              isListActive={resolvedToolbar?.list}
              labelLeft={plugins?.inputAlignment?.labelLeft}
              labelRight={plugins?.inputAlignment?.labelRight}
              labelCenter={plugins?.inputAlignment?.labelCenter}
              labelJustify={plugins?.inputAlignment?.labelJustify}
            />
            {resolvedToolbar?.indent && (
              <IndentGroup disabled={isHtmlMode} editor={editor} />
            )}
            {resolvedToolbar?.insert && (
              <InsertGroup
                disabled={isHtmlMode}
                editor={editor}
                attachmentField={attachmentField}
                onDownload={onDownload}
                insertLinkPlaceholder={plugins?.inputLink?.placeholder}
                insertYoutube={plugins?.inputYoutube}
                modalImage={plugins?.inputFile}
              />
            )}
            {resolvedToolbar?.table && (
              <TableGroup disabled={isHtmlMode} editor={editor} />
            )}
            {resolvedToolbar?.advance && (
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
          placeholder={resolvedPlaceholder}
          disabled={resolvedDisabled}
          editor={editor}
          style={
            {
              '--editor-height': height === 'fit-content' ? 'fit-content' : `${height}px`, //prettier-ignore
            } as React.CSSProperties
          }
          className={clsx(
            '*:translate-y-1 *:px-5 *:py-2 *:outline-none',
            textEditorClassName,
            isHtmlMode && 'hidden',
            resolvedDisabled && 'cursor-not-allowed opacity-50',
            height === 'fit-content' ? '*:min-h-100' : 'overflow-auto'
          )}
        />
      </div>
    </FormField>
  );
}
