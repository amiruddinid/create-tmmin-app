import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import * as config from '@/config';
import { ProtectedRoute } from '@/lib/auth';

import { AppRoot, AppRootErrorBoundary } from './routes/app/root';

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: config.paths.home.path,
      lazy: async () => {
        const { LandingRoute } = await import('./routes/landing');
        return { Component: LandingRoute };
      },
    },
    {
      path: config.paths.auth.register.path,
      lazy: async () => {
        const { RegisterRoute } = await import('./routes/auth/register');
        return { Component: RegisterRoute };
      },
    },
    {
      path: config.paths.auth.login.path,
      lazy: async () => {
        const { LoginRoute } = await import('./routes/auth/login');
        return { Component: LoginRoute };
      },
    },
    {
      path: config.paths.app.root.path,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        {
          path: config.paths.app.master.access.role.path,
          lazy: async () => {
            const { MasterAccessRolesRoute } = await import(
              './routes/app/master/access/roles'
            );
            return {
              Component: MasterAccessRolesRoute,
            };
          },
          ErrorBoundary: AppRootErrorBoundary,
        },
        {
          path: config.paths.app.master.access.menu.path,
          lazy: async () => {
            const { MasterAccessMenuRoute } = await import(
              './routes/app/master/access/menu'
            );
            return {
              Component: MasterAccessMenuRoute,
            };
          },
          ErrorBoundary: AppRootErrorBoundary,
        },
        {
          path: config.paths.app.profile.path,
          lazy: async () => {
            const { ProfileRoute } = await import('./routes/app/profile');
            return {
              Component: ProfileRoute,
            };
          },
          ErrorBoundary: AppRootErrorBoundary,
        },
        {
          path: config.paths.app.dashboard.path,
          lazy: async () => {
            const { DashboardRoute } = await import('./routes/app/dashboard');
            return {
              Component: DashboardRoute,
            };
          },
          ErrorBoundary: AppRootErrorBoundary,
        },
      ],
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./routes/not-found');
        return {
          Component: NotFoundRoute,
        };
      },
      ErrorBoundary: AppRootErrorBoundary,
    },
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
};
