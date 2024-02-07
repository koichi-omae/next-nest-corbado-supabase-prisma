import TodoListsContainer from '../views/TodoList';

export interface TodoContainerProps {
  userFullName: string | null;
  handleLogout: () => void;
}

export default function TodoContainer({ ...props }: TodoContainerProps) {
  return (
    <div className=''>
      <h1 className='text-5xl font-bold tracking-wide mb-8'>{props.userFullName}のTODOリスト</h1>
      <TodoListsContainer />
      <div className='text-center mt-4'>
        <button
          className='bg-red-500 text-white py-2 px-4 rounded-md font-semibold tracking-wide'
          onClick={props.handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
