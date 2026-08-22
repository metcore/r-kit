import { type ComponentPropsWithoutRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { CodeBlock } from '../../components/code-block';
import { Icon } from '../../components/icons';
import { useCopy } from '../../hooks/use-copy';
import { slugify } from '../lib/toc';

type BahasaKode = ComponentPropsWithoutRef<typeof CodeBlock>['lang'];

const BAHASA_DIKENAL = [
  'tsx',
  'ts',
  'js',
  'jsx',
  'json',
  'css',
  'html',
  'md',
  'toml',
] as const;

function Salin({ code }: { code: string }) {
  const { copy, copied } = useCopy();

  return (
    <button
      type="button"
      onClick={() => void copy(code)}
      className="absolute top-2 right-2 z-10 flex cursor-pointer items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 text-xs text-white/80 backdrop-blur transition-colors hover:bg-white/20"
    >
      <Icon name="copy-fill" size={13} />
      {copied ? 'Tersalin' : 'Salin'}
    </button>
  );
}

/** Heading dengan anchor supaya daftar isi di kanan bisa menautinya. */
function Heading({
  as: Tag,
  children,
  className,
}: {
  as: 'h2' | 'h3';
  children: React.ReactNode;
  className: string;
}) {
  const teks = String(children).replace(/`/g, '');
  return (
    <Tag id={slugify(teks)} className={`scroll-mt-24 ${className}`}>
      {children}
    </Tag>
  );
}

export default function DocMarkdown({ content }: { content: string }) {
  return (
    <div className="prose prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <Heading
              as="h2"
              className="mt-12 mb-3 border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-900"
            >
              {children}
            </Heading>
          ),
          h3: ({ children }) => (
            <Heading
              as="h3"
              className="mt-8 mb-2 text-lg font-semibold text-gray-900"
            >
              {children}
            </Heading>
          ),
          pre: ({ children }) => <div className="my-4">{children}</div>,
          code({
            inline,
            className,
            children,
            ...props
          }: ComponentPropsWithoutRef<'code'> & { inline?: boolean }) {
            const cocok = /language-(\w+)/.exec(className ?? '');
            const kode = String(children).replace(/\n$/, '');

            if ((inline === false || inline === undefined) && cocok) {
              const diminta = cocok[1];
              const lang = (BAHASA_DIKENAL as readonly string[]).includes(
                diminta
              )
                ? (diminta as BahasaKode)
                : 'tsx';

              return (
                <div className="relative">
                  <Salin code={kode} />
                  <CodeBlock code={kode} lang={lang} />
                </div>
              );
            }

            return (
              <code
                className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.85em] text-gray-900 before:content-none after:content-none"
                {...props}
              >
                {children}
              </code>
            );
          },
          a: ({ children, href }) => {
            const eksternal = href?.startsWith('http') === true;
            return (
              <a
                href={href}
                className="text-info-600 font-medium no-underline hover:underline"
                target={eksternal ? '_blank' : undefined}
                rel={eksternal ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            );
          },
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-info-500 my-4 border-l-4 bg-gray-50 py-1 pl-4 text-gray-700 not-italic">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
