import { forwardRef, useImperativeHandle } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../button';
import { Text } from '../text';
import { InputFilePreview } from './input-file-preview';
import { inputFileVariants } from './input-file-variants';
import type { InputFileProps, InputFileRef } from './type';
import {
  useInputFile,
  type UseInputFileOptions,
  type UseInputFileReturn,
} from './use-input-file';

const DEFAULT_DROPZONE_HINT = 'Klik atau drag & drop file di sini';

const EMPTY_HOOK_OPTIONS: UseInputFileOptions = {};

type InputFileComponentProps = InputFileProps & {
  inputFile?: UseInputFileReturn;
  standalone?: boolean;
};

const InputFileRaw = forwardRef<InputFileRef, InputFileComponentProps>(
  (props, ref) => {
    const {
      inputFile: external,
      variant = 'primary',
      label = 'Choose File',
      hint = 'JPG, PNG, dan PDF (Max. 5MB)',
      buttonLabel = 'Choose File',
      buttonVariant,
      buttonColor,
      multiple = false,
      selectedFilesClassName,
      customNamePlaceholder,
      pdfViewerProps,
      audioPlayerProps,
      videoPlayerProps,
      onDownload,
      previewMode,
      hideDownloadButton,
      standalone: standaloneProp,
      ...restProps
    } = props;

    const hookOptions: UseInputFileOptions = { ...restProps, multiple };

    const ownHook = useInputFile(external ? EMPTY_HOOK_OPTIONS : hookOptions);
    const fileInput = external ?? ownHook;
    const standalone = standaloneProp ?? external === undefined;

    const {
      inputRef,
      accept,
      disabled,
      isDragging,
      errorMessage,
      handleChange,
      getDragHandlers,
    } = fileInput;

    useImperativeHandle(
      ref,
      () => ({
        clearAll: fileInput.clearAll,
        openFilePicker: fileInput.openFilePicker,
        getFiles: fileInput.getFiles,
        isUploading: () =>
          Object.values(fileInput.uploadState).some(
            (s) => s.uploadStatus === 'uploading'
          ),
      }),
      [fileInput]
    );

    const isDefault =
      variant === 'primary' || variant === 'secondary' || variant === 'gray';
    const isSized = variant === 'medium' || variant === 'large';
    const isLarge = variant === 'large';
    const hasError = errorMessage !== undefined;

    const dragHandlers = isSized ? getDragHandlers() : {};

    const labelClassName = cn(
      inputFileVariants({ variant }),
      'group relative flex-wrap items-center gap-2 rounded-lg border px-3 py-2 transition-all',
      !isDefault && 'flex',
      isDefault &&
        'flex-column w-fit border-0 p-0 outline-2 outline-offset-1 outline-transparent',
      isSized && 'w-full border-dashed border-gray-400 bg-gray-50',
      isLarge && hasError && 'border-danger-500',
      isLarge && 'flex-col items-center p-5!',
      isSized && isDragging && 'border-primary-500 bg-primary-50',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
    );

    const renderButton = () => {
      return (
        <>
          <Button
            type="button"
            variant={buttonVariant}
            color={buttonColor}
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
          >
            {buttonLabel}
          </Button>
          {/* `hidden` (bukan absolute inset-0 -z-10): input tidak lagi melar
              menutupi ancestor ber-position. Klik label & .click() tetap jalan. */}
          <input
            ref={inputRef}
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={handleChange}
            disabled={disabled}
            className="hidden"
          />
        </>
      );
    };

    const dropzone = (
      <div>
        <label {...dragHandlers} className={labelClassName}>
          {!isDefault ? (
            <div
              className={cn('flex flex-1 flex-col', isLarge && '*:text-center')}
            >
              <Text
                as="h3"
                value={label}
                weight="semibold"
                className={cn(isSized && 'text-gray-800!')}
              />
              {isSized && (
                <Text
                  as="p"
                  value={hint || DEFAULT_DROPZONE_HINT}
                  className="text-gray-600!"
                />
              )}
            </div>
          ) : (
            ''
          )}

          {isLarge && hasError && (
            <Text
              value={errorMessage}
              variant="t3"
              className="text-center"
              color="danger"
            />
          )}
          {renderButton()}
        </label>

        {hasError && variant === 'medium' && (
          <Text
            value={errorMessage}
            variant="t3"
            className="text-left"
            color="danger"
          />
        )}
      </div>
    );

    if (!standalone) return dropzone;

    return (
      <div className={cn(!isDefault && 'flex flex-col gap-6')}>
        {!isDefault ? dropzone : renderButton()}
        <InputFilePreview
          inputFile={fileInput}
          className={selectedFilesClassName}
          customNamePlaceholder={customNamePlaceholder}
          pdfViewerProps={pdfViewerProps}
          audioPlayerProps={audioPlayerProps}
          videoPlayerProps={videoPlayerProps}
          onDownload={onDownload}
          mode={previewMode}
          hideDownloadButton={hideDownloadButton}
        />
      </div>
    );
  }
);

InputFileRaw.displayName = 'InputFileRaw';

export { InputFileRaw };
