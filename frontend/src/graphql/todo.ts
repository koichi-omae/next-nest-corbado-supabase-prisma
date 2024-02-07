import { parseCookies } from 'nookies';

const cookies = parseCookies();
const shortSeesion = cookies.cbo_short_session;
export const createTodo = (title: string, description: string) => {
  const query = `
        mutation { 
            createTodo (
                shortSession: "${shortSeesion}", 
                title: "${title}", 
                description: "${description}"
                ) 
            { 
                id, 
                title, 
                description, 
                completed 
            } 
        }
    `;

  return query;
};

export const updateTodo = (id: number, title: string, description: string, completed: boolean) => {
  const query = `
        mutation { 
            updateTodo (
                shortSession: "${shortSeesion}", 
                id: ${id}, 
                title: "${title}", 
                description: "${description}", 
                completed: ${completed}
                ) 
            { 
                id, 
                title, 
                description, 
                completed 
            } 
        }
    `;

  return query;
};

export const updateCompleted = (id: number, completed: boolean) => {
  const query = `
            mutation { 
                updateCompleted (
                    shortSession: "${shortSeesion}", 
                    id: ${id}, 
                    completed: ${completed}
                    ) 
                { 
                    id, 
                    title, 
                    description, 
                    completed 
                } 
            }
        `;

  return query;
};

export const deleteTodo = (id: number) => {
  const query = `
            mutation { 
                deleteTodo (
                    shortSession: "${shortSeesion}", 
                    id: ${id}
                    ) 
                { 
                    id, 
                    title, 
                    description, 
                    completed 
                } 
            }
        `;

  return query;
};
