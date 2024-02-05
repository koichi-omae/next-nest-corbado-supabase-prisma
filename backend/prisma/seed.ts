import { PrismaClient } from '@prisma/client';
import seedTodos from './seeds/todo';

const prisma = new PrismaClient();

async function main() {
  await seedTodos();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
