# InputFile Component Documentation

> "dear future developer, if you're reading this, i'm sorry" - Original Author

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Props API](#props-api)
- [Variants](#variants)
- [Features](#features)
- [Ref Methods](#ref-methods)
- [Examples](#examples)
- [Development Guide](#development-guide)
- [Troubleshooting](#troubleshooting)

## Overview

InputFile adalah komponen React yang powerful untuk upload file dengan fitur lengkap termasuk:

- Multiple file upload
- Drag & drop (variant large)
- File preview dengan thumbnail
- Custom file naming
- File replacement
- Validasi ukuran dan jumlah file
- Multiple variants untuk berbagai use case

## Installation

```bash
# Install dependencies (jika belum)
npm install react
```

Import komponen:

```tsx
import { InputFile } from "@herca/r-kit/input-file";
import type { InputFileRef } from "@herca/r-kit/input-file/type";
```

## Basic Usage

### Uncontrolled Mode

```tsx
function MyForm() {
  const fileInputRef = useRef<InputFileRef>(null);

  const handleSubmit = () => {
    const files = fileInputRef.current?.getFiles();
    console.log("Selected files:", files);
  };

  return (
    <InputFile
      ref={fileInputRef}
      variant="large"
      multiple
      accept="image/*,.pdf"
      maxSize={5 * 1024 * 1024} // 5MB
      maxFiles={3}
    />
  );
}
```

### Controlled Mode

```tsx
function MyForm() {
  const [files, setFiles] = useState<FileItem[]>([]);

  return (
    <InputFile
      value={files}
      onChange={setFiles}
      variant="large"
      multiple
      accept="image/*"
    />
  );
}
```

## Props API

### Core Props

| Prop       | Type                                                        | Default     | Description                                     |
| ---------- | ----------------------------------------------------------- | ----------- | ----------------------------------------------- |
| `value`    | `FileItem[]`                                                | `undefined` | Controlled file list                            |
| `onChange` | `(files: FileItem[]) => void`                               | `undefined` | Callback saat files berubah                     |
| `multiple` | `boolean`                                                   | `false`     | Izinkan multiple file selection                 |
| `accept`   | `string`                                                    | `undefined` | Tipe file yang diterima (e.g., "image/\*,.pdf") |
| `maxSize`  | `number`                                                    | `undefined` | Ukuran maksimal file dalam bytes                |
| `maxFiles` | `number`                                                    | `undefined` | Jumlah maksimal file                            |
| `disabled` | `boolean`                                                   | `false`     | Disable komponen                                |
| `variant`  | `"primary" \| "secondary" \| "gray" \| "medium" \| "large"` | `"primary"` | Style variant                                   |

### Label & Text Props

| Prop                    | Type     | Default                          | Description                         |
| ----------------------- | -------- | -------------------------------- | ----------------------------------- |
| `label`                 | `string` | `"Choose File"`                  | Label utama                         |
| `buttonLabel`           | `string` | `"Choose File"`                  | Text button (variant sized)         |
| `hint`                  | `string` | `"JPG, PNG, dan PDF (Max. 5MB)"` | Hint text                           |
| `customNamePlaceholder` | `string` | `undefined`                      | Placeholder untuk custom name input |

### Error Message Props

| Prop                   | Type     | Default        | Description                            |
| ---------------------- | -------- | -------------- | -------------------------------------- |
| `errorMessage`         | `string` | `undefined`    | Error message yang ditampilkan         |
| `maxSizeErrorMessage`  | `string` | Auto-generated | Custom error untuk file terlalu besar  |
| `maxFilesErrorMessage` | `string` | Auto-generated | Custom error untuk terlalu banyak file |

### Feature Props

| Prop            | Type      | Default     | Description                       |
| --------------- | --------- | ----------- | --------------------------------- |
| `useCustomName` | `boolean` | `undefined` | Enable custom file naming feature |

## Variants

### 1. Primary (Default)

Compact button dengan icon upload.

```tsx
<InputFile variant="primary" />
```

**Use case:** Form sederhana, inline upload

### 2. Secondary

Mirip primary dengan styling berbeda.

```tsx
<InputFile variant="secondary" />
```

### 3. Gray

Variant dengan warna abu-abu.

```tsx
<InputFile variant="gray" />
```

### 4. Medium

Upload area dengan icon cloud, tanpa drag & drop.

```tsx
<InputFile variant="medium" />
```

**Use case:** Form yang membutuhkan visual lebih jelas

### 5. Large

Full-featured upload area dengan drag & drop support.

```tsx
<InputFile
  variant="large"
  multiple
  accept="image/*"
  maxSize={5 * 1024 * 1024}
/>
```

**Use case:** Upload banyak file, user experience terbaik

**Features:**

- ✅ Drag & drop support
- ✅ Visual feedback saat dragging
- ✅ Large upload area
- ✅ Error message terintegrasi

## Features

### 1. Multiple File Upload

```tsx
<InputFile
  multiple
  maxFiles={5}
  maxFilesErrorMessage="Maksimal 5 file saja ya!"
/>
```

### 2. File Type Validation

```tsx
// Image only
<InputFile accept="image/*" />

// Multiple types
<InputFile accept="image/*,.pdf,.doc,.docx" />

// Specific MIME types
<InputFile accept="image/png,image/jpeg,application/pdf" />
```

### 3. File Size Validation

```tsx
<InputFile
  maxSize={5 * 1024 * 1024} // 5MB
  maxSizeErrorMessage="File terlalu besar! Maksimal 5MB"
/>
```

### 4. Drag & Drop (Large Variant)

```tsx
<InputFile variant="large" />
```

**Behavior:**

- Hanya aktif di variant `large`
- Visual feedback: border biru + background biru muda saat dragging
- Auto-validate file type sesuai `accept` prop
- Support multiple files

### 5. File Preview & Management

Setiap file yang diupload menampilkan:

- Thumbnail preview (untuk image)
- File name
- File size
- Remove button
- Replace button

```tsx
<InputFile multiple />
```

Actions available:

- **Remove**: Hapus file individual
- **Replace**: Ganti file dengan yang baru
- **Clear All**: Hapus semua file sekaligus

### 6. Custom File Naming

```tsx
<InputFile useCustomName customNamePlaceholder="Masukkan nama custom..." />
```

User bisa memberikan nama custom untuk setiap file yang diupload.

### 7. Controlled vs Uncontrolled

**Uncontrolled (Recommended):**

```tsx
const fileRef = useRef<InputFileRef>(null);

// Get files when needed
const files = fileRef.current?.getFiles();
```

**Controlled:**

```tsx
const [files, setFiles] = useState<FileItem[]>([]);

<InputFile value={files} onChange={setFiles} />;
```

## Ref Methods

Akses methods melalui ref:

```tsx
const fileInputRef = useRef<InputFileRef>(null);
```

### `clearAll()`

Hapus semua file yang sudah diupload.

```tsx
fileInputRef.current?.clearAll();
```

### `getFiles()`

Dapatkan array semua file yang sudah diupload.

```tsx
const files = fileInputRef.current?.getFiles();
console.log(files); // FileItem[]
```

**Return type:**

```tsx
interface FileItem {
  file: File;
  preview: string; // Blob URL
  customName?: string;
  label?: string;
}
```

### `openFilePicker()`

Buka file picker secara programmatic.

```tsx
<button onClick={() => fileInputRef.current?.openFilePicker()}>
  Upload File
</button>
```

## Examples

### Example 1: Simple Image Upload

```tsx
function ImageUpload() {
  const fileRef = useRef<InputFileRef>(null);

  const handleSave = async () => {
    const files = fileRef.current?.getFiles();
    if (!files || files.length === 0) {
      alert("Please select an image");
      return;
    }

    // Upload to server
    const formData = new FormData();
    files.forEach((item) => {
      formData.append("images", item.file);
    });

    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div>
      <InputFile
        ref={fileRef}
        variant="large"
        accept="image/*"
        maxSize={2 * 1024 * 1024}
        maxFiles={1}
        label="Upload Profile Picture"
        hint="PNG or JPG (Max. 2MB)"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
```

### Example 2: Document Upload with Custom Names

```tsx
function DocumentUpload() {
  return (
    <InputFile
      variant="large"
      multiple
      accept=".pdf,.doc,.docx"
      maxSize={10 * 1024 * 1024}
      maxFiles={5}
      useCustomName
      customNamePlaceholder="e.g., Invoice January 2024"
      label="Upload Documents"
      hint="PDF, DOC, DOCX (Max. 10MB per file)"
    />
  );
}
```

### Example 3: Controlled with Form

```tsx
function FormWithFileUpload() {
  const [formData, setFormData] = useState({
    name: "",
    files: [] as FileItem[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // Process formData.files
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
      />

      <InputFile
        value={formData.files}
        onChange={(files) => setFormData({ ...formData, files })}
        variant="medium"
        multiple
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

### Example 4: Programmatic Control

```tsx
function AdvancedUpload() {
  const fileRef = useRef<InputFileRef>(null);

  return (
    <div>
      <InputFile ref={fileRef} variant="large" multiple />

      <div className="actions">
        <button onClick={() => fileRef.current?.openFilePicker()}>
          📁 Browse Files
        </button>

        <button
          onClick={() => {
            const files = fileRef.current?.getFiles();
            console.log(`Selected ${files?.length} files`);
          }}
        >
          📊 Count Files
        </button>

        <button onClick={() => fileRef.current?.clearAll()}>
          🗑️ Clear All
        </button>
      </div>
    </div>
  );
}
```

## Development Guide

### Architecture

```
InputFile Component
├── State Management
│   ├── files (internal/controlled)
│   ├── replaceIndex
│   ├── customNames
│   └── isDragging
├── Refs
│   ├── inputRef (main input)
│   └── replaceInputRef (hidden input for replace)
├── Event Handlers
│   ├── handleChange (file selection)
│   ├── handleDrop (drag & drop)
│   ├── handleReplace (file replacement)
│   └── handleChangeCustomName (custom naming)
└── Exposed Methods (via ref)
    ├── clearAll()
    ├── getFiles()
    └── openFilePicker()
```

### Key Functions

#### `processFiles(selectedFiles: File[])`

Core function untuk memproses file yang dipilih.

**Responsibilities:**

1. Validasi maxFiles
2. Validasi maxSize
3. Create FileItem objects dengan preview URL
4. Update state

```tsx
const processFiles = (selectedFiles: File[]) => {
  // Validation logic
  if (maxFiles && files.length + selectedFiles.length > maxFiles) {
    alert(maxFilesErrorMessage ?? `Maksimal ${maxFiles} file`);
    return;
  }

  // Size validation
  if (maxSize) {
    const oversized = selectedFiles.filter((file) => file.size > maxSize);
    if (oversized.length > 0) {
      alert(maxSizeErrorMessage ?? `File too large`);
      return;
    }
  }

  // Create FileItems
  const mapped = selectedFiles.map((file) => ({
    file,
    customName: file.name,
    preview: URL.createObjectURL(file),
  }));

  setFiles([...files, ...mapped]);
};
```

#### Drag & Drop Flow

```
1. handleDragEnter
   └── setIsDragging(true)
   └── Visual feedback: border-primary-500, bg-primary-50

2. handleDragOver
   └── preventDefault() to allow drop

3. handleDrop
   └── Get files from e.dataTransfer.files
   └── Filter by accept prop
   └── Call processFiles()
   └── setIsDragging(false)

4. handleDragLeave
   └── Check if truly leaving component
   └── setIsDragging(false)
```

### Memory Management

⚠️ **Important:** Component menggunakan `URL.createObjectURL()` untuk preview.

**Cleanup dilakukan di:**

1. **useEffect cleanup**

   ```tsx
   useEffect(() => {
     return () => files.forEach((f) => URL.revokeObjectURL(f.preview));
   }, [files]);
   ```

2. **removeFile**

   ```tsx
   URL.revokeObjectURL(files[index].preview);
   ```

3. **clearAll**

   ```tsx
   files.forEach((f) => URL.revokeObjectURL(f.preview));
   ```

4. **handleReplace**
   ```tsx
   URL.revokeObjectURL(files[replaceIndex].preview);
   ```

### Adding New Features

#### Step 1: Add Props

Update `InputFileProps` in `type.ts`:

```tsx
export interface InputFileProps {
  // ... existing props
  myNewFeature?: boolean;
  myNewCallback?: (data: any) => void;
}
```

#### Step 2: Implement Logic

```tsx
const InputFile = forwardRef<InputFileRef, InputFileProps>(
  ({ myNewFeature, myNewCallback, ...props }, ref) => {
    // Add state if needed
    const [newState, setNewState] = useState();

    // Add handler
    const handleMyFeature = () => {
      // Implementation
      myNewCallback?.(data);
    };

    // Use in JSX
    return (
      <div>
        {myNewFeature && <button onClick={handleMyFeature}>New Feature</button>}
      </div>
    );
  },
);
```

#### Step 3: Update Ref (if needed)

```tsx
export interface InputFileRef {
  // ... existing methods
  myNewMethod: () => void;
}

// In component
useImperativeHandle(ref, () => ({
  // ... existing methods
  myNewMethod: () => {
    // Implementation
  },
}));
```

## Troubleshooting

### Issue: Drag & drop tidak bekerja

**Solution:**

- Pastikan variant adalah `"large"`
- Drag & drop hanya aktif di variant large
- Check console untuk errors

```tsx
// ✅ Correct
<InputFile variant="large" />

// ❌ Won't have drag & drop
<InputFile variant="medium" />
```

### Issue: File preview tidak muncul

**Solution:**

- Check `PreviewItem` component
- Pastikan blob URL tidak ter-revoke
- Verify file type supported untuk preview

### Issue: Memory leak warning

**Solution:**

- Pastikan cleanup effect berjalan
- Jangan store preview URL di state eksternal tanpa cleanup

```tsx
// ❌ Bad - no cleanup
const [externalFiles, setExternalFiles] = useState<FileItem[]>([]);

// ✅ Good - let component handle cleanup
const fileRef = useRef<InputFileRef>(null);
const files = fileRef.current?.getFiles();
```

### Issue: Custom names tidak tersimpan

**Solution:**

- Pastikan `useCustomName={true}`
- Call `getFiles()` dari ref, bukan langsung akses state
- Custom names di-merge saat `getFiles()` dipanggil

```tsx
// ✅ Correct
const files = fileInputRef.current?.getFiles();
// customName sudah include

// ❌ Wrong - accessing internal state
const files = internalFiles; // custom names mungkin belum ter-merge
```

### Issue: Validation tidak bekerja

**Solution:**

- Check props passed correctly
- Verify `accept` format: `"image/*"` atau `".jpg,.png"`
- `maxSize` dalam bytes: `5 * 1024 * 1024` untuk 5MB

## Best Practices

### 1. Always use ref for uncontrolled mode

```tsx
// ✅ Recommended
const fileRef = useRef<InputFileRef>(null);
<InputFile ref={fileRef} />;

// ❌ Avoid unless necessary
const [files, setFiles] = useState<FileItem[]>([]);
<InputFile value={files} onChange={setFiles} />;
```

### 2. Provide clear error messages

```tsx
<InputFile
  maxSize={5 * 1024 * 1024}
  maxSizeErrorMessage="Ukuran file maksimal 5MB. Silakan kompres file Anda terlebih dahulu."
  maxFilesErrorMessage="Anda hanya bisa upload maksimal 3 file."
/>
```

### 3. Use appropriate variant

- **primary/secondary/gray**: Simple forms, inline upload
- **medium**: Standard forms dengan visual feedback
- **large**: Main upload flow, multiple files, best UX

### 4. Validate on submit

```tsx
const handleSubmit = () => {
  const files = fileRef.current?.getFiles();

  if (!files || files.length === 0) {
    alert("Please select at least one file");
    return;
  }

  // Process upload
};
```

### 5. Handle server upload properly

```tsx
const uploadFiles = async (files: FileItem[]) => {
  const formData = new FormData();

  files.forEach((item, index) => {
    // Use custom name if available
    const filename = item.customName || item.file.name;
    formData.append(`file_${index}`, item.file, filename);
  });

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  return response.json();
};
```

## Performance Tips

1. **Lazy load PreviewItem** jika banyak file
2. **Debounce custom name input** untuk mengurangi re-render
3. **Use memo** untuk PreviewItem component
4. **Limit preview size** untuk file besar

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Required APIs:**

- `FileReader`
- `URL.createObjectURL`
- `FormData`
- Drag & Drop API

## License

MIT
