import { Editor, useEditorState } from '@tiptap/react';
import clsx from 'clsx';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '../../dropdown';
import { Icon } from '../../icons';
import { Text } from '../../text/text';
import { type HeadingLevel } from '../type';
import ToolbarButton from './toolbar-button';
import ToolbarGroup from './toolbar-group';
import { useEffect, useState } from 'react';
import { Input } from '../../input';
import ColorPickerButton from './color-picker-button';

const headings: { level: HeadingLevel; title: string; fontSize: number }[] = [
  { level: 1, title: 'H1', fontSize: 24 },
  { level: 2, title: 'H2', fontSize: 20 },
  { level: 3, title: 'H3', fontSize: 18 },
  { level: 4, title: 'H4', fontSize: 16 },
  { level: 5, title: 'H5', fontSize: 14 },
  { level: 6, title: 'H6', fontSize: 12 },
];

const fontSizes: number[] = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 30, 36];
const lineHeights: number[] = [0.5, 1, 1.5, 1.8, 2, 3, 4, 5];

export default function FormattingGroup({
  editor,
  disabled = false,
}: {
  editor: Editor;
  disabled?: boolean;
}) {
  const [customFontSize, setCustomFontSize] = useState(16);
  const [customLineHeight, setCustomLineHeight] = useState(1.5);

  const activeState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isInYoutube: editor.isActive('youtubeNode'),
      isInImage: editor.isActive('image'),
      bold: editor.isActive('bold'),
      italic: editor.isActive('italic'),
      underline: editor.isActive('underline'),
      strike: editor.isActive('strike'),
      subscript: editor.isActive('subscript'),
      activeHorizontal: editor.isActive('horizontalRule'),
      activeBlockQuote: editor.isActive('blockquote'),
      activeFontSize: editor.getAttributes('textStyle').fontSize as string,
      activeLineHeight: editor.getAttributes('textStyle').lineHeight as string,
      activeColor: editor.getAttributes('textStyle').color as string,
      activeHighlight: editor.getAttributes('highlight').color as string,
      activeHeading: headings.find(({ level }) => editor.isActive('heading', { level }))?.level ?? null, //prettier-ignore
      activeParagraph: editor.isActive('paragraph'),
    }),
  });

  const displayFontSize = activeState?.activeFontSize
    ? parseInt(activeState.activeFontSize)
    : 16;

  const displayLineHeight = activeState?.activeLineHeight
    ? parseFloat(activeState.activeLineHeight)
    : 1.5;

  useEffect(() => {
    setCustomFontSize(displayFontSize);
  }, [displayFontSize]);

  useEffect(() => {
    setCustomLineHeight(displayLineHeight);
  }, [displayLineHeight]);

  return (
    <>
      <ToolbarGroup>
        <Dropdown>
          <DropdownTrigger asChild className="outline-none">
            <div>
              <ToolbarButton
                disabled={
                  disabled || activeState.isInYoutube || activeState.isInImage
                }
                title="Heading"
                className="flex items-center gap-1 *:text-gray-900"
              >
                <Text weight="medium">{displayFontSize}</Text>
                <Icon name="sort-vertical" size={17} />
              </ToolbarButton>
            </div>
          </DropdownTrigger>
          <DropdownContent
            sideOffset={3}
            className="z-30 max-h-50 overflow-y-auto p-1"
          >
            <Input
              type="number"
              placeholder="0"
              value={customFontSize ?? ''}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter') {
                  editor
                    .chain()
                    .focus()
                    .setFontSize(customFontSize + 'px')
                    .run();
                }
              }}
              onBlur={() => {
                if (customFontSize) {
                  editor
                    .chain()
                    .focus()
                    .setFontSize(customFontSize + 'px')
                    .run();
                }
              }}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val)) {
                  setCustomFontSize(val);
                }
              }}
              className="w-12"
              size="sm"
            />
            {fontSizes.map((size, index) => (
              <DropdownItem
                key={index}
                className={clsx(
                  'flex justify-start rounded-md border-transparent py-1',
                  displayFontSize === size && 'bg-primary-50 border-primary-300'
                )}
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .setFontSize(size + 'px')
                    .run();
                }}
              >
                <Text weight="medium" className="text-gray-900">
                  {size}
                </Text>
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
      </ToolbarGroup>

      <ToolbarGroup>
        <Dropdown>
          <DropdownTrigger
            className="outline-none"
            disabled={
              disabled || activeState.isInYoutube || activeState.isInImage
            }
          >
            <div
              title="Heading"
              className={clsx(
                'flex items-center gap-1 rounded-lg border border-gray-300 p-2',
                (disabled ||
                  activeState.isInYoutube ||
                  activeState.isInImage) &&
                  'opacity-50'
              )}
            >
              <Icon
                name={activeState.activeHeading ? 'heading' : 'paragraph'}
                size={20}
                className="text-gray-900"
              />

              {activeState.activeHeading && (
                <Text variant="t2" weight="semibold" className="translate-y-px">
                  {activeState.activeHeading}
                </Text>
              )}
              <Icon
                name="angle-down-small"
                size={18}
                className={clsx(activeState.activeHeading && 'ml-1')}
              />
            </div>
          </DropdownTrigger>
          <DropdownContent sideOffset={3} className="z-30 p-1">
            <DropdownItem
              className={clsx(
                'rounded-md border-transparent py-1',
                activeState.activeParagraph &&
                  'bg-primary-50 border-primary-300'
              )}
              onClick={() => {
                editor.chain().focus().setParagraph().run();
              }}
            >
              <Text weight="medium" className="text-gray-900">
                Paragraph
              </Text>
            </DropdownItem>
            {headings.map((head, index) => (
              <DropdownItem
                key={index}
                className={clsx(
                  'rounded-md border-transparent py-1',
                  activeState.activeHeading === head.level &&
                    'bg-primary-50 border-primary-300'
                )}
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .setHeading({ level: head.level })
                    .setFontSize(head.fontSize + 'px')
                    .run();
                }}
              >
                <Text weight="medium" className="text-gray-900">
                  {head.title}
                </Text>
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>

        <ToolbarButton
          title="Bold"
          icon="bold"
          iconSize={18}
          disabled={
            disabled || activeState.isInYoutube || activeState.isInImage
          }
          active={activeState.bold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          title="Italic"
          icon="italic"
          iconSize={18}
          disabled={
            disabled || activeState.isInYoutube || activeState.isInImage
          }
          active={activeState.italic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          title="Underline"
          icon="underline"
          iconSize={18}
          disabled={
            disabled || activeState.isInYoutube || activeState.isInImage
          }
          active={activeState.underline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />

        <Dropdown>
          <DropdownTrigger
            className="outline-none"
            disabled={
              disabled || activeState.isInYoutube || activeState.isInImage
            }
          >
            <div
              title="Line Height"
              className={clsx(
                'flex items-center gap-1 rounded-lg border border-gray-300 p-2',
                (disabled ||
                  activeState.isInYoutube ||
                  activeState.isInImage) &&
                  'opacity-50'
              )}
            >
              <Icon
                name="paragraph-spacing"
                size={20}
                className="text-gray-900"
              />

              <Text variant="t2" weight="semibold">
                {activeState.activeLineHeight ?? '1.5'}
              </Text>
              <Icon name="angle-down-small" size={18} className="ml-1" />
            </div>
          </DropdownTrigger>
          <DropdownContent
            sideOffset={3}
            className="z-30 max-h-50 overflow-auto p-1"
          >
            <Input
              type="number"
              step={0.1}
              max={10}
              placeholder="0"
              value={customLineHeight ?? ''}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter') {
                  editor
                    .chain()
                    .focus()
                    .setLineHeight(String(customLineHeight))
                    .run();
                }
              }}
              onBlur={() => {
                if (customLineHeight) {
                  editor
                    .chain()
                    .focus()
                    .setLineHeight(String(customLineHeight))
                    .run();
                }
              }}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val)) setCustomLineHeight(val);
              }}
              className="w-13 px-1 text-center"
              size="sm"
            />
            {lineHeights.map((size, index) => (
              <DropdownItem
                key={index}
                className={clsx(
                  'flex justify-center rounded-md border-transparent py-1',
                  displayLineHeight === size &&
                    'bg-primary-50 border-primary-300'
                )}
                onClick={() => {
                  editor.chain().focus().setLineHeight(String(size)).run();
                }}
              >
                <Text weight="medium" className="text-gray-900">
                  {size}
                </Text>
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>

        <ToolbarButton
          title="Strike"
          icon="strike-through"
          iconSize={20}
          disabled={
            disabled || activeState.isInYoutube || activeState.isInImage
          }
          active={activeState.strike}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />

        <ToolbarButton
          title="Horizontal Line"
          icon="horizontal-line"
          iconSize={20}
          disabled={
            disabled ||
            activeState.isInYoutube ||
            activeState.activeHorizontal ||
            activeState.isInImage
          }
          active={activeState.activeHorizontal}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />

        <ToolbarButton
          title="BlockQuote"
          icon="quote"
          iconSize={23}
          disabled={
            disabled || activeState.isInYoutube || activeState.isInImage
          }
          active={activeState.activeBlockQuote}
          onClick={() => editor.commands.toggleBlockquote()}
        />

        <ToolbarButton
          title="Subscript"
          icon="subscript"
          iconSize={23}
          disabled={
            disabled || activeState.isInYoutube || activeState.isInImage
          }
          active={activeState.subscript}
          onClick={() => editor.chain().focus().toggleSubscript().run()}
        />

        <ColorPickerButton
          id="text-highlight"
          icon="stabilo"
          color={activeState.activeHighlight ?? '#ffffff'}
          disabled={
            disabled || activeState.isInYoutube || activeState.isInImage
          }
          onChange={(color: string) =>
            editor.chain().focus().setHighlight({ color }).run()
          }
        />

        <ColorPickerButton
          id="text-color"
          icon="letter-a"
          color={activeState.activeColor ?? '#000000'}
          disabled={
            disabled || activeState.isInYoutube || activeState.isInImage
          }
          onChange={(color: string) =>
            editor.chain().focus().setColor(color).run()
          }
        />
      </ToolbarGroup>
    </>
  );
}
