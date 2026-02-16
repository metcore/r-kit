import { useEffect, useState } from "react";
import { getHighlighter } from "../../lib/codeHighlighter";

interface Props {
  code: string;
  lang?: "tsx" | "md" | "ts" | "js" | "jsx" | "json" | "css" | "html" | "toml";
  theme?: "dark-plus" | "light-plus";
}

export function CodeBlock({ code, lang = "tsx", theme = "dark-plus" }: Props) {
  const highlighter = getHighlighter();
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    highlighter.then((highlighter) => {
      if (!mounted) return;

      const result = highlighter.codeToHtml(code, {
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

      setHtml(result);
    });

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, lang, theme]);

  if (!html) return null;

  return <div className="w-full" dangerouslySetInnerHTML={{ __html: html }} />;
}
