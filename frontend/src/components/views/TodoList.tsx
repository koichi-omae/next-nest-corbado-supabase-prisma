import { useTodoSWR } from '@/hooks/todo/useTodoSwr';
import { request } from 'graphql-request';
import { parseCookies } from 'nookies';
interface TodoListProps {
  todos?: TodoProps[];
  handleUpdate?: (id: string) => Promise<void>;
  handleDelete?: (id: string) => Promise<void>;
}

interface TodoProps {
  id: string;
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
        >
          <p className='text-center text-xl tracking-wide font-semibold'>{todo.title}</p>
          <div>
            <span
              onClick={() => props.handleUpdate?.(todo.id)}
              className={`${todo.completed ? 'bg-pink-500 ' : 'bg-gray-400 '} text-white px-2 py-1 rounded-md text-sm tracking-wide`}
            >
              {todo.completed ? 'Completed' : 'Todo'}
            </span>
            <span
              className='text-xl hover:opacity-75 hover:cursor-pointer ml-4'
              onClick={() => {
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
  const cookies = parseCookies();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const handleUpdate = async (id: string) => {
    const todo = todos?.find((todo) => todo.id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };

      await request(
        'http://localhost:8080/graphql',
        `mutation { updateTodo (shortSession: "${cookies.cbo_short_session}", id: ${id}, title: "${todo.title}", description: "${todo.description}" completed: ${!todo.completed}) { id, title, description, completed } }`,
      )
        .then(async (data) => {
          console.log(data);
          await mutate();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deleteTodo = async (id: string) => {
    await request(
      'http://localhost:8080/graphql',
      `mutation { deleteTodo (shortSession: "${cookies.cbo_short_session}", id: ${id}) { id, title, description, completed } }`,
    )
      .then(async (data) => {
        console.log(data);
        await mutate();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const data: TodoListProps = {
    todos,
    handleUpdate,
    handleDelete: deleteTodo,
  };

  return <TodoListPresentation {...data} />;
}
