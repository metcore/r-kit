import { Link, useLocation } from "react-router-dom";
import { BrandLogo } from "../../components/brand-logo";
import { Icon, type IconNameProps } from "../../components/icons";
import { useSidebar } from "../../components/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuGroup,
  SidebarMenuItem,
  SidebarTrigger,
} from "../../components/sidebar/sidebar";
import { cn } from "../../lib/utils";
import brandLogo from "../assets/images/brand-logo.png";

type RouteType = {
  path?: string;
  label: string;
  icon?: IconNameProps;
  children?: RouteType[];
};

function AppSidebar() {
  const location = useLocation();
  const { state, isHovered } = useSidebar();

  const menuItems: RouteType[] = [
    { path: "/", label: "Overview", icon: "grid-square" },
    {
      path: "/foundation",
      label: "Foundation",
      icon: "circle-and-square",
      children: [
        { path: "/typography", label: "Typography" },
        { path: "/colors", label: "Color" },
      ],
    },
    {
      path: "/form",
      label: "Form",
      icon: "clipboard-edit",
      children: [
        { path: "/checkbox", label: "Checkbox" },
        { path: "/input-field", label: "Input Field" },
        { path: "/switch", label: "Switches" },
        { path: "/radio-button", label: "Radio Button" },
        { path: "/file-input", label: "File Input" },
        { path: "/select", label: "Select" },
      ],
    },
    {
      label: "Components",
      icon: "book-open-text",
      children: [
        { path: "/input", label: "Input" },
        { path: "/button", label: "Button" },
        { path: "/card", label: "Card" },
        { path: "/chip", label: "Chip" },
        { path: "/avatar", label: "Avatar" },
        { path: "/modal", label: "Modal" },
      ],
    },

    {
      path: "/navigation",
      label: "Navigation",
      icon: "cursor",
      children: [{ path: "/tabs", label: "Tabs" }],
    },
    { path: "/feedback", label: "Feedback", icon: "message-text-notification" },
    { path: "/data-display", label: "Data Display", icon: "desktop" },
    { path: "/pages", label: "Pages", icon: "cpu" },
    { path: "/auth", label: "Authentication", icon: "lock" },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="h-[76px] flex-row items-center justify-between pl-5">
        <BrandLogo name="Herca Design" brandLogo={brandLogo} />
        <div
          className={cn(
            state === "collapsed" && "hidden",
            isHovered && "block",
          )}
        >
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent className="scrollbar-hide">
        <SidebarMenu>
          {menuItems.map((item, index) => {
            if (item.children) {
              const isAnyChildActive = item.children?.some(
                (child) => child.path === location.pathname,
              );
              return (
                <SidebarMenuGroup
                  label={item.label}
                  active={isAnyChildActive}
                  key={index}
                  icon={
                    item.icon && (
                      <Icon size={18} name={item.icon as IconNameProps} />
                    )
                  }
                >
                  {item.children.map((child, index) => (
                    <SidebarMenuItem
                      asChild
                      icon={
                        child?.icon && (
                          <Icon size={18} name={child?.icon as IconNameProps} />
                        )
                      }
                      key={index}
                      active={child.path === location.pathname}
                    >
                      <Link to={child.path || "/"}>{child.label}</Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenuGroup>
              );
            }

            return (
              <SidebarMenuItem
                asChild
                icon={
                  item.icon && (
                    <Icon size={18} name={item.icon as IconNameProps} />
                  )
                }
                key={index}
                active={item.path === location.pathname}
              >
                <Link className="text-nowrap" to={item.path || "/"}>
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

export default AppSidebar;
