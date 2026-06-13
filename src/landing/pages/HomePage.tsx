import * as React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { Text } from '../../components/text';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description:
      'Zero runtime overhead. Tree-shakeable. Built with performance in mind from day one.',
  },
  {
    icon: '🎨',
    title: 'Beautifully Designed',
    description:
      'Crafted with care. Modern aesthetics that work in any product, any brand.',
  },
  {
    icon: '♿',
    title: 'Accessible by Default',
    description:
      'WAI-ARIA compliant. Keyboard navigation. Screen reader friendly. No extra work.',
  },
  {
    icon: '🔧',
    title: 'Fully Typed',
    description:
      'Strict TypeScript. Autocomplete everything. Catch errors before runtime.',
  },
  {
    icon: '🎯',
    title: 'Composable',
    description:
      'Mix and match components. Override styles. Compose your own design system.',
  },
  {
    icon: '📦',
    title: 'Lightweight',
    description:
      'No bloat. No unnecessary dependencies. Import only what you need.',
  },
];

const stats = [
  { value: '30+', label: 'Components' },
  { value: '100%', label: 'TypeScript' },
  { value: '< 50kb', label: 'Bundle size' },
  { value: 'WCAG AA', label: 'Accessible' },
];

const components = [
  { name: 'Button', category: 'Actions', count: '12 variants' },
  { name: 'Input', category: 'Forms', count: '8 variants' },
  { name: 'InputOTP', category: 'Forms', count: 'New' },
  { name: 'Select', category: 'Forms', count: '6 variants' },
  { name: 'Dialog', category: 'Overlay', count: '4 variants' },
  { name: 'Toast', category: 'Feedback', count: '5 variants' },
  { name: 'Tabs', category: 'Navigation', count: '3 variants' },
  { name: 'Card', category: 'Layout', count: '6 variants' },
];

export const HomePage = (): React.ReactElement => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgb(99 102 241 / 0.15) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5">
                <Text> Just released — 30+ components</Text>
              </div>
              <Text
                weight="bold"
                variant="h1"
                className="text-center text-nowrap"
              >
                Build faster with React Kit
              </Text>

              <Text
                weight="regular"
                variant="t1"
                className="text-center text-nowrap text-gray-900"
              >
                A modern, accessible, and beautifully designed React component
                library. TypeScript-first. Production-ready. Open source.
              </Text>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="playground"
                  className="group flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium transition-all hover:bg-slate-800 hover:shadow-xl"
                >
                  Try Playground
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>

                <Link
                  to="docs"
                  className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Read Documentation
                </Link>
              </div>

              <div className="mx-auto mt-12 max-w-md">
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-900 px-4 py-3 text-left font-mono text-sm">
                  <span className="text-slate-500">$</span>
                  <span className="flex-1 text-slate-100">
                    npm i @herca/r-kit
                  </span>
                  <button
                    type="button"
                    className="text-slate-400 transition-colors hover:text-white"
                    aria-label="Copy command"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M7 3a1 1 0 00-1 1v1H5a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-1V4a1 1 0 00-1-1H7zm0 2h2v1H7V5z" />
                      <path d="M11 6V4a2 2 0 114 0v9a2 2 0 11-4 0v-2H7a2 2 0 01-2-2V8a2 2 0 012-2h4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="border-t border-slate-100 bg-white py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <div className="mb-3 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-700 uppercase">
                Features
              </div>
              <Text
                weight="bold"
                variant="h1"
                className="text-center text-nowrap"
              >
                Everything you need
              </Text>
              <Text
                weight="regular"
                variant="t1"
                className="text-center text-nowrap text-gray-900"
              >
                A complete toolkit for building modern web applications. No
                compromises.
              </Text>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 text-2xl transition-transform group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="mb-3 inline-block rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold tracking-wide text-purple-700 uppercase">
                  Components
                </div>
                <h2 className="text-4xl font-bold text-slate-900">
                  30+ components, ready to use
                </h2>
                <p className="mt-2 text-slate-600">
                  Carefully designed primitives for your next project
                </p>
              </div>

              <Link
                to="playground"
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                View all
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {components.map((component) => (
                <Link
                  to="playground"
                  key={component.name}
                  type="button"
                  className="group rounded-xl border border-slate-200 bg-white p-5 text-left transition-all hover:border-indigo-300 hover:shadow-md"
                >
                  <div className="mb-4 flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-slate-50 to-slate-100">
                    <div className="font-mono text-sm font-medium text-slate-400 transition-colors group-hover:text-indigo-600">
                      &lt;{component.name} /&gt;
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {component.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {component.category}
                      </div>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      {component.count}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="border-y border-slate-100 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="mb-1 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 px-8 py-16 text-center md:px-16 md:py-20">
              <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
              <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />

              <div className="relative">
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  Ready to ship faster?
                </h2>
                <p className="mx-auto mb-8 max-w-xl text-slate-300">
                  Join developers building beautiful products with React Kit.
                  Free and open source forever.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="playground"
                    className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100"
                  >
                    Try Playground
                  </Link>
                  <Link
                    to="docs"
                    className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const Footer = (): React.ReactElement => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white">
              R
            </div>
            <span className="font-semibold text-slate-900">React Kit</span>
            <span className="text-sm text-slate-500">
              © {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-slate-600">
            <a href="#" className="hover:text-slate-900">
              GitHub
            </a>
            <a href="#" className="hover:text-slate-900">
              Twitter
            </a>
            <a href="#" className="hover:text-slate-900">
              Discord
            </a>
            <a href="#" className="hover:text-slate-900">
              License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
