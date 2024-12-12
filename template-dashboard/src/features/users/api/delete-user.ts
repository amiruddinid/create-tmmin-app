import { api } from '@/lib/api-client';

export type DeleteUserDTO = {
  userId: string;
};

export const deleteUser = ({ userId }: DeleteUserDTO) => {
  return api.delete(`/users/${userId}`);
};

export const useDeleteUser = ({}) => {
  return {};
};
