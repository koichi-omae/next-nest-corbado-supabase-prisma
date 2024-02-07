import { atom } from 'recoil';

export interface TodoObj {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  mode: 'create' | 'edit';
}

export const todoState = atom<TodoObj>({
  key: 'todoListState',
  default: {
    id: 0,
    title: '',
    description: '',
    completed: false,
    mode: 'create',
  },
});
