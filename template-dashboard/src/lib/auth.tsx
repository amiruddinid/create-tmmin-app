import { Navigate, useLocation } from 'react-router-dom';

import { paths } from '@/config/paths';
import { useUser } from '@/stores/auth/hooks';

import { log } from './utils';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user] = useUser();
  const location = useLocation();

  if (!user.isLogin) {
    log('log', {
      pathname: location.pathname,
      redirectTo: paths.auth.login.getHref(location.pathname),
    });
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
