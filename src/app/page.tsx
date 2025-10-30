import LoginForm from '@/components/features/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="m-0 flex h-screen items-center justify-center bg-[#f5f7fa] font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div className='w-[400px] rounded-[10px] bg-white p-[40px] text-center shadow-[0_5px_15px_rgba(0,0,0,0.1)]'>
        <div className='mb-[30px]'>
          <h1>Portal ONG Ser Amor</h1>
        </div>
        <LoginForm />
        <div></div>
      </div>
    </div>
  );
}
