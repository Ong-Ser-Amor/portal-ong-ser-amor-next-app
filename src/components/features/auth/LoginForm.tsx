import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import { useFormContext, Controller } from 'react-hook-form';
import { SignInDto } from '@/interfaces/auth/SignInDto';

interface LoginFormProps {
  isLoading?: boolean;
  error?: string | null;
  onSubmit: (data: SignInDto) => void;
  onRetry?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  isLoading = false,
  error,
  onSubmit,
  onRetry,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext<SignInDto>();

  return (
    <div className="m-0 flex h-screen items-center justify-center bg-[#f5f7fa] font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div className='w-[400px] rounded-[10px] bg-white p-[40px] text-center shadow-[0_5px_15px_rgba(0,0,0,0.1)]'>
        <div className='mb-[30px]'>
          <h1>Portal ONG Ser Amor</h1>
        </div>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          error={error}
          onRetry={onRetry}
          showRetryButton={!!error && !isLoading}
        >
          <Controller
            name='email'
            control={control}
            rules={{
              required: 'Email é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            }}
            render={({ field }) => (
              <Input
                label='Email'
                id='email'
                type='email'
                autoComplete='email'
                error={errors.email}
                {...field}
              />
            )}
          />

          <Controller
            name='password'
            control={control}
            rules={{ required: 'Senha é obrigatória' }}
            render={({ field }) => (
              <Input
                label='Senha'
                id='password'
                type='password'
                autoComplete='current-password'
                error={errors.password}
                {...field}
              />
            )}
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
        <div></div>
      </div>
    </div>
  );
};

export default LoginForm;
