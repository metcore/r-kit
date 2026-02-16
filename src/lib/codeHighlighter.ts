import { createHighlighter, type Highlighter } from "shiki";

let _highlighter: Highlighter | null = null;

export async function getHighlighter() {
  if (!_highlighter) {
    _highlighter = await createHighlighter({
      themes: ["dark-plus", "light-plus"],
      langs: ["tsx", "md", "ts", "js", "jsx", "json", "css", "html", "toml"],
    });
  }

  return _highlighter;
}
