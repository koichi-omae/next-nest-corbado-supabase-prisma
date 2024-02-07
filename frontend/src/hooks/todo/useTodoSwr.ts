import useSWR from 'swr';
import { parseCookies } from 'nookies';
import { request } from 'graphql-request';

interface TodoListProps {
  todos: TodoProps[];
}

interface TodoProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const useTodoSWR = () => {
  const cookies = parseCookies();
  const fetcher = async (query: string) =>
    request<TodoListProps>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`, query);

  const { data, error, mutate } = useSWR(
    `{
        todos(shortSession: "${cookies.cbo_short_session}") {
            id
            title
            description
            completed
        }
    }`,
    fetcher,
  );

  return {
    todos: data?.todos,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
