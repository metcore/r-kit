// components/MarkdownRenderer.tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { type ComponentPropsWithoutRef } from "react";
import { CodeBlock } from "../../components/code-block";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ children }) {
            return <div className="mt-3">{children}</div>;
          },
          code({
            inline,
            className,
            children,
            ...props
          }: ComponentPropsWithoutRef<"code"> & { inline?: boolean }) {
            const match = /language-(\w+)/.exec(className || "");
            const lang = match ? match[1] : "tsx";
            const codeString = String(children).replace(/\n$/, "");

            // Kalau bukan inline code, pakai CodeBlock component
            if (!inline && match) {
              return (
                <CodeBlock code={codeString} lang={lang as "tsx" | "md"} />
              );
            }

            // Inline code
            return (
              <code className="rounded font-mono text-sm" {...props}>
                {children}
              </code>
            );
          },
          h1: ({ children }) => (
            <h1 className="mb-1 text-gray-900">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-1 text-gray-900">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-1 text-gray-900">{children}</h3>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-blue-600 hover:underline"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 border-blue-500 pl-4 text-gray-700 italic">
              {children}
            </blockquote>
          ),
          hr: () => <hr style={{ marginTop: 30, marginBottom: 30 }} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
