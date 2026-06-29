import { useEffect, useState } from 'react';
import { Button } from '../../button';
import { ButtonIcon } from '../../button-icon';
import { Input } from '../../input';
import { Kbd } from '../../kbd';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../modal';
import { Text } from '../../text/text';
import isValidYoutubeUrl from '../helpers/is-valid-youtube-url';
import toEmbedUrl from '../helpers/yt-url-to-embed';
import { useKeyboardShortcut } from '../hooks/use-keyboard-shortcut';
import type { BaseInputYoutube } from '../type';

interface YoutubeForm {
  size: {
    width: number;
    height: number;
  };
  url: string;
}

interface Props extends BaseInputYoutube {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onSubmit: (form?: YoutubeForm) => void;
  initialValues?: YoutubeForm;
}

export default function ModalInsertYoutube({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  height,
  modal,
  url,
  width,
  labelPreviewTitle,
}: Props) {
  const defaultValue = {
    size: {
      width: 600,
      height: 300,
    },
    url: '',
  };

  const [youtubeForm, setYoutubeForm] = useState<YoutubeForm>(defaultValue);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setYoutubeForm(initialValues || defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialValues]);

  useKeyboardShortcut({
    key: 'Escape',
    callback: () => {
      onClose(false);
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} closable={false}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onSubmit?.(youtubeForm);
          setYoutubeForm(defaultValue);
        }}
        className="overflow-auto"
      >
        <ModalHeader className="flex-row! items-center justify-between border-b border-gray-200">
          <Text variant="t1" weight="medium" className="mb-0! text-gray-900">
            {modal?.title ?? 'Insert Youtube'}
          </Text>
          <div className="flex items-center">
            <Kbd>ESC</Kbd>
            <ButtonIcon
              icon="times"
              variant={'tertiary'}
              onClick={() => onClose(false)}
              type="button"
            />
          </div>
        </ModalHeader>

        <ModalBody className="space-y-4 pb-5">
          <Input
            required
            label={url?.label ?? 'URL'}
            type="url"
            placeholder={
              url?.placeholder ?? 'e.g https://www.youtube.com/watch?v=xxxx'
            }
            errorMessages={!isValid ? 'Youtube URL is invalid' : undefined}
            value={youtubeForm?.url ?? ''}
            onChange={(e) => {
              setYoutubeForm({ ...youtubeForm, url: e.target.value });
              setIsValid(
                e.target.value === '' || isValidYoutubeUrl(e.target.value)
              );
            }}
          />

          <div className="flex items-center gap-2 *:flex-1">
            <Input
              type="number"
              label={width?.label ?? 'Width'}
              placeholder={width?.placeholder ?? '600'}
              rightAddon={
                <Text weight="medium" className="text-gray-900">
                  px
                </Text>
              }
              value={youtubeForm.size.width ?? 0}
              onChange={(e) =>
                setYoutubeForm({
                  ...youtubeForm,
                  size: { ...youtubeForm.size, width: Number(e.target.value) },
                })
              }
            />
            <Input
              type="number"
              label={height?.label ?? 'Height'}
              placeholder={height?.placeholder ?? '100'}
              rightAddon={
                <Text weight="medium" className="text-gray-900">
                  px
                </Text>
              }
              value={youtubeForm.size.height ?? 0}
              onChange={(e) =>
                setYoutubeForm({
                  ...youtubeForm,
                  size: { ...youtubeForm.size, height: Number(e.target.value) },
                })
              }
            />
          </div>

          {youtubeForm.url && isValid && (
            <div className="flex w-full flex-col gap-2">
              <Text variant="t2" weight="semibold" className="text-gray-900">
                {labelPreviewTitle ?? 'Preview Video Youtube'}
              </Text>
              <div className="aspect-video w-full">
                <iframe
                  width={youtubeForm.size.width}
                  height={youtubeForm.size.height}
                  className="rounded-lg"
                  src={toEmbedUrl(youtubeForm.url) ?? ''}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>
            </div>
          )}
        </ModalBody>

        <ModalFooter className="flex items-center justify-end">
          <Button
            variant={'outline'}
            color="danger"
            type="button"
            onClick={() => onClose(false)}
          >
            {modal?.labelButtonCancel ?? 'Cancel'}
          </Button>
          <Button color="primary">{modal?.labelButtonSave ?? 'Save'}</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
