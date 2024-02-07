'use client';

import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { LineWave } from 'react-loader-spinner';
import { useUser } from '@/hooks/auth/useUser';
import { useSession } from '@/hooks/auth/useSession';
import { useLoading } from '@/hooks/auth/useLoading';
import { userObjState } from '@/app/model/auth/user';
import useSwr from 'swr';
import { parseCookies } from 'nookies';
import { request } from 'graphql-request';
import TodoContainer, { TodoContainerProps } from '@/components/templates/TodoContainer';

//create a fetcher function to use with useSwr
const fetcher = (query: string) => {
  return request('http://localhost:8080/graphql', query);
};
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
        console.log(err);
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

  const handleLogout = async () => {
    setLoading(true);
    // @ts-ignore
    await session.logout();
    setLogin(null);
    setLoading(false);
    router.push('/');
  };

  const TodoContainerData: TodoContainerProps = {
    userFullName: user?.userFullName || '',
    handleLogout: handleLogout,
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      {loading && <LineWave />}

      {!loading && user && <TodoContainer {...TodoContainerData} />}

      {!loading && !user && (
        <div>
          <p>You're not logged in.</p>
          <p>
            Please go back to <a href='/'>home</a> to log in.
          </p>
        </div>
      )}
    </div>
  );
}
