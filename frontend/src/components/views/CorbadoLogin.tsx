import { Login, CorbadoProvider } from '@corbado/react';
import { useRouter } from 'next/navigation';

interface CorbadoLoginProps {
  onLoggedIn: () => void;
  navigateToSignUp: () => void;
}

function CorbadoLoginPresentation({ ...props }: CorbadoLoginProps) {
  return (
    <CorbadoProvider projectId={process.env.NEXT_PUBLIC_PROJECT_ID}>
      <div className='flex justify-center items-center h-screen'>
        <Login onLoggedIn={props.onLoggedIn} navigateToSignUp={props.navigateToSignUp} />
      </div>
    </CorbadoProvider>
  );
}

export default function CorbadoLoginContainer() {
  const router = useRouter();

  const onLoggedIn = () => {
    router.push('/todo');
  };

  const navigateToSignUp = () => {
    router.push('/signup');
  };

  const data: CorbadoLoginProps = {
    onLoggedIn,
    navigateToSignUp,
  };

  return <CorbadoLoginPresentation {...data} />;
}
