/**
 * Pewarna sintaks untuk potongan JSX/import di landing.
 *
 * Bukan highlighter umum — hanya subset yang dipakai halaman ini. Shiki sudah
 * jadi dependency, tapi memuat parser bahasa penuh untuk sepuluh baris kode
 * di halaman depan tidak sebanding.
 */

type TokenKind = 'punct' | 'tag' | 'attr' | 'str' | 'expr' | 'kw' | 'text';

interface Token {
  kind: TokenKind;
  value: string;
}

const KEYWORDS = new Set(['import', 'from', 'export', 'default', 'const']);

const CLASS_BY_KIND: Record<TokenKind, string> = {
  punct: 'rk-tok-dim',
  kw: 'rk-tok-dim',
  tag: 'rk-tok-key',
  attr: 'rk-tok-attr',
  str: 'rk-tok-str',
  expr: 'rk-tok-key',
  text: 'rk-tok-text',
};

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  const push = (kind: TokenKind, value: string) => {
    if (value.length > 0) tokens.push({ kind, value });
  };

  let index = 0;
  let insideTag = false;

  while (index < code.length) {
    const rest = code.slice(index);
    const char = rest[0];

    const whitespace = /^\s+/.exec(rest);
    if (whitespace) {
      push('text', whitespace[0]);
      index += whitespace[0].length;
      continue;
    }

    if (insideTag) {
      if (rest.startsWith('/>') || char === '>') {
        const punct = rest.startsWith('/>') ? '/>' : '>';
        push('punct', punct);
        index += punct.length;
        insideTag = false;
        continue;
      }

      const string = /^(["'])(?:(?!\1).)*\1/.exec(rest);
      if (string) {
        push('str', string[0]);
        index += string[0].length;
        continue;
      }

      const expression = /^\{[^}]*\}/.exec(rest);
      if (expression) {
        push('expr', expression[0]);
        index += expression[0].length;
        continue;
      }

      if (char === '=') {
        push('punct', '=');
        index += 1;
        continue;
      }

      const attribute = /^[A-Za-z][\w-]*/.exec(rest);
      if (attribute) {
        push('attr', attribute[0]);
        index += attribute[0].length;
        continue;
      }

      push('punct', char);
      index += 1;
      continue;
    }

    if (char === '<') {
      const opener = rest.startsWith('</') ? '</' : '<';
      push('punct', opener);
      index += opener.length;

      const name = /^[A-Za-z][\w.]*/.exec(code.slice(index));
      if (name) {
        push('tag', name[0]);
        index += name[0].length;
      }
      insideTag = true;
      continue;
    }

    const string = /^(["'])(?:(?!\1).)*\1/.exec(rest);
    if (string) {
      push('str', string[0]);
      index += string[0].length;
      continue;
    }

    // Daftar specifier import — kurung dibiarkan redup, namanya diwarnai.
    if (char === '{') {
      const block = /^\{[^}]*\}/.exec(rest);
      if (block) {
        push('punct', '{');
        for (const part of block[0].slice(1, -1).split(/([,\s]+)/)) {
          push(/^[A-Za-z]/.test(part) ? 'tag' : 'text', part);
        }
        push('punct', '}');
        index += block[0].length;
        continue;
      }
    }

    const word = /^[A-Za-z][\w]*/.exec(rest);
    if (word) {
      push(KEYWORDS.has(word[0]) ? 'kw' : 'text', word[0]);
      index += word[0].length;
      continue;
    }

    push('punct', char);
    index += 1;
  }

  return tokens;
}

export function highlight(code: string): React.ReactElement[] {
  return tokenize(code).map((token, position) => (
    <span key={position} className={CLASS_BY_KIND[token.kind]}>
      {token.value}
    </span>
  ));
}
