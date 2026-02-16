import { highlighter } from "../../lib/codeHighlighter";

interface Props {
  code: string;
  lang?: "tsx" | "md" | "ts" | "js" | "jsx" | "json" | "css" | "html" | "toml";
  theme?: "dark-plus" | "light-plus";
}

export function CodeBlock({ code, lang = "tsx", theme = "dark-plus" }: Props) {
  const html = highlighter.codeToHtml(code, {
    lang,
    theme,
    transformers: [
      {
        pre(node) {
          node.properties["data-line-numbers"] = "";
        },
        line(node, line) {
          node.properties["data-line"] = line;
        },
      },
    ],
  });

  return <div className="w-full" dangerouslySetInnerHTML={{ __html: html }} />;
}
