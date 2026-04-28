import { Editor, useEditorState } from '@tiptap/react';
import { useState } from 'react';
import { Button } from '../../button';
import { Dropdown, DropdownContent, DropdownTrigger } from '../../dropdown';
import { Icon } from '../../icons';
import { Input } from '../../input';
import { Kbd } from '../../kbd';
import toEmbedUrl from '../helpers/yt-url-to-embed';
import useLinkHandler from '../hooks/use-link-handler';
import ModalInsertImage from './modal-insert-image';
import ModalInsertYoutube from './modal-insert-youtube';
import ToolbarButton from './toolbar-button';
import ToolbarGroup from './toolbar-group';
import type { AttachmentField } from '../type';
import objectfitOptions from '../constants/object-fit-options';

export function InsertGroup({
  editor,
  disabled = false,
  attachmentField,
  onDownload,
}: {
  editor: Editor;
  disabled?: boolean;
  attachmentField?: AttachmentField;
  onDownload?: (data: { src?: string; name?: string }) => void;
}) {
  const [isModalImageOpen, setIsModalImageOpen] = useState(false);
  const [isModalYoutubeOpen, setIsModalYoutubeOpen] = useState(false);

  const { isLink, isInYoutube, isInImage } = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isLink: editor.isActive('link'),
      isInYoutube: editor.isActive('youtubeNode'),
      isInImage: editor.isActive('image'),
    }),
  });

  const {
    applyLink,
    handleOpen,
    isLinkOpen,
    openLink,
    removeLink,
    setUrl,
    url,
    setIsLinkOpen,
  } = useLinkHandler({ editor });

  return (
    <ToolbarGroup>
      {/* link insert */}
      <Dropdown onOpenChange={handleOpen} open={isLinkOpen}>
        <DropdownTrigger asChild>
          <div>
            <ToolbarButton
              title="Insert Link"
              icon="link"
              active={isLink}
              disabled={disabled}
            />
          </div>
        </DropdownTrigger>
        <DropdownContent sideOffset={2} className="z-20">
          <div className="flex items-center gap-2">
            <Input
              mergedAddon
              rightAddonClassName="pl-0!"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste URL here..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  applyLink();
                  setIsLinkOpen(false);
                }
              }}
              rightAddon={
                <button onClick={applyLink}>
                  <Kbd size="sm">
                    <Icon name="arrow-turn-down-left" size={12} />
                  </Kbd>
                </button>
              }
            />
            <Button
              variant="outline"
              size="icon"
              color="danger"
              className="rounded-lg"
              onClick={removeLink}
            >
              <Icon name="trash-regular" size={17} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              color="primary"
              className="rounded-lg"
              onClick={openLink}
            >
              <Icon name="arrow-export" size={17} />
            </Button>
          </div>
        </DropdownContent>
      </Dropdown>

      {/* image */}
      <ToolbarButton
        disabled={disabled}
        title="Image"
        icon="image"
        active={isInImage}
        onClick={() => setIsModalImageOpen(true)}
      />

      {/* youtube */}
      <ToolbarButton
        disabled={disabled}
        title="Insert youtube"
        icon="youtube"
        active={isInYoutube}
        onClick={() => setIsModalYoutubeOpen(true)}
      />

      <ModalInsertYoutube
        isOpen={isModalYoutubeOpen}
        onClose={setIsModalYoutubeOpen}
        initialValues={
          isInYoutube
            ? {
                url: editor.getAttributes('youtubeNode')['src'] as string,
                size: {
                  width: editor.getAttributes('youtubeNode')['width'] as number,
                  height: editor.getAttributes('youtubeNode')[
                    'height'
                  ] as number,
                },
              }
            : undefined
        }
        onSubmit={(form) => {
          if (form?.url === undefined) return;

          editor
            .chain()
            .focus()
            .insertYoutube({
              src: toEmbedUrl(form?.url) ?? '',
              width: form?.size?.width ?? 650,
              height: form?.size?.height ?? 350,
            })
            .run();

          setIsModalYoutubeOpen(false);
        }}
      />

      <ModalInsertImage
        isOpen={isModalImageOpen}
        onClose={setIsModalImageOpen}
        attachmentField={attachmentField}
        initialValues={
          isInImage
            ? {
                image: {
                  source: editor.getAttributes('image')['src'] as string,
                  altText: editor.getAttributes('image')['alt'] as string,
                  width: editor.getAttributes('image')['width'] as string,
                  height: editor.getAttributes('image')['height'] as string,
                  objectFit: {
                    label:
                      objectfitOptions.find(
                        (objectFit) =>
                          objectFit.value ===
                          editor.getAttributes('image')['objectFit']
                      )?.label ?? 'Contain (No Cropping)',
                    value: editor.getAttributes('image')['objectFit'] as string,
                  },
                },
                url: {
                  source: editor.getAttributes('image')['url'] as string,
                  target: {
                    label:
                      editor.getAttributes('image')['urlTarget'] === '_blank'
                        ? 'New Tab'
                        : 'Current Tab',
                    value: editor.getAttributes('image')['urlTarget'] as string,
                  },
                },
              }
            : undefined
        }
        onSubmit={(form) => {
          if (!form) return;
          editor
            ?.chain()
            .focus()
            .insertImage({
              src: form.image.source,
              alt: form.image.altText,
              width: Number(form.image.width),
              height: Number(form.image.height),
              objectFit: String(form.image.objectFit?.value ?? 'contain'),
              url: form.url?.source ?? null,
              urlTarget: (form.url?.target?.value as string) ?? '_self',
            })
            .run();
        }}
        onDownload={onDownload}
      />
    </ToolbarGroup>
  );
}
