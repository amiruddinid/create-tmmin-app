import { ChevronDown } from 'lucide-react';
import { useMatch, useResolvedPath } from 'react-router-dom';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../collapsible';
import { Icon, IconComponentName } from '../icon';
import { Link } from '../link';

export type SideNavigationItem = {
  name: string;
  path: string;
  icon: IconComponentName;
  submenu?: SideNavigationItem[];
};

const SideMenuNavLink = ({
  to,
  title,
  icon,
  sub,
}: {
  to: string;
  title: string;
  icon: IconComponentName;
  sub?: boolean;
}) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  return !sub ? (
    <SidebarMenuButton asChild isActive={!!match}>
      <Link to={to}>
        <Icon name={icon} className="mr-2 size-4" />
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  ) : (
    <SidebarMenuSubButton asChild isActive={!!match}>
      <Link to={to}>
        <Icon name={icon} className="mr-2 size-4" />
        <span>{title}</span>
      </Link>
    </SidebarMenuSubButton>
  );
};

function SubMenu({
  items,
  level = 1,
}: {
  items: SideNavigationItem[];
  level?: number;
}) {
  return (
    <SidebarMenuSub>
      {items.map((item) => (
        <SidebarMenuSubItem key={item.name}>
          {item.submenu ? (
            <Collapsible>
              <CollapsibleTrigger asChild>
                <SidebarMenuSubButton className="flex w-full items-center justify-between">
                  <div className="flex w-full items-center">
                    <Icon name={item.icon} className="mr-2 size-4" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronDown className="size-4" />
                </SidebarMenuSubButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SubMenu items={item.submenu} level={level + 1} />
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <SideMenuNavLink
              to={item.path}
              title={item.name}
              icon={item.icon}
              sub
            />
          )}
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );
}

export function AppSidebar({
  logo,
  items,
}: {
  logo: JSX.Element;
  items: SideNavigationItem[];
}) {
  const { open, toggleSidebar } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">{logo}</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.name}>
                  {item.submenu ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          onClick={() => {
                            if (!open) {
                              toggleSidebar();
                            }
                          }}
                        >
                          <Icon name={item.icon} className="mr-2 size-4" />
                          <span>{item.name}</span>
                          <ChevronDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SubMenu items={item.submenu} />
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SideMenuNavLink
                      to={item.path}
                      title={item.name}
                      icon={item.icon}
                      sub={false}
                    />
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
