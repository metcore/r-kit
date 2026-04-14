import prettier from 'prettier/standalone';
import parserHtml from 'prettier/plugins/html';

const formatHtml = (raw: string) => {
  return prettier.format(raw, {
    parser: 'html',
    plugins: [parserHtml],
    printWidth: 120,
    htmlWhitespaceSensitivity: 'ignore',
  });
};

export default formatHtml;
