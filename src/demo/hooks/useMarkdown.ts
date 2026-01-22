// hooks/useMarkdown.ts
import { useState, useEffect } from "react";

export interface DocFrontmatter {
  title: string;
  description?: string;
  category?: string;
}

export interface DocContent {
  frontmatter: DocFrontmatter;
  content: string;
}

// Simple frontmatter parser (tanpa gray-matter)
function parseFrontmatter(markdown: string): {
  data: DocFrontmatter;
  content: string;
} {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return {
      data: { title: "Untitled" },
      content: markdown,
    };
  }

  const frontmatterText = match[1];
  const content = match[2];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = {};
  frontmatterText.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      const value = valueParts.join(":").trim();
      data[key.trim()] = value.replace(/^["']|["']$/g, ""); // Remove quotes
    }
  });

  return { data: data as DocFrontmatter, content };
}

export function useMarkdown(path: string) {
  const [doc, setDoc] = useState<DocContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load markdown");
        return res.text();
      })
      .then((text) => {
        const { data, content } = parseFrontmatter(text);
        setDoc({
          frontmatter: data,
          content,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [path]);

  return { doc, loading, error };
}
