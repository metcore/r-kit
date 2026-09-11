import { useTranslation } from 'react-i18next';

import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { highlight } from '../lib/highlight';

/** Sumber sebenarnya dari preview di atasnya — keduanya harus tetap sama. */
const SNIPPET = `import { Button, Input } from '@herca/r-kit';
import '@herca/r-kit/style';

<Input label="Email" />
<Button size="sm">Simpan</Button>`;

/**
 * Kolom kanan hero: komponen yang benar-benar dirender di atas, kode yang
 * persis menghasilkannya di bawah.
 */
export default function HeroSpecimen(): React.ReactElement {
  const { t } = useTranslation('landing');

  return (
    <figure className="m-0 flex flex-col gap-2">
      <figcaption className="rk-head-inline flex items-center gap-2">
        <span aria-hidden className="rk-tick" />
        {t('hero.specimenLabel')}
      </figcaption>

      <div className="rk-surface overflow-hidden">
        <div className="flex flex-col items-start gap-4 bg-[var(--rk-paper-2)] px-5 py-6">
          <div className="w-full">
            <Input label="Email" />
          </div>
          <Button size="sm">Simpan</Button>
        </div>

        <pre className="rk-code m-0 overflow-x-auto border-t border-[var(--rk-rule)] px-5 py-4 text-[11px] leading-[1.8] sm:text-[11.5px]">
          <code>{highlight(SNIPPET)}</code>
        </pre>
      </div>
    </figure>
  );
}
