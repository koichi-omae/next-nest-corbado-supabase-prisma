import { useSetRecoilState } from 'recoil';
import { userObjState, UserObj } from '@/app/model/auth/user';

export const useUser = () => {
  const setUser = useSetRecoilState(userObjState);

  const setLogin = (user: UserObj | null) => {
    setUser(user);
  };

  return { setLogin };
};
