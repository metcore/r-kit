import type {
  DrawingRef,
  DrawingUploadConfig,
  DrawingUploadResult,
} from './type';

const defaultExtractUrl = (res: unknown): string => {
  if (
    res !== null &&
    typeof res === 'object' &&
    'url' in res &&
    typeof (res as Record<string, unknown>).url === 'string'
  ) {
    return (res as Record<string, unknown>).url as string;
  }
  return '';
};

export function uploadDrawing(
  ref: DrawingRef | null,
  config: DrawingUploadConfig
): Promise<DrawingUploadResult> {
  return new Promise((resolve, reject) => {
    if (ref === null) {
      reject(new Error('Drawing ref is null.'));
      return;
    }

    if (ref.isEmpty()) {
      reject(new Error('Nothing to upload: canvas is empty.'));
      return;
    }

    const canvas = ref.getCanvas();
    if (canvas === null) {
      reject(new Error('Canvas is not mounted.'));
      return;
    }

    const {
      url,
      method = 'POST',
      fieldName = 'file',
      fileName = 'signature.png',
      mimeType = 'image/png',
      headers = {},
      data = {},
      extractUrl = defaultExtractUrl,
      errorMessage = 'Upload failed. Please try again.',
    } = config;

    canvas.toBlob((blob) => {
      if (blob === null) {
        reject(new Error('Failed to convert canvas to blob.'));
        return;
      }

      const formData = new FormData();
      formData.append(fieldName, blob, fileName);
      Object.entries(data).forEach(([k, v]) => formData.append(k, v));

      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          let parsed: unknown = null;
          try {
            parsed = JSON.parse(xhr.responseText);
          } catch {
            parsed = xhr.responseText;
          }
          const uploadedUrl = extractUrl(parsed);
          resolve({ url: uploadedUrl, response: parsed });
        } else {
          reject(new Error(`Server error: ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error(errorMessage));
      xhr.onabort = () => reject(new Error('Upload aborted.'));

      xhr.open(method, url);
      Object.entries(headers).forEach(([k, v]) => xhr.setRequestHeader(k, v));
      xhr.send(formData);
    }, mimeType);
  });
}
