import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Todo } from './models/todo.models';

@Resolver()
export class TodosResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Todo])
  async todos() {
    return this.prisma.todo.findMany();
  }

  @Mutation(() => Todo)
  async createTodo(
    @Args('title') title: string,
    @Args('description') description: string,
  ) {
    return this.prisma.todo.create({ data: { title, description } });
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Args('id') id: number,
    @Args('title') title: string,
    @Args('description') description: string,
    @Args('completed') completed: boolean,
  ) {
    return this.prisma.todo.update({
      where: { id },
      data: { title, description, completed },
    });
  }

  @Mutation(() => Todo)
  async deleteTodo(@Args('id') id: number) {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
