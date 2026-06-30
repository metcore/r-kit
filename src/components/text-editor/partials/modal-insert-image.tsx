import { useEffect, useState } from 'react';
import { Button } from '../../button';
import { Icon } from '../../icons';
import { Input } from '../../input';
import { InputFile, type FileItem, type UploadedFile } from '../../input-file';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../modal';
import { Select } from '../../select';
import type { BaseOption } from '../../select/type';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../tabs';
import { Text } from '../../text/text';
import objectfitOptions from '../constants/object-fit-options';
import targetOptions from '../constants/target-link-options';
import type { AttachmentField, BaseInputFile, ImageForm } from '../type';

interface Props extends BaseInputFile {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onSubmit: (form: ImageForm | null) => void;
  initialValues?: ImageForm | null;
  onDownload?: (data: { src?: string; name?: string }) => void;

  /**
   * @deprecated Use top-level `upload` instead
   */
  attachmentField?: AttachmentField;
}

const createDefaultImageForm = (): ImageForm => ({
  url: null,
  image: {
    objectFit: objectfitOptions[0],
    source: '',
    altText: '',
    width: '200',
    height: '200',
  },
});

export default function ModalInsertImage({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  imageDetail,
  link,
  modal,
  upload,
  onDownload,
  attachmentField = {
    label: 'Send File To Server',
    accept: 'jpg, png, webp, jpeg',
    hint: 'JPG, PNG, WEBP dan JPEG',
    maxSize: 5,
    variant: 'medium',
    extractUploadResult: (results) => {
      const data = results as UploadedFile<{
        data: { url: string; name: string };
      }>[];

      return {
        url: data[0].uploadedData?.data.url ?? '',
        altText: data[0].uploadedData?.data.name ?? '',
      };
    },
  },
}: Props) {
  const resolvedUpladLabel = upload?.label ?? attachmentField.label;
  const resolvedAccept = upload?.config?.accept ?? attachmentField.accept;
  const resolvedMaxSize = upload?.config?.maxSize ?? attachmentField.maxSize;
  const resolvedHint = upload?.hint ?? attachmentField.hint;
  const resolvedUploadConfig = upload?.config ?? attachmentField?.uploadConfig;

  const [currentTabImage, setCurrentTabImage] = useState('0');
  const [uploadInputKey, setUploadInputKey] = useState(0);
  const [uploadFiles, setUploadFiles] = useState<FileItem[]>([]);

  const [errors, setErrors] = useState<{ source?: string; altText?: string }>(
    {}
  );
  const [imageForm, setImageForm] = useState<ImageForm | null>(
    createDefaultImageForm()
  );

  const resetFormState = () => {
    setCurrentTabImage('0');
    setErrors({});
    setImageForm(createDefaultImageForm());
    setUploadFiles([]);
    setUploadInputKey((prev) => prev + 1);
  };

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

  const isValidValue = (value: string | null | undefined) => {
    return value !== null && value !== undefined && value !== '';
  };

  useEffect(() => {
    if (!isOpen) return;

    setErrors({});
    setCurrentTabImage('0');
    setUploadFiles([]);
    setUploadInputKey((prev) => prev + 1);

    if (initialValues !== undefined) {
      setImageForm(initialValues);
      return;
    }

    setImageForm(createDefaultImageForm());
  }, [isOpen, initialValues]);

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} closable={false}>
      <ModalHeader className="flex-row! items-center justify-between border-b border-gray-200">
        <Text variant="t1" weight="medium" className="mb-0! text-gray-900">
          {modal?.title ?? 'Image Properties'}
        </Text>
        <Button
          size={'xs'}
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
          e.stopPropagation();
          if (!validate()) {
            if (isValidValue(errors?.altText) || isValidValue(errors?.source)) {
              setCurrentTabImage('0');
            }
            return;
          }

          onSubmit(imageForm);
          onClose(false);
          resetFormState();
        }}
        className="overflow-auto"
      >
        <ModalBody>
          <Tabs
            unmountOnHide={false}
            defaultValue="0"
            value={currentTabImage}
            onValueChange={setCurrentTabImage}
            id="modal-insert-image-tabs"
          >
            <TabsList className="w-full">
              <TabsTrigger value="0">
                {imageDetail?.label ?? 'Image Detail'}
              </TabsTrigger>
              <TabsTrigger value="1">{link?.label ?? 'Link'}</TabsTrigger>
              <TabsTrigger value="2">{upload?.label ?? 'Upload'}</TabsTrigger>
            </TabsList>
            <TabsContent value="0" className="space-y-3">
              <Input
                required
                label={imageDetail?.uri?.label ?? 'Image Properties'}
                placeholder={
                  imageDetail?.uri?.placeholder ??
                  'e.g https://www.herca.id/xxxx'
                }
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
                label={imageDetail?.altText?.label ?? 'Image Alt Text'}
                placeholder={
                  imageDetail?.altText?.placeholder ?? 'Image Alternative Text'
                }
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
                  label={imageDetail?.width?.label ?? 'Width'}
                  type="number"
                  placeholder={imageDetail?.width?.placeholder ?? '0'}
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
                  label={imageDetail?.height?.label ?? 'Height'}
                  type="number"
                  placeholder={imageDetail?.height?.placeholder ?? '0'}
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
                  label={imageDetail?.objectFit?.label ?? 'Object Fit'}
                  options={objectfitOptions}
                  placeholder={
                    imageDetail?.objectFit?.placeholder ?? 'Select Object Fit'
                  }
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

              {imageForm?.image &&
                imageForm?.image?.source !== '' &&
                imageForm?.image?.source !== null && (
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
                label={link?.url?.label ?? 'URL'}
                placeholder={link?.url?.placeholder ?? 'https://google.com'}
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
                label={link?.target?.label ?? 'Target'}
                placeholder={
                  link?.target?.placeholder ?? 'Select target URL...'
                }
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
              <InputFile
                key={uploadInputKey}
                label={resolvedUpladLabel}
                accept={resolvedAccept}
                hint={resolvedHint}
                buttonLabel={upload?.labelButtonChooseFile ?? 'Choose File'}
                maxSize={(resolvedMaxSize ?? 0) * 1024 * 1024}
                variant={attachmentField?.variant ?? 'medium'}
                value={uploadFiles}
                uploadConfig={resolvedUploadConfig}
                onChange={(files) => {
                  setUploadFiles(files);
                  attachmentField?.onChange?.(files);
                }}
                onUploadSuccess={(results) => {
                  const { url, altText } =
                    attachmentField.extractUploadResult(results);

                  setCurrentTabImage('0');
                  setImageForm((prev) => {
                    if (!prev) return prev;
                    return {
                      ...prev,
                      image: {
                        ...prev.image,
                        source: url,
                        altText: altText ?? 'Image',
                      },
                    };
                  });

                  attachmentField?.onUploadSuccess?.(results);
                }}
                onDownload={onDownload}
              />
            </TabsContent>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button
            variant={'outline'}
            color="danger"
            type="button"
            onClick={() => {
              onClose(false);
              resetFormState();
            }}
          >
            {modal?.labelButtonCancel ?? 'Cancel'}
          </Button>
          <Button color="primary">{modal?.labelButtonSave ?? 'Save'}</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
