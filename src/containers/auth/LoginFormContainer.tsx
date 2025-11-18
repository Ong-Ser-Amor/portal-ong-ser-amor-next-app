'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SignInDto } from '@/interfaces/auth/SignInDto';
import { getApiErrorMessage, getLoginErrorMessage } from '@/utils/errorUtils';
import LoginForm from '@/components/features/auth/LoginForm';
import { useLogin } from '@/hooks/auth/useAuthMutations';

interface LoginFormContainerProps {
  onSuccess?: () => void;
}

const LoginFormContainer: React.FC<LoginFormContainerProps> = ({
  onSuccess,
}) => {
  const { setAuthSession } = useAuth();

  const { mutateAsync: loginFn, isPending } = useLogin();

  const [customError, setCustomError] = useState<string | null>(null);

  const methods = useForm<SignInDto>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: SignInDto) => {
    setCustomError(null);
    try {
      const response = await loginFn(data);

      setAuthSession(response);

      if (onSuccess) onSuccess();
    } catch (error) {
      const friendlyMessage = getApiErrorMessage(error, 'login');
      setCustomError(friendlyMessage);
    }
  };

  const handleRetry = () => {
    setCustomError(null);
    methods.handleSubmit(handleFormSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <LoginForm
        isLoading={isPending}
        error={customError}
        onSubmit={handleFormSubmit}
        onRetry={handleRetry}
      />
    </FormProvider>
  );
};

export default LoginFormContainer;
