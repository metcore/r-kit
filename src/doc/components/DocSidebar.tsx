import { Link, useLocation } from 'react-router-dom';

import { BrandLogo } from '../../components/brand-logo';
import { Icon, type IconNameProps } from '../../components/icons';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuGroup,
  SidebarMenuItem,
  SidebarTrigger,
} from '../../components/sidebar/sidebar';
import { useSidebar } from '../../components/sidebar';
import { cn } from '../../lib/utils';
import brandLogo from '../../assets/images/brand-logo.png';
import { docHome, docSections, type DocGroup } from '../lib/content';

const IKON_GRUP: Record<DocGroup, IconNameProps> = {
  'Memulai': 'grid-square',
  'Konsep Inti': 'circle-and-square',
  'Panduan': 'book-open-text',
  'Foundation': 'circle-and-square',
  'Form': 'clipboard-edit',
  'Components': 'book-open-text',
  'Navigation': 'cursor',
  'Feedback': 'message-text-notification',
  'Data Display': 'desktop',
  'Hooks': 'cpu',
};

export default function DocSidebar() {
  const { pathname } = useLocation();
  const { state, isHovered } = useSidebar();

  // '/docs' menampilkan entri pertama, jadi perlakukan sama dengan
  // '/docs/<slug entri pertama>' supaya grupnya ikut terbuka.
  const aktif =
    pathname === '/docs' || pathname === '/docs/'
      ? `/docs/${docHome.slug}`
      : pathname;
  const terbuka = state === 'expanded' || Boolean(isHovered);

  return (
    <Sidebar>
      <SidebarHeader className="h-19 flex-row items-center justify-between pl-5">
        <BrandLogo name={terbuka ? 'Docs' : undefined} brandLogo={brandLogo} />
        <div
          className={cn(
            'hidden',
            state === 'collapsed' && Boolean(isHovered) && 'block'
          )}
        >
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent className="scrollbar-hide">
        <SidebarMenu>
          {docSections.map((section) => {
            const adaYangAktif = section.entries.some(
              (e) => aktif === `/docs/${e.slug}`
            );

            return (
              <SidebarMenuGroup
                key={section.group}
                label={section.group}
                active={adaYangAktif}
                icon={<Icon size={18} name={IKON_GRUP[section.group]} />}
              >
                {section.entries.map((entry) => (
                  <SidebarMenuItem
                    key={entry.slug}
                    asChild
                    active={aktif === `/docs/${entry.slug}`}
                  >
                    <Link to={`/docs/${entry.slug}`}> {entry.title} </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenuGroup>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
