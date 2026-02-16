import type { IconNameProps } from "../icons";
import type { FileItem } from "./type";

const createMockFile = ({
  name,
  type,
  sizeMb,
  hint,
  errorMessage,
}: {
  name: string;
  type: string;
  sizeMb: number;
  hint?: string;
  errorMessage?: string;
}): FileItem => {
  const blob = new Blob(["a".repeat(sizeMb * 1024 * 1024)], { type });

  const file = new File([blob], name, {
    type,
    lastModified: Date.now(),
  }) as FileItem["file"];

  const preview = type.startsWith("image/")
    ? "https://picsum.photos/200" // image mock
    : "https://placehold.co/100x120?text=PDF"; // non-image mock

  return { file, preview, hint, errorMessage };
};

const getIconName = ({
  file,
  fileType,
}: {
  file?: File;
  fileType?: string;
}): IconNameProps | null => {
  const type = file?.type ?? fileType;
  const ext = file?.name.split(".").pop()?.toLowerCase();

  if (type?.startsWith("image/")) {
    return null;
  }

  if (type?.includes("spreadsheet") || ext === "xls" || ext === "xlsx") {
    return "xls";
  }

  if (type?.includes("word") || ext === "doc" || ext === "docx") {
    return "doc";
  }

  if (type?.startsWith("video/") || ext === "mkv" || ext === "mp4") {
    return "mp4";
  }

  if (type?.startsWith("audio/") || ext === "mp3") {
    return "mp3";
  }

  if (type?.includes("pdf") || ext === "pdf") {
    return "pdf";
  }

  return "doc";
};

export { createMockFile, getIconName };
