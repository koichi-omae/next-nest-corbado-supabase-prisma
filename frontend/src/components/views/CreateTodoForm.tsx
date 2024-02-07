import { useTodo } from '@/hooks/todo/useTodo';
import { todoState, TodoObj } from '@/model/todo';
import { useRecoilValue } from 'recoil';
import { useTodoSWR } from '@/hooks/todo/useTodoSwr';
import { createTodo, updateTodo } from '@/graphql/todo';
import { request } from 'graphql-request';

interface CreateTodoFormProps {
  todo: TodoObj;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  handleCreate: (title: string, description: string) => Promise<void>;
  handleUpdate: (
    id: number,
    title: string,
    description: string,
    completed: boolean,
  ) => Promise<void>;
}

function CreateTodoFormPresentation({ ...props }: CreateTodoFormProps) {
  return (
    <div>
      <label>
        <p className='text-xl tracking-wide font-bold'>Title</p>
        <input
          type='text'
          placeholder='TODOを入力してください'
          className='border-2 rounded-md p-2 text-lg w-full'
          value={props.todo.title}
          onChange={(e) => props.setTitle(e.target.value)}
        />
        <p className='text-xl tracking-wide font-bold'>Description</p>
        <textarea
          placeholder='詳細を入力してください'
          className='border-2 rounded-md p-2 text-lg w-full'
          rows={4}
          value={props.todo.description}
          onChange={(e) => props.setDescription(e.target.value)}
        />
        <div className='text-right'>
          <button
            className={`${props.todo.mode === 'create' ? 'bg-blue-500' : 'bg-pink-500'}
             text-white py-2 px-4 rounded-md font-semibold tracking-wide my-4`}
            onClick={() =>
              props.todo.mode === 'create'
                ? props.handleCreate(props.todo.title, props.todo.description)
                : props.handleUpdate(
                    props.todo.id,
                    props.todo.title,
                    props.todo.description,
                    props.todo.completed,
                  )
            }
          >
            {props.todo.mode === 'create' ? 'Create' : 'Update'}
          </button>
        </div>
      </label>
    </div>
  );
}

export default function CreateTodoFormContainer() {
  const todo = useRecoilValue(todoState);
  const { setTitle, setDescription, resetTodo } = useTodo();
  const { mutate } = useTodoSWR();

  const handleCreate = async (title: string, description: string) => {
    const query = createTodo(title, description);
    await request(`${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`, query)
      .then(async () => {
        resetTodo();
        await mutate();
      })
      .catch((err) => console.error(err));
  };

  const handleUpdate = async (
    id: number,
    title: string,
    description: string,
    completed: boolean,
  ) => {
    const query = updateTodo(id, title, description, completed);
    await request(`${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`, query)
      .then(async () => {
        resetTodo();
        await mutate();
      })
      .catch((err) => console.error(err));
  };

  const data: CreateTodoFormProps = {
    todo,
    setTitle,
    setDescription,
    handleCreate,
    handleUpdate,
  };

  return <CreateTodoFormPresentation {...data} />;
}
