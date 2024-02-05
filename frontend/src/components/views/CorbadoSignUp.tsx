import { SignUp, CorbadoProvider } from '@corbado/react';
import { useRouter } from 'next/navigation';

export default function CorbadoSignUpContainer() {
  const router = useRouter();

  const onSignedUp = () => {
    router.push('/todo');
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  return (
    <CorbadoProvider projectId={process.env.NEXT_PUBLIC_PROJECT_ID}>
      <div className='flex justify-center items-center h-screen'>
        <SignUp onSignedUp={onSignedUp} navigateToLogin={navigateToLogin} />
      </div>
    </CorbadoProvider>
  );
}
