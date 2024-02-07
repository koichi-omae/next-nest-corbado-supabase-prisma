import { useSetRecoilState } from 'recoil';
import { todoState, TodoObj } from '@/model/todo';

export const useTodo = () => {
  const setTodo = useSetRecoilState(todoState);

  const setTitle = (title: string) => {
    setTodo((prev) => ({ ...prev, title }));
  };

  const setDescription = (description: string) => {
    setTodo((prev) => ({ ...prev, description }));
  };

  const setEdit = (todo: TodoObj) => {
    setTodo(todo);
  };

  const resetTodo = () => {
    setTodo({
      id: 0,
      title: '',
      description: '',
      completed: false,
      mode: 'create',
    });
  };

  return {
    setTitle,
    setDescription,
    setEdit,
    resetTodo,
  };
};
