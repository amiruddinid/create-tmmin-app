import { api } from '@/lib/api-client';
import { User } from '@/types/api';

export const getUsers = (): Promise<{ data: User[] }> => {
  return api.get(`/users`);
};

export const useUsers = ({}) => {
  return;
};
