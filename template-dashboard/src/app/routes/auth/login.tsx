import { useNavigate, useSearchParams } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { LoginForm } from '@/features/auth/components/login-form';
import { useAppAlert } from '@/stores/app-alert';
import { nanoid } from 'nanoid';

export const LoginRoute = () => {
  const navigate = useNavigate();
  const { addAlert } = useAppAlert();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AuthLayout title="Log in to your account">
      <LoginForm
        onSuccess={() => {
          addAlert({
            id: nanoid(),
            type: 'success',
            title: 'Berhasil Login',
          });
          navigate(
            `${redirectTo ? `${redirectTo}` : paths.app.dashboard.getHref()}`,
            {
              replace: true,
            },
          );
        }}
      />
    </AuthLayout>
  );
};
