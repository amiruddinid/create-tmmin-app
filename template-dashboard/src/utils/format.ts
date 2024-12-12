import { format } from 'date-fns';

export const formatDate = (date: number | Date | string) =>
  format(date, 'MMMM D, YYYY h:mm A');
