import { atom } from 'recoil';

export interface UserObj {
  userID: string;
  email: string;
  ID: string;
  userFullName: string;
  phoneNumber: string;
}

export const userObjState = atom<UserObj | null>({
  key: 'userObjState',
  default: null,
});
