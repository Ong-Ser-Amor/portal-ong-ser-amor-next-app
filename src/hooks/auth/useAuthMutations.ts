import { SignInDto } from '@/interfaces/auth/SignInDto';
import { authService } from '@/services/authService';
import { getApiErrorMessage } from '@/utils/errorUtils';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export function useLogin() {
  return useMutation({
    mutationFn: (data: SignInDto) => authService.signIn(data),
    onError: (error) => {
      const message = getApiErrorMessage(error, 'login');
      if (!message.includes('Email ou senha')) {
        toast.error(message);
      }
    },
  });
}
