'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SignInDto } from '@/interfaces/auth/SignInDto';
import { getLoginErrorMessage } from '@/utils/errorUtils';
import LoginForm from '@/components/features/auth/LoginForm';

interface LoginFormContainerProps {
  onSuccess?: () => void;
}

const LoginFormContainer: React.FC<LoginFormContainerProps> = ({
  onSuccess,
}) => {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<SignInDto>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: SignInDto) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(data);
      if (onSuccess) onSuccess();
    } catch (err) {
      const friendlyMessage = getLoginErrorMessage(err);
      setError(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    methods.handleSubmit(handleFormSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <LoginForm
        isLoading={isLoading}
        error={error}
        onSubmit={handleFormSubmit}
        onRetry={handleRetry}
      />
    </FormProvider>
  );
};

export default LoginFormContainer;
