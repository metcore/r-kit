import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Avatar } from '../../components/avatar';
import { Badge } from '../../components/badge';
import { Button } from '../../components/button';
import { Chip } from '../../components/chip';
import { Icon } from '../../components/icons';
import { Input } from '../../components/input';
import { Kbd } from '../../components/kbd';
import ProgressBar from '../../components/progress-bar/progress-bar';
import { Switch } from '../../components/switch';
import { highlight } from '../lib/highlight';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/tabs';

/**
 * Setiap blok memasangkan preview yang dirender langsung dari package dengan
 * baris kode yang menghasilkannya, plus tombol copy.
 */

function CopyLine({ code }: { code: string }): React.ReactElement {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className="rk-code flex items-center gap-3 border-t border-[var(--rk-rule)] px-3.5 py-2.5">
      <code className="min-w-0 flex-1 truncate">{highlight(code)}</code>

      <button
        type="button"
        onClick={() => {
          void navigator.clipboard
            .writeText(code)
            .then(() => setCopied(true))
            .catch(() => setCopied(false));
        }}
        aria-label={t('actions.copy', { command: code })}
        className="rk-hit rk-on-dark shrink-0 cursor-pointer rounded-[var(--rk-radius-control)] p-1 text-[var(--rk-on-graphite-2)] transition-colors duration-[var(--rk-dur-micro)] hover:bg-[var(--rk-graphite-2)] hover:text-[var(--rk-on-graphite)]"
      >
        <span aria-hidden className="flex">
          <Icon name={copied ? 'check' : 'copy-text-fill'} size={14} />
        </span>
      </button>
    </div>
  );
}

interface PlaygroundBlockProps {
  name: string;
  to: string;
  code: string;
  wide?: boolean;
  children: React.ReactNode;
}

function PlaygroundBlock({
  name,
  to,
  code,
  wide = false,
  children,
}: PlaygroundBlockProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <div
      className={`rk-surface flex flex-col overflow-hidden ${
        wide ? 'md:col-span-2' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--rk-rule)] px-3.5 py-2">
        <span className="rk-mono text-xs text-[var(--rk-ink)]">{name}</span>

        <Link
          to={to}
          className="rk-hit flex items-center gap-1 text-xs whitespace-nowrap text-[var(--rk-muted)] transition-colors duration-[var(--rk-dur-micro)] hover:text-[var(--rk-accent)]"
        >
          {t('actions.details')}
          <span aria-hidden className="flex">
            <Icon name="arrow-right-small" size={13} />
          </span>
        </Link>
      </div>

      <div className="flex flex-1 flex-wrap items-center gap-3 bg-[var(--rk-paper-2)] px-4 py-6">
        {children}
      </div>

      <CopyLine code={code} />
    </div>
  );
}

function TabsPreview(): React.ReactElement {
  const [tab, setTab] = useState('ringkasan');

  return (
    <Tabs
      id="preview-tabs"
      value={tab}
      onValueChange={setTab}
      className="w-full"
    >
      <TabsList>
        <TabsTrigger value="ringkasan">Ringkasan</TabsTrigger>
        <TabsTrigger value="aktivitas">Aktivitas</TabsTrigger>
        <TabsTrigger value="arsip">Arsip</TabsTrigger>
      </TabsList>

      <TabsContent
        value="ringkasan"
        className="pt-3 text-xs text-[var(--rk-ink-2)]"
      >
        Panel ringkasan.
      </TabsContent>
      <TabsContent
        value="aktivitas"
        className="pt-3 text-xs text-[var(--rk-ink-2)]"
      >
        Panel aktivitas.
      </TabsContent>
      <TabsContent
        value="arsip"
        className="pt-3 text-xs text-[var(--rk-ink-2)]"
      >
        Panel arsip.
      </TabsContent>
    </Tabs>
  );
}

export default function ComponentShowcase(): React.ReactElement {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <PlaygroundBlock
        name="Button"
        to="/playground/button"
        code={`<Button size="sm" variant="outline">Outline</Button>`}
      >
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="outline">
          Outline
        </Button>
        <Button size="sm" variant="tertiary">
          Tertiary
        </Button>
        <Button size="sm" color="danger">
          Danger
        </Button>
        <Button size="sm" loading>
          Loading
        </Button>
      </PlaygroundBlock>

      <PlaygroundBlock
        name="Badge"
        to="/playground/badge"
        code={`<Badge size="lg" color="success">Aktif</Badge>`}
      >
        <Badge size="lg" color="primary">
          Primary
        </Badge>
        <Badge size="lg" color="success">
          Aktif
        </Badge>
        <Badge size="lg" color="warning">
          Menunggu
        </Badge>
        <Badge size="lg" color="danger">
          Gagal
        </Badge>
        <Badge size="lg" color="gray">
          Arsip
        </Badge>
      </PlaygroundBlock>

      <PlaygroundBlock
        name="Chip"
        to="/playground/chip"
        code={`<Chip color="success">Selesai</Chip>`}
      >
        <Chip selected>Semua</Chip>
        <Chip>Draft</Chip>
        <Chip color="success">Selesai</Chip>
        <Chip color="danger">Ditolak</Chip>
      </PlaygroundBlock>

      <PlaygroundBlock
        name="Input"
        to="/playground/input"
        code={`<Input label="Email" icon="at-sign" placeholder="nama@herca.id" />`}
      >
        <div className="w-full">
          <Input label="Email" icon="at-sign" placeholder="nama@herca.id" />
        </div>
      </PlaygroundBlock>

      <PlaygroundBlock
        name="Switch"
        to="/playground/switch"
        code={`<Switch defaultChecked color="success" label="Sinkron" />`}
      >
        <Switch defaultChecked label="Notifikasi" />
        <Switch label="Mode ringkas" />
        <Switch defaultChecked color="success" label="Sinkron" />
      </PlaygroundBlock>

      <PlaygroundBlock
        name="Avatar"
        to="/playground/avatar"
        code={`<Avatar name="Dafi Rahman" color="success" />`}
      >
        <Avatar name="Herca Carman" />
        <Avatar name="Dafi Rahman" color="success" />
        <Avatar name="Mamet Putra" color="orange" variant="rounded" />
        <Avatar name="Hambali" color="purple" variant="square" />
      </PlaygroundBlock>

      <PlaygroundBlock
        name="ProgressBar"
        to="/playground/progress-bar"
        code={`<ProgressBar value={68} />`}
      >
        <div className="w-full">
          <ProgressBar value={68} />
        </div>
      </PlaygroundBlock>

      <PlaygroundBlock
        name="Kbd"
        to="/playground"
        code={`<Kbd color="primary">Enter</Kbd>`}
      >
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
        <Kbd color="primary">Enter</Kbd>
        <Kbd variant="outline">Esc</Kbd>
      </PlaygroundBlock>

      <PlaygroundBlock
        name="Tabs"
        to="/playground/tabs"
        wide
        code={`<TabsTrigger value="aktivitas">Aktivitas</TabsTrigger>`}
      >
        <TabsPreview />
      </PlaygroundBlock>
    </div>
  );
}
