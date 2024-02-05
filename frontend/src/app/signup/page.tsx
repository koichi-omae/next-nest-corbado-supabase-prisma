'use client';

import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { LineWave } from 'react-loader-spinner';
import { useUser } from '@/hooks/auth/useUser';
import { useSession } from '@/hooks/auth/useSession';
import { useLoading } from '@/hooks/auth/useLoading';
import { userObjState } from '@/app/model/auth/user';
import CorbadoSignUpContainer from '@/components/views/CorbadoSignUp';
export default function Profile() {
  const user = useRecoilValue(userObjState);
  const { setLogin } = useUser();
  const { session, setSession } = useSession();
  const { loading, setLoading } = useLoading();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    import('@corbado/webcomponent')
      .then((module) => {
        const Corbado = module.default || module;
        const sessionInstance = new Corbado.Session(process.env.NEXT_PUBLIC_PROJECT_ID);
        setSession(sessionInstance);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (session) {
      setLoading(true);
      // @ts-ignore
      session.refresh((user: any) => {
        setLogin(user);
        setLoading(false);
      });
    }
  }, [session]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <LineWave />
      </div>
    );
  }

  if (!loading && user) router.push('/todo');

  return <div>{!loading && !user && <CorbadoSignUpContainer />}</div>;
}
