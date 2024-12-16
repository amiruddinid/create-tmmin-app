export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    register: {
      path: '/auth/register',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  // can be replaced with backend data
  app: {
    root: {
      path: '/',
      getHref: () => '/app',
    },
    dashboard: {
      path: 'app',
      getHref: () => '/app',
    },
    profile: {
      path: 'app/profile',
      getHref: () => '/app/profile',
    },
    master: {
      path: 'app/master',
      getHref: () => '/app/master',
      access: {
        path: 'app/master/access',
        getHref: () => '/app/master/access',
        menu: {
          path: 'app/master/access/menu',
          getHref: () => '/app/master/access/menu',
        },
        role: {
          path: 'app/master/access/roles',
          getHref: () => '/app/master/access/roles',
        },
      },
    },
  },
} as const;
