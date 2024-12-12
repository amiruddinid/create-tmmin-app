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
  },
} as const;
