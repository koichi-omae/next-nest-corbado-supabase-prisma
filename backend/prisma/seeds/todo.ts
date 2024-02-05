import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const todos = [
  {
    title: 'Todo 1',
    completed: false,
  },
  {
    title: 'Todo 2',
    completed: true,
  },
  {
    title: 'Todo 3',
    completed: false,
  },
];

async function seedTodos() {
  for (const todo of todos) {
    await prisma.todo.create({
      data: todo,
    });
    console.log(`Created new dog: (ID: ${todo.title}) ${todo.completed}`);
  }
}

export default seedTodos;
