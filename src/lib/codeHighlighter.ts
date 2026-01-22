import { createHighlighter } from "shiki";

export const highlighter = await createHighlighter({
  themes: ["dark-plus", "light-plus"],
  langs: ["tsx", "md", "ts", "js", "jsx", "json", "css", "html", "toml"],
});
