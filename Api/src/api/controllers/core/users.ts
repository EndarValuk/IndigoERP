// Loading external dependencies.
import { Inject } from "typescript-ioc";
import { Context } from 'koa';
import { Controller, Param, Body, Get, Post, Put, Delete, Ctx } from "routing-controllers";
// Loading local dependencies.
import { IHasRepositoryController } from '@indy/api/controllers/interfaces';
import { User } from '@indy/datasource/models';
import { UsersRepository } from '@indy/datasource/repositories';

@Controller()
export class UsersController implements IHasRepositoryController<UsersRepository> {
  @Inject
  _repository: UsersRepository;

  /**
   * Reading user by login
   */
  @Get("/users/:login")
  async Read(@Ctx() context: Context, @Param("login") login: string): Promise<Context> {
    context.body = await this._repository.Read(login);
    return context;
  }

  /**
   * Reading all users
   */
  @Get("/users")
  async ReadAll(@Ctx() context: Context): Promise<Context> {
    context.body = await this._repository.ReadAll();
    return context;
  }

  /**
   * Creating user
   */
  @Post("/users")
  async Create(@Ctx() context: Context, @Body() entry: User): Promise<Context> {
    context.body = await this._repository.Create(entry);
    return context;
  }

  /**
   * Updating user
   * @param id User login
   * @param entry User object
   */
  @Put("/users/:id")
  async Update(@Ctx() context: Context, @Param("id") id: string, @Body() entry: any): Promise<Context> {
    context.body = await this._repository.Update(entry);
    return context;
  }

  /**
   * Deleting user
   * @param id User login
   */
  @Delete("/users/:id")
  async Delete(@Ctx() context: Context, @Param("id") id: string): Promise<Context> {
    context.body = await this._repository.Delete(id);
    return context;
  }
}