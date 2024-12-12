import { useNavigate, useSearchParams } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { RegisterForm } from '@/features/auth/components/register-form';
import { useAppAlert } from '@/stores/app-alert';
import { nanoid } from 'nanoid';

export const RegisterRoute = () => {
  const navigate = useNavigate();
  const { addAlert } = useAppAlert();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AuthLayout title="Register your account">
      <RegisterForm
        onSuccess={() => {
          addAlert({
            id: nanoid(),
            type: 'success',
            title: 'Berhasil Register',
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
