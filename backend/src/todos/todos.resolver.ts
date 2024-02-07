import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Todo } from './models/todo.models';
import { SDK, Config } from '@corbado/node-sdk';

const projectID = process.env.CORBADO_PROJECT_ID;
const apiSecret = process.env.CORBADO_API_KEY;

const config = new Config(projectID, apiSecret);
const sdk = new SDK(config);

async function handleAuthenticated(shortSeesion: string) {
  const user = await sdk.sessions().getCurrentUser(shortSeesion);
  if (!user.isAuthenticated) {
    throw new Error('Please login to access this resource.');
  }
  return user;
}

@Resolver()
export class TodosResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Todo])
  async todos(
    @Args('shortSession')
    shortSession: string,
  ) {
    // Corabadoの認証を行う
    const user = await handleAuthenticated(shortSession);

    return this.prisma.todo.findMany({
      where: { userId: user.getID() },
      orderBy: { id: 'desc' },
    });
  }

  @Mutation(() => Todo)
  async createTodo(
    @Args('shortSession') shortSession: string,
    @Args('title') title: string,
    @Args('description') description: string,
  ) {
    // Corabadoの認証を行う
    const user = await handleAuthenticated(shortSession);
    const userId = user.getID();

    return this.prisma.todo.create({ data: { userId, title, description } });
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Args('id') id: number,
    @Args('shortSession') shortSession: string,
    @Args('title') title: string,
    @Args('description') description: string,
    @Args('completed') completed: boolean,
  ) {
    const user = await handleAuthenticated(shortSession);
    const userId = user.getID();

    return this.prisma.todo.update({
      where: { id, userId },
      data: { title, description, completed },
    });
  }

  @Mutation(() => Todo)
  async updateCompleted(
    @Args('id') id: number,
    @Args('shortSession') shortSession: string,
    @Args('completed') completed: boolean,
  ) {
    const user = await handleAuthenticated(shortSession);
    const userId = user.getID();

    return this.prisma.todo.update({
      where: { id, userId },
      data: { completed },
    });
  }

  @Mutation(() => Todo)
  async deleteTodo(
    @Args('id') id: number,
    @Args('shortSession') shortSession: string,
  ) {
    const user = await handleAuthenticated(shortSession);
    const userId = user.getID();

    return this.prisma.todo.delete({
      where: { id, userId },
    });
  }
}
