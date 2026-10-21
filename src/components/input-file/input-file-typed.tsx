import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { InputFileRaw } from './input-file';
import {
  publicIdMapFrom,
  reservedIdsFrom,
  signatureOfFiles,
  signatureOfIncoming,
  signatureOfSeededItems,
  signatureOfUploaded,
  toFileValue,
  toInternalValue,
  toUploadedValue,
  type PublicInputFileValue,
} from './public-value';
import type {
  FileItem,
  InputFileMode,
  InputFileRef,
  InputFileTypedProps,
  InputFileValue,
  UploadConfig,
  UploadedFile,
  UploadedFileValue,
} from './type';
import { useInputFile } from './use-input-file';

type EmittedValue =
  | File
  | File[]
  | UploadedFileValue
  | UploadedFileValue[]
  | null;

type ReadProps = InputFileTypedProps & {
  mode?: InputFileMode;
  multiple?: boolean;
  value?: PublicInputFileValue;
  onChange?: (value: EmittedValue) => void;
  uploadConfig?: UploadConfig;
  onUploadSuccess?: (results: UploadedFile<unknown>[]) => void;
};

const InputFile = forwardRef<InputFileRef, InputFileTypedProps>(
  (props, ref) => {
    const {
      mode = 'file',
      multiple = false,
      value,
      onChange,
      uploadConfig,
      onUploadSuccess,
      accept,
      maxSize,
      maxFiles,
      disabled,
      errorMessage,
      maxSizeErrorMessage,
      maxFilesErrorMessage,
      allowCustomName,
      onRemoveFile,
      onClear,
      ...visualProps
    } = props as ReadProps;

    const isUploadMode = mode === 'uploadFile';

    const [items, setItems] = useState<InputFileValue[]>(() =>
      toInternalValue(mode, multiple, value)
    );

    const incomingSignature = useMemo(
      () => signatureOfIncoming(mode, multiple, value),
      [mode, multiple, value]
    );
    const appliedSignatureRef = useRef<string>(incomingSignature);
    const emittedSignatureRef = useRef<string | null>(null);
    // Seed dari `value` luar baru terpasang di render berikutnya, sementara
    // `nextSignature` di commit yang sama masih dihitung dari daftar SEBELUM
    // seed. Emisinya wajib dilewati sekali; kalau tidak, parent menerima
    // `onChange` berisi daftar basi (kosong saat data detail baru datang) dan
    // id file lama ikut hilang dari `publicIds` sesudahnya.
    const pendingSeedRef = useRef(false);

    const hook = useInputFile({
      value: items,
      onChange: (next: FileItem[]) => setItems(next),
      accept,
      maxSize,
      maxFiles,
      multiple,
      disabled,
      errorMessage,
      maxSizeErrorMessage,
      maxFilesErrorMessage,
      allowCustomName,
      onRemoveFile,
      onClear,
      onUploadSuccess,
      uploadConfig: isUploadMode ? uploadConfig : undefined,
    });

    const { files, uploadState } = hook;

    const reservedIds = useMemo(
      () => reservedIdsFrom(mode, multiple, value),
      [mode, multiple, value]
    );
    const publicIds = useMemo(
      () => publicIdMapFrom(mode, multiple, value),
      [mode, multiple, value]
    );

    const nextValue = useMemo<EmittedValue>(() => {
      if (!isUploadMode) {
        const list = toFileValue(files);
        return multiple ? list : (list[0] ?? null);
      }
      const list = toUploadedValue(files, uploadState, reservedIds, publicIds);
      return multiple ? list : (list[0] ?? null);
    }, [isUploadMode, multiple, files, uploadState, reservedIds, publicIds]);

    const nextSignature = useMemo(() => {
      if (!isUploadMode) return signatureOfFiles(toFileValue(files));
      return signatureOfUploaded(
        toUploadedValue(files, uploadState, reservedIds, publicIds)
      );
    }, [isUploadMode, files, uploadState, reservedIds, publicIds]);

    useEffect(() => {
      if (appliedSignatureRef.current === incomingSignature) return;
      appliedSignatureRef.current = incomingSignature;

      const seededSignature = signatureOfSeededItems(mode, multiple, value);

      // `value` yang balik sama persis dengan emisi terakhir = gema dari
      // komponen ini sendiri, bukan perubahan dari luar. Jangan seed ulang:
      // file yang masih uploading belum punya url sehingga tidak ikut
      // diemit, dan seed ulang akan membuangnya dari daftar.
      if (seededSignature === emittedSignatureRef.current) return;

      emittedSignatureRef.current = seededSignature;
      pendingSeedRef.current = true;
      setItems(toInternalValue(mode, multiple, value));
    }, [incomingSignature, mode, multiple, value]);

    const mountedRef = useRef(false);
    useEffect(() => {
      if (!mountedRef.current) {
        mountedRef.current = true;
        emittedSignatureRef.current = nextSignature;
        return;
      }
      if (pendingSeedRef.current) {
        pendingSeedRef.current = false;
        return;
      }
      if (emittedSignatureRef.current === nextSignature) return;
      emittedSignatureRef.current = nextSignature;
      onChange?.(nextValue);
    }, [nextSignature, nextValue, onChange]);

    useImperativeHandle(
      ref,
      () => ({
        clearAll: hook.clearAll,
        openFilePicker: hook.openFilePicker,
        getFiles: hook.getFiles,
        isUploading: () =>
          Object.values(hook.uploadState).some(
            (state) => state.uploadStatus === 'uploading'
          ),
      }),
      [hook]
    );

    return (
      <InputFileRaw
        {...visualProps}
        standalone
        multiple={multiple}
        inputFile={hook}
      />
    );
  }
);

InputFile.displayName = 'InputFile';

export { InputFile };
