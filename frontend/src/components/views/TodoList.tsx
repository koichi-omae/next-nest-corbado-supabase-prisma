import { useTodoSWR } from '@/hooks/todo/useTodoSwr';
import { updateCompleted, deleteTodo } from '@/graphql/todo';
import { request } from 'graphql-request';
import { parseCookies } from 'nookies';
import { useTodo } from '@/hooks/todo/useTodo';
import { todoState, TodoObj } from '@/model/todo';
import { useRecoilValue } from 'recoil';

interface TodoListProps {
  todos?: TodoProps[];
  handleUpdate?: (id: number) => Promise<void>;
  handleDelete?: (id: number) => Promise<void>;
  handleChangeMode: (
    id: number,
    title: string,
    description: string,
    completed: boolean,
    mode: 'create' | 'edit',
  ) => void;
}

interface TodoProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

function TodoListPresentation({ ...props }: TodoListProps) {
  return (
    <div className='border-2 p-8 h-96 overflow-y-auto'>
      {props.todos?.map((todo) => (
        <div
          key={todo.id}
          className=' border-dashed border-2 rounded-md p-2 flex items-center justify-between mb-4 hover:cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out '
          onClick={(e) =>
            props.handleChangeMode(todo.id, todo.title, todo.description, todo.completed, 'edit')
          }
        >
          <p className='text-center text-xl tracking-wide font-semibold'>{todo.title}</p>
          <div>
            <span
              onClick={(e) => {
                e.stopPropagation();
                props.handleUpdate?.(todo.id);
              }}
              className={`${todo.completed ? 'bg-pink-500 ' : 'bg-gray-400 '} text-white px-2 py-1 rounded-md text-sm tracking-wide hover:opacity-50`}
            >
              {todo.completed ? 'Completed' : 'Todo'}
            </span>
            <span
              className='text-xl hover:cursor-pointer ml-4 hover:opacity-50'
              onClick={(e) => {
                e.stopPropagation();
                props.handleDelete?.(todo.id);
              }}
            >
              ×
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TodoListsContainer() {
  const { todos, isLoading, isError, mutate } = useTodoSWR();
  const { setEdit, resetTodo } = useTodo();
  const cookies = parseCookies();
  const todo = useRecoilValue(todoState);

  if (isLoading) return <div className='border-2 p-8 h-96'>Loading...</div>;
  if (isError) return <div>Error</div>;

  const handleUpdate = async (id: number) => {
    const todo = todos?.find((todo) => todo.id === id);
    if (todo) {
      const query = updateCompleted(id, !todo.completed);

      await request(`${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`, query)
        .then(async (data) => {
          await mutate();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = async (id: number) => {
    const query = deleteTodo(id);
    await request(`${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`, query)
      .then(async (data) => {
        if (todo.id === id) resetTodo();
        await mutate();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeMode = (
    id: number,
    title: string,
    description: string,
    completed: boolean,
    mode: 'create' | 'edit',
  ) => {
    setEdit({ id, title, description, completed, mode });
  };

  const data: TodoListProps = {
    todos,
    handleUpdate,
    handleDelete,
    handleChangeMode,
  };

  return <TodoListPresentation {...data} />;
}
