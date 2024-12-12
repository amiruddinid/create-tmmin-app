import { z } from 'zod';

import { api } from '@/lib/api-client';
import { useUser } from '@/stores/auth/hooks';

export const updateProfileInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  bio: z.string(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;

export const updateProfile = ({ data }: { data: UpdateProfileInput }) => {
  return api.patch(`/users/profile`, data);
};

export const useUpdateProfile = ({} = {}) => {
  const [user] = useUser();

  // const { onSuccess, ...restConfig } = ;

  return;
};
