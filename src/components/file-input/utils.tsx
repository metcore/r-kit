import { Icon } from "../icons";
import type { DisplayFile, ExistingFile } from "./type";

const BYTES_PER_MB = 1024 * 1024;

export const FILE_TYPE_CONFIG = {
  pdf: { icon: <Icon name="pdf" size={40} />, label: "PDF" },
  image: { icon: <Icon name="image" size={40} />, label: "Image" },
  excel: { icon: <Icon name="excel" size={40} />, label: "Excel" },
  word: { icon: <Icon name="doc" size={40} />, label: "Word" },
  ppt: { icon: <Icon name="ppt" size={40} />, label: "PowerPoint" },
  audio: { icon: <Icon name="mp3" size={40} />, label: "Audio" },
  video: { icon: <Icon name="mp4" size={40} />, label: "Video" },
  default: {
    icon: <Icon name="paperclip" className="text-gray-600" size={40} />,
    label: "File",
  },
} as const;

/**
 * Formats file size from bytes to MB with 2 decimal places
 */
export const formatFileSize = (bytes: number): string => {
  return (bytes / BYTES_PER_MB).toFixed(2);
};

/**
 * Generates a unique ID for a file
 */
export const generateFileId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Gets file type configuration based on MIME type
 */
export const getFileTypeConfig = (mimeType: string) => {
  if (mimeType === "application/pdf") return FILE_TYPE_CONFIG.pdf;
  if (mimeType.startsWith("image/")) return FILE_TYPE_CONFIG.image;
  if (
    mimeType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    mimeType === "application/vnd.ms-excel"
  ) {
    return FILE_TYPE_CONFIG.excel;
  }
  if (
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    mimeType === "application/msword"
  ) {
    return FILE_TYPE_CONFIG.word;
  }
  if (
    mimeType ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    mimeType === "application/vnd.ms-powerpoint"
  ) {
    return FILE_TYPE_CONFIG.ppt;
  }
  if (
    mimeType.startsWith("audio/") ||
    ["audio/mpeg", "audio/mp3", "audio/wav"].includes(mimeType)
  ) {
    return FILE_TYPE_CONFIG.audio;
  }
  if (mimeType.startsWith("video/")) {
    return FILE_TYPE_CONFIG.video;
  }

  return FILE_TYPE_CONFIG.default;
};

/**
 * Extracts file name from URL
 */
export const extractFileNameFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const fileName = pathname.substring(pathname.lastIndexOf("/") + 1);
    return decodeURIComponent(fileName) || "file";
  } catch {
    return url.split("/").pop() || "file";
  }
};

/**
 * Extracts file extension from filename or URL
 */
export const getFileExtension = (filename: string): string => {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop()?.toLowerCase() || "" : "";
};

/**
 * Determines MIME type from file extension
 */
export const getMimeTypeFromExtension = (extension: string): string => {
  const mimeTypes: Record<string, string> = {
    pdf: "application/pdf",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xls: "application/vnd.ms-excel",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };
  return mimeTypes[extension] || "application/octet-stream";
};

/**
 * Converts existing file URL to DisplayFile
 */
export const convertExistingFileToDisplayFile = (
  existingFile: ExistingFile,
): DisplayFile => {
  const fileName =
    existingFile.name || extractFileNameFromUrl(existingFile.url);
  const extension = getFileExtension(fileName);
  const mimeType = existingFile.type || getMimeTypeFromExtension(extension);

  return {
    id: `existing-${existingFile.url}`,
    name: fileName,
    size: existingFile.size || 0,
    type: mimeType,
    preview: mimeType.startsWith("image/") ? existingFile.url : undefined,
    isExisting: true,
    url: existingFile.url,
  };
};

/**
 * Revokes object URL to prevent memory leaks
 */
export const revokeObjectURL = (url: string | undefined): void => {
  if (url) {
    URL.revokeObjectURL(url);
  }
};
