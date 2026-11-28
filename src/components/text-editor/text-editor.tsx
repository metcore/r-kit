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
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Button } from '../button';
import { FormField } from '../form';
import { Icon } from '../icons';
import ButtonNode from './extension/button-node';
import DivNode from './extension/div-node';
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
import type { TextEditorProps, TextEditorRef } from './type';

const TextEditor = forwardRef<TextEditorRef, TextEditorProps>(
  function TextEditor(
    {
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
      onCreate,
      placeholder,
      required,
      value,
      size,
      height = 350,
      toolbarCollapsible = true,
      plugins,
    },
    ref
  ) {
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

    const toolbarGroupsRef = useRef<HTMLDivElement>(null);
    const [isToolbarExpanded, setIsToolbarExpanded] = useState(false);
    const [toolbarRowHeight, setToolbarRowHeight] = useState<number>();
    // jumlah tombol di luar baris pertama; 0 = semua muat satu baris dan
    // tombol More/Less tidak ditampilkan
    const [hiddenToolCount, setHiddenToolCount] = useState(0);
    // posisi garis horizontal di antara baris toolbar yang turun (px dari
    // atas baris toolbar)
    const [toolbarRowLines, setToolbarRowLines] = useState<number[]>([]);
    const isToolbarCollapsed = toolbarCollapsible && !isToolbarExpanded;

    useEffect(() => {
      const container = toolbarGroupsRef.current;
      if (container === null) return;

      // Pemisah antargrup cuma tampil kalau grup di kiri dan kanannya ada
      // di baris yang sama. Di awal atau ujung baris garisnya disembunyikan
      // (tetap makan tempat, supaya posisi tombol tidak bergeser lagi).
      const markSeparators = () => {
        const sequence = Array.from(
          container.querySelectorAll<HTMLElement>(':scope > [role="group"] > *')
        ).filter((el) => el.offsetHeight > 0);
        const centerY = (el: HTMLElement) => {
          const r = el.getBoundingClientRect();
          return r.top + r.height / 2;
        };
        const sameRow = (a: HTMLElement, b: HTMLElement) =>
          Math.abs(centerY(a) - centerY(b)) < 8;

        sequence.forEach((el, i) => {
          if (!el.hasAttribute('data-toolbar-gap')) return;
          const prev = sequence[i - 1] as HTMLElement | undefined;
          const next = sequence[i + 1] as HTMLElement | undefined;
          const between =
            prev !== undefined &&
            next !== undefined &&
            sameRow(prev, el) &&
            sameRow(el, next);
          el.dataset.edge = String(!between);
        });
      };

      // toolbar collapsible: tinggi baris pertama diukur dari tombol yang ada
      // di baris itu, dan tombol buka/tutup cuma muncul kalau ada tombol
      // yang turun ke baris berikutnya.
      const measureCollapse = () => {
        // grup memakai `display: contents`, jadi yang punya kotak adalah
        // tombol di dalamnya, bukan grupnya.
        const items = Array.from(
          container.querySelectorAll<HTMLElement>(
            ':scope > [role="group"] > :not([data-toolbar-gap])'
          )
        ).filter((el) => el.offsetHeight > 0);
        if (items.length === 0) return;

        const box = container.getBoundingClientRect();
        const rects = items.map((el) => el.getBoundingClientRect());
        const firstTop = rects[0].top;
        const firstRow = rects.filter((r) => r.top < firstTop + r.height / 2);
        const rowBottom = Math.max(...firstRow.map((r) => r.bottom));
        const paddingBottom = parseFloat(
          getComputedStyle(container).paddingBottom
        );

        setToolbarRowHeight(Math.ceil(rowBottom - box.top + paddingBottom));
        setHiddenToolCount(rects.filter((r) => r.top >= rowBottom).length);
      };

      // Garis pemisah antarbaris: diletakkan di tengah jarak antara bawah
      // baris sebelumnya dan atas baris berikutnya, selebar toolbar.
      const measureRowLines = () => {
        const items = Array.from(
          container.querySelectorAll<HTMLElement>(
            ':scope > [role="group"] > :not([data-toolbar-gap])'
          )
        ).filter((el) => el.offsetHeight > 0);
        const rows: { top: number; bottom: number }[] = [];
        items.forEach((el) => {
          const r = el.getBoundingClientRect();
          const center = r.top + r.height / 2;
          const row = rows.find(
            (row) => center > row.top && center < row.bottom
          );
          if (row === undefined) {
            rows.push({ top: r.top, bottom: r.bottom });
          } else {
            row.top = Math.min(row.top, r.top);
            row.bottom = Math.max(row.bottom, r.bottom);
          }
        });
        rows.sort((a, b) => a.top - b.top);
        const originTop = (
          container.parentElement ?? container
        ).getBoundingClientRect().top;
        const lines = rows
          .slice(1)
          .map((row, i) =>
            Math.round((rows[i].bottom + row.top) / 2 - originTop)
          );
        setToolbarRowLines((prev) =>
          prev.length === lines.length && prev.every((v, i) => v === lines[i])
            ? prev
            : lines
        );
      };

      const measure = () => {
        markSeparators();
        measureRowLines();
        if (toolbarCollapsible) measureCollapse();
      };

      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(container);
      return () => observer.disconnect();
    }, [toolbarCollapsible]);

    // Toolbar sticky: dianggap menempel kalau penanda tepat di atasnya sudah
    // tergulir lewat, sementara toolbar-nya tertahan. Dicek di semua scroll
    // (capture), jadi berlaku juga di dalam Modal/Sheet yang punya scroll
    // sendiri. Border atas selalu ada (transparan) supaya tinggi tidak
    // berubah saat menempel.
    const toolbarRef = useRef<HTMLDivElement>(null);
    const toolbarSentinelRef = useRef<HTMLDivElement>(null);
    const [isToolbarStuck, setIsToolbarStuck] = useState(false);

    useEffect(() => {
      let frame = 0;
      const check = () => {
        frame = 0;
        const toolbar = toolbarRef.current;
        const sentinel = toolbarSentinelRef.current;
        if (toolbar === null || sentinel === null) return;
        const stuck =
          sentinel.getBoundingClientRect().bottom <
          toolbar.getBoundingClientRect().top - 0.5;
        setIsToolbarStuck(stuck);
      };
      const schedule = () => {
        if (frame === 0) frame = requestAnimationFrame(check);
      };

      check();
      window.addEventListener('scroll', schedule, {
        capture: true,
        passive: true,
      });
      window.addEventListener('resize', schedule);
      return () => {
        if (frame !== 0) cancelAnimationFrame(frame);
        window.removeEventListener('scroll', schedule, { capture: true });
        window.removeEventListener('resize', schedule);
      };
    }, []);

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
        DivNode,
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

    useEffect(() => {
      if (editor === null || editor === undefined) return;

      onCreate?.(editor);
      // hanya dipanggil sekali saat instance editor siap
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor]);

    useImperativeHandle(
      ref,
      () => ({
        editor: editor ?? null,
        focus: () => {
          editor?.chain().focus().run();
        },
        insertText: (text) => {
          if (text === '') return;

          // dibungkus sebagai text node supaya tidak diparse sebagai HTML
          editor?.chain().focus().insertContent({ type: 'text', text }).run();
        },
        insertContent: (content) => {
          editor?.chain().focus().insertContent(content).run();
        },
      }),
      [editor]
    );

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
          {/*
           * mb-30 + spacer -mt-30: margin bawah ikut dihitung saat sticky
           * dibatasi kotak induknya, jadi toolbar berhenti menempel 120px
           * sebelum ujung bawah editor (tidak terbawa sampai ke ujung),
           * sementara isi di bawahnya tetap rapat.
           */}
          <div ref={toolbarSentinelRef} aria-hidden className="h-0" />
          <div
            ref={toolbarRef}
            className={clsx(
              'sticky top-0 z-1 mb-30 rounded-t-xl border-t bg-white',
              isToolbarStuck ? 'border-gray-300' : 'border-transparent',
              toolbarClassName
            )}
          >
            <div // mobile: ikon toolbar dikecilkan ke 16px; kotak tombolnya tetap,
              // supaya target sentuhnya tidak ikut mengecil
              className="relative flex min-w-0 items-start border-b border-gray-300 max-sm:[&_svg]:size-4"
            >
              {!isToolbarCollapsed &&
                toolbarRowLines.map((top) => (
                  <span
                    key={top}
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 h-px bg-gray-300"
                    style={{ top }}
                  />
                ))}
              <div
                ref={toolbarGroupsRef}
                className={clsx(
                  'flex min-w-0 flex-1 flex-wrap items-center gap-x-1 gap-y-3 px-2 py-1.5',
                  // jarak antargrup: jarak di awal baris toolbar tidak perlu
                  '[&>[role=group]:first-child>[data-toolbar-gap]]:hidden',
                  isToolbarCollapsed && 'overflow-hidden'
                )}
                style={
                  isToolbarCollapsed && toolbarRowHeight !== undefined
                    ? { maxHeight: toolbarRowHeight }
                    : undefined
                }
              >
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
              {toolbarCollapsible && hiddenToolCount > 0 && (
                <div
                  className="flex shrink-0 items-center py-1.5 pr-2 pl-1"
                  // setinggi baris pertama, supaya tidak ikut memanjang saat
                  // toolbar dibuka beberapa baris
                  style={{ height: toolbarRowHeight }}
                >
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    color="gray"
                    aria-expanded={isToolbarExpanded}
                    title={
                      isToolbarExpanded ? 'Show fewer tools' : 'Show all tools'
                    }
                    aria-label={
                      isToolbarExpanded ? 'Show fewer tools' : 'Show all tools'
                    }
                    onClick={() => setIsToolbarExpanded((prev) => !prev)}
                    className="w-8 px-0"
                  >
                    <Icon
                      name={
                        isToolbarExpanded
                          ? 'angle-up-small'
                          : 'angle-down-small'
                      }
                      size={18}
                    />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div aria-hidden className="-mt-30" />

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
            onChange={(value) => {
              setHtmlValue(value);
              if (editor === null) return;
              // Sinkronkan ke editor + onChange per ketikan, supaya form
              // yang disimpan selagi masih di mode kode tetap dapat isinya.
              // emitUpdate false: onUpdate akan menimpa htmlValue dengan
              // HTML hasil normalisasi dan menggeser kursor CodeMirror.
              editor.commands.setContent(value, { emitUpdate: false });
              resolvedOnChange?.(editor);
            }}
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
              '*:h-(--editor-height) *:translate-y-1 *:px-5 *:py-2 *:outline-none',
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
);

TextEditor.displayName = 'TextEditor';

export { TextEditor };
