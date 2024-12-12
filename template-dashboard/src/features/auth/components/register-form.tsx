import { Link, useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { paths } from '@/config/paths';
import { useRegister, useUser } from '@/stores/auth';
import { registerInputSchema } from '@/stores/auth/api';
import { AuthResponse } from '@/types/api';

export type RegisterFormProps = {
  onSuccess: (response: AuthResponse) => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [searchParams] = useSearchParams();
  const register = useRegister(onSuccess);
  const [user] = useUser();
  const redirectTo = searchParams.get('redirectTo');
  return (
    <div>
      <Form
        onSubmit={(values) => {
          register(values);
        }}
        schema={registerInputSchema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="text"
              label="First Name"
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <Input
              type="text"
              label="Last Name"
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />
            <Input
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <Input
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <div>
              <Button
                isLoading={user.status === 'loading'}
                type="submit"
                className="w-full"
              >
                Register
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to={paths.auth.login.getHref(redirectTo)}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
