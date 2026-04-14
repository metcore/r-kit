import { useEffect, useState } from 'react';
import { Button } from '../../button';
import { Icon } from '../../icons';
import { Input } from '../../input';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../modal';
import { Select } from '../../select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../tabs';
import { Text } from '../../text/text';
import type { ImageForm } from '../type';
import type { BaseOption, SelectOption } from '../../select/type';

interface Props {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onSubmit: (form: ImageForm | null) => void;
  initialValues?: ImageForm | null;
}

const targetOptions: SelectOption[] = [
  {
    label: 'New Tab',
    value: '_blank',
  },
  {
    label: 'Current Tab',
    value: '_self',
  },
];

const objectfitOptions: SelectOption[] = [
  {
    label: 'Contain',
    value: 'contain',
  },
  {
    label: 'Cover',
    value: 'cover',
  },
  {
    label: 'Fill',
    value: 'fill',
  },
];

export default function ModalInsertImage({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const [currentTabImage, setCurrentTabImage] = useState('0');

  const [errors, setErrors] = useState<{ source?: string; altText?: string }>(
    {}
  );
  const [imageForm, setImageForm] = useState<ImageForm | null>({
    url: null,
    image: {
      objectFit: objectfitOptions[0],
      source: '',
      altText: '',
      width: '200',
      height: '200',
    },
  });

  const validate = () => {
    const newErrors: { source?: string; altText?: string } = {};

    if (
      imageForm?.image?.source === '' ||
      imageForm?.image?.source === null ||
      imageForm?.image?.source === undefined
    ) {
      newErrors.source = 'URI is required';
    } else {
      try {
        new URL(imageForm.image.source);
      } catch {
        newErrors.source = 'URI is not a valid URL';
      }
    }

    if (
      imageForm?.image?.altText === '' ||
      imageForm?.image?.altText === null ||
      imageForm?.image?.altText === undefined
    ) {
      newErrors.altText = 'Alt text is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (initialValues) {
      setImageForm(initialValues);
    }
  }, [initialValues]);

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} closable={false}>
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!validate()) return;

          onSubmit(imageForm);
          onClose(false);
          setImageForm(null);
        }}
        className="overflow-auto"
      >
        <ModalBody>
          <Tabs
            defaultValue="0"
            value={currentTabImage}
            onValueChange={setCurrentTabImage}
          >
            <TabsList className="w-full">
              <TabsTrigger value="0">Image Detail</TabsTrigger>
              <TabsTrigger value="1">Link</TabsTrigger>
              <TabsTrigger value="2">Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="0" className="space-y-3">
              <Input
                required
                label="URI"
                placeholder="https://cdn.herca.id/xxxx"
                className="w-full"
                errorMessages={errors.source}
                value={imageForm?.image?.source}
                onChange={(e) =>
                  setImageForm((prev) => {
                    if (!prev) return prev;

                    return {
                      ...prev,
                      image: {
                        ...prev.image,
                        source: e.target.value,
                      },
                    };
                  })
                }
              />
              <Input
                required
                label="Image Alt Text"
                placeholder="Image Alternative Text"
                className="w-full"
                value={imageForm?.image?.altText}
                errorMessages={errors.altText}
                onChange={(e) =>
                  setImageForm((prev) => {
                    if (!prev) return prev;

                    return {
                      ...prev,
                      image: {
                        ...prev.image,
                        altText: e.target.value,
                      },
                    };
                  })
                }
              />
              <div className="flex items-center gap-3 *:flex-1">
                <Input
                  label="Width"
                  type="number"
                  placeholder="0"
                  rightAddon={<Text>px</Text>}
                  value={imageForm?.image?.width}
                  onChange={(e) =>
                    setImageForm((prev) => {
                      if (!prev) return prev;

                      return {
                        ...prev,
                        image: {
                          ...prev.image,
                          width: e.target.value,
                        },
                      };
                    })
                  }
                />
                <Input
                  label="Height"
                  type="number"
                  placeholder="0"
                  value={imageForm?.image?.height}
                  rightAddon={<Text>px</Text>}
                  onChange={(e) =>
                    setImageForm((prev) => {
                      if (!prev) return prev;

                      return {
                        ...prev,
                        image: {
                          ...prev.image,
                          height: e.target.value,
                        },
                      };
                    })
                  }
                />
                <Select
                  label="Object Fit"
                  options={objectfitOptions}
                  value={imageForm?.image?.objectFit}
                  onChange={(value) =>
                    setImageForm((prev) => {
                      if (!prev) return prev;

                      return {
                        ...prev,
                        image: {
                          ...prev.image,
                          objectFit: value as BaseOption,
                        },
                      };
                    })
                  }
                />
              </div>

              {imageForm?.image?.source !== '' && (
                <div className="grid size-full min-h-50 place-items-center rounded-lg border border-gray-300 p-5">
                  <img
                    src={imageForm?.image?.source}
                    alt={imageForm?.image?.altText}
                    style={{
                      width: `${imageForm?.image?.width}px`,
                      height: `${imageForm?.image?.height}px`,
                      objectFit:
                        imageForm?.image?.objectFit?.value === 'fill'
                          ? 'fill'
                          : imageForm?.image?.objectFit?.value === 'cover'
                            ? 'cover'
                            : 'contain',
                    }}
                  />
                </div>
              )}
            </TabsContent>
            <TabsContent value="1" className="space-y-3">
              <Input
                label="URL"
                placeholder="https://google.com"
                value={imageForm?.url?.source ?? ''}
                onChange={(e) =>
                  setImageForm((prev) => {
                    if (!prev) return prev;
                    return {
                      ...prev,
                      url: {
                        target: prev?.url?.target ?? null,
                        source: e.target.value,
                      },
                    };
                  })
                }
              />
              <Select
                label="Target"
                placeholder="Select target URL..."
                options={targetOptions}
                value={imageForm?.url?.target}
                onChange={(value) =>
                  setImageForm((prev) => {
                    if (!prev) return prev;

                    return {
                      ...prev,
                      url: {
                        source: prev?.url?.source ?? null,
                        target: value as BaseOption,
                      },
                    };
                  })
                }
              />
            </TabsContent>
            <TabsContent value="2">
              <div className="flex flex-col">UPLOAD</div>
            </TabsContent>
          </Tabs>
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
