'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import { useAuth } from '@/contexts/AuthContext';
import { SignInDto } from '@/interfaces/auth/SignInDto';
import { getLoginErrorMessage } from '@/utils/errorUtils';
import Input from '@/components/ui/Input';

export default function LoginForm() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignInDto>();
  const onSubmit = async (data: SignInDto) => {
    setIsLoading(true);
    setError(null);

    try {
      await login(data);
    } catch (err) {
      const friendlyMessage = getLoginErrorMessage(err);
      setError(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRetry = () => {
    setError(null);
    const formData = getValues();
    onSubmit(formData);
  };
  return (
    <div>
      {' '}
      <Form
        onSubmit={handleSubmit(onSubmit)}
        error={error}
        onRetry={handleRetry}
        showRetryButton={!!error && !isLoading}
      >
        <Input
          label='Email'
          id='email'
          type='email'
          autoComplete='email'
          error={errors.email}
          {...register('email', {
            required: 'Email é obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido',
            },
          })}
        />

        <Input
          label='Senha'
          id='password'
          type='password'
          autoComplete='current-password'
          error={errors.password}
          {...register('password', {
            required: 'Senha é obrigatória',
          })}
        />

        <div className='mb-5 flex items-center justify-between'>
          <div className='flex items-center'>
            <input
              type='checkbox'
              id='remember'
              className='mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
            />
            <label htmlFor='remember' className='text-sm text-gray-700'>
              Lembrar-me
            </label>
          </div>

          <a href='#' className='text-sm text-blue-600 hover:underline'>
            Esqueceu a senha?
          </a>
        </div>

        <Button
          type='submit'
          variant='primary'
          isLoading={isLoading}
          loadingText='Entrando...'
          fullWidth
        >
          Entrar
        </Button>
      </Form>
    </div>
  );
}
