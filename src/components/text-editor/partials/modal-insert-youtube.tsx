import { useEffect, useState } from 'react';
import { Button } from '../../button';
import { Icon } from '../../icons';
import { Input } from '../../input';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../modal';
import { Text } from '../../text/text';
import toEmbedUrl from '../helpers/yt-url-to-embed';
import isValidYoutubeUrl from '../helpers/is-valid-youtube-url';

interface YoutubeForm {
  size: {
    width: number;
    height: number;
  };
  url: string;
}

interface Props {
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
}: Props) {
  const defaultValue = {
    size: {
      width: 650,
      height: 350,
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

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} closable={false}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(youtubeForm);
          setYoutubeForm(defaultValue);
        }}
        className="overflow-auto"
      >
        <ModalHeader className="flex-row! items-center justify-between border-b border-gray-200">
          <Text variant="t1" weight="medium" className="mb-0! text-gray-900">
            Image Properties
          </Text>
          <Button
            size={'icon'}
            onClick={() => onClose(false)}
            variant={'tertiary'}
            type="button"
          >
            <Icon name="times" size={17} />
          </Button>
        </ModalHeader>

        <ModalBody className="space-y-4 pb-5">
          <Input
            required
            label="Link URL"
            type="url"
            placeholder="https://www.youtube.com/watch?v=xxxx"
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
              label="Width"
              placeholder="100"
              rightAddon={<Text>px</Text>}
              value={youtubeForm.size.width}
              onChange={(e) =>
                setYoutubeForm({
                  ...youtubeForm,
                  size: { ...youtubeForm.size, width: Number(e.target.value) },
                })
              }
            />
            <Input
              label="Height"
              placeholder="100"
              rightAddon={<Text>px</Text>}
              value={youtubeForm.size.height}
              onChange={(e) =>
                setYoutubeForm({
                  ...youtubeForm,
                  size: { ...youtubeForm.size, height: Number(e.target.value) },
                })
              }
            />
          </div>

          <div className="flex-w-full">
            {youtubeForm.url && isValid && (
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
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            variant={'outline'}
            color="danger"
            type="button"
            onClick={() => onClose(false)}
          >
            Cancel
          </Button>
          <Button color="primary">Submit</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
