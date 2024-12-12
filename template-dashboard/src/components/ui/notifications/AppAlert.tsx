import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { useAppAlert } from '@/stores/app-alert';
import { useEffect } from 'react';

export const AppAlert = () => {
  const { appAlert, dismiss } = useAppAlert();
  const { toast } = useToast();

  useEffect(() => {
    if (!appAlert.length) return;
    const currentAlert = appAlert[appAlert.length - 1];
    toast({
      title: currentAlert.title,
      variant: currentAlert.type === 'error' ? 'destructive' : 'default',
      duration: 3000,
    });
    return () => {
      dismiss(currentAlert.id);
    };
  }, [appAlert]);

  return <Toaster />;
};
