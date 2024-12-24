import { LoginForm } from '@/features/auth/components/login-form';
import { useState } from 'react';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <LoginForm />
  );
}

