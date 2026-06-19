import { Link, useLocation } from 'react-router-dom';

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
import { BrandLogo } from '../../components/brand-logo';
import { cn } from '../../lib/utils';

import brandLogo from '../../assets/images/brand-logo.png';

type RouteType = {
  path?: string;
  label: string;
  icon?: IconNameProps;
  children?: RouteType[];
};

function PlaygroundSidebar() {
  const location = useLocation();
  const { state, isHovered } = useSidebar();

  const menuItems: RouteType[] = [
    { path: '/', label: 'Overview', icon: 'grid-square' },
    {
      path: '/foundation',
      label: 'Foundation',
      icon: 'circle-and-square',
      children: [
        { path: '/playground/typography', label: 'Typography' },
        { path: '/playground/colors', label: 'Color' },
      ],
    },
    {
      path: '/form',
      label: 'Form',
      icon: 'clipboard-edit',
      children: [
        { path: '/playground/checkbox', label: 'Checkbox' },
        { path: '/playground/input-field', label: 'Input Field' },
        { path: '/playground/input-group', label: 'Input Group' },
        { path: '/playground/counter', label: 'Counter' },
        { path: '/playground/input-file', label: 'Input File' },
        { path: '/playground/date-picker', label: 'Date Picker' },
        { path: '/playground/radio-button', label: 'Radio Button' },
        { path: '/playground/switch', label: 'Switches' },
        { path: '/playground/select', label: 'Select' },
        { path: '/playground/slider', label: 'Slider' },
        { path: '/playground/text-editor', label: 'Text Editor' },
        { path: '/playground/text-area', label: 'Text Area' },
        { path: '/playground/input-otp', label: 'Input OTP' },
        { path: '/playground/color-picker', label: 'Color Picker' },
        { path: '/playground/input-password', label: 'Input Passowrd' },
        { path: '/playground/input-phone-number', label: 'Input Phone Number' },
      ],
    },
    {
      label: 'Components',
      icon: 'book-open-text',
      children: [
        { path: '/playground/avatar', label: 'Avatar' },
        { path: '/playground/icons', label: 'Icon' },
        { path: '/playground/timeline', label: 'Timeline' },
        { path: '/playground/calendar', label: 'Calendar' },
        { path: '/playground/badge', label: 'Badge' },
        { path: '/playground/button', label: 'Button' },
        { path: '/playground/button-icon', label: 'Button Icon' },
        { path: '/playground/button-group', label: 'Button Group' },
        { path: '/playground/card', label: 'Card' },
        { path: '/playground/chip', label: 'Chip' },
        { path: '/playground/modal', label: 'Modal' },
        { path: '/playground/progress-bar', label: 'Progress Bar' },
        { path: '/playground/image', label: 'Image' },
      ],
    },

    {
      path: '/navigation',
      label: 'Navigation',
      icon: 'cursor',
      children: [
        { path: '/playground/tabs', label: 'Tabs' },
        { path: '/playground/sheet', label: 'Sheet' },
        { path: '/playground/dropdown', label: 'Dropdown' },
        { path: '/playground/breadcrumb', label: 'BreadCrumb' },
        { path: '/playground/pagination', label: 'Pagination' },
        { path: '/playground/sidebar', label: 'Sidebar' },
        { path: '/playground/header', label: 'Header' },
      ],
    },
    {
      path: '/feedback',
      label: 'Feedback',
      icon: 'message-text-notification',
      children: [
        { label: 'Alert', path: '/playground/alert' },
        { label: 'Snackbar/Toast', path: '/playground/toast' },
      ],
    },
    {
      label: 'Data Display',
      icon: 'desktop',
      children: [
        { path: '/playground/accordion', label: 'Accordion' },
        { path: '/playground/list', label: 'List' },
        { path: '/playground/table', label: 'Table' },
        { path: '/playground/api-table', label: 'Api Table' },
        { path: '/playground/timeline', label: 'timeline' },
        { path: '/playground/file-view', label: 'File View' },
      ],
    },
    {
      path: '/playground/pages',
      label: 'Example',
      icon: 'cpu',
      children: [
        { path: '/playground/example/profile', label: 'Profile' },
        { path: '/playground/example/invoice', label: 'Invoice' },
      ],
    },
    { path: '/playground/auth', label: 'Authentication', icon: 'lock' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="h-19 flex-row items-center justify-between pl-5">
        <BrandLogo name="Playground" brandLogo={brandLogo} />

        <div
          className={cn(
            state === 'collapsed' && 'hidden',
            Boolean(isHovered) && 'block'
          )}
        >
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent className="scrollbar-hide">
        <SidebarMenu>
          {menuItems.map((item, index) => {
            if (item.children) {
              const isAnyChildActive = item.children.some(
                (child) => child.path === location.pathname
              );

              return (
                <SidebarMenuGroup
                  key={index}
                  label={item.label}
                  active={isAnyChildActive}
                  icon={item.icon && <Icon size={18} name={item.icon} />}
                >
                  {item.children.map((child, childIndex) => (
                    <SidebarMenuItem
                      key={childIndex}
                      asChild
                      active={child.path === location.pathname}
                    >
                      <Link to={child.path ?? '/'}> {child.label} </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenuGroup>
              );
            }

            return (
              <SidebarMenuItem
                key={index}
                asChild
                active={item.path === location.pathname}
                icon={item.icon && <Icon size={18} name={item.icon} />}
              >
                <Link className="text-nowrap" to={item.path ?? '/'}>
                  {item.label}
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

export default PlaygroundSidebar;
