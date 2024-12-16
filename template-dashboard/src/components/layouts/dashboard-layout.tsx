import { User2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';

import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { useLogout } from '@/stores/auth/hooks';
import { cn } from '@/utils/cn';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown';
import { Link } from '../ui/link';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar, SideNavigationItem } from '../ui/sidebar/app-sidebar';

const Logo = () => {
  return (
    <Link className="flex items-center" to={paths.home.getHref()}>
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <img className="size-10" src={logo} alt="Workflow" />
      </div>
      <div className="ml-3 flex flex-col gap-0.5 leading-none">
        <span className="font-semibold">Dashboard</span>
        <span className="">v1.0.0</span>
      </div>
    </Link>
  );
};

const Progress = () => {
  const { state, location } = useNavigation();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
  }, [location?.pathname]);

  useEffect(() => {
    if (state === 'loading') {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          const newProgress = oldProgress + 10;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 300);

      return () => {
        clearInterval(timer);
      };
    }
  }, [state]);

  if (state !== 'loading') {
    return null;
  }

  return (
    <div
      className="fixed left-0 top-0 h-1 bg-blue-500 transition-all duration-200 ease-in-out"
      style={{ width: `${progress}%` }}
    ></div>
  );
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const logout = useLogout();
  // const { checkAccess } = useAuthorization();
  const navigate = useNavigate();
  const navigation = [
    { name: 'Dashboard', path: paths.app.dashboard.getHref(), icon: 'menu' },
    {
      name: 'Master',
      icon: 'panel-left',
      submenu: [
        {
          name: 'Access',
          icon: 'user',
          submenu: [
            { name: 'Menu', path: '/app/master/access/menu', icon: 'menu' },
            { name: 'Roles', path: '/app/master/access/roles', icon: 'menu' },
          ],
        },
      ],
    },
  ].filter(Boolean) as SideNavigationItem[];

  return (
    <SidebarProvider>
      <Progress />
      <AppSidebar logo={<Logo />} items={navigation} />
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60"></div>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:justify-between sm:border-0 sm:bg-transparent sm:px-6">
          <SidebarTrigger />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <span className="sr-only">Open user menu</span>
                <User2 className="size-6 rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigate(paths.app.profile.getHref())}
                className={cn('block px-4 py-2 text-sm text-gray-700')}
              >
                Your Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={cn('block px-4 py-2 text-sm text-gray-700 w-full')}
                onClick={() => logout()}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
}
