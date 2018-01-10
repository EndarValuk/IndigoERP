// Loading external dependencies.
import { Context } from 'koa';
import { Body, Controller, Ctx, Delete, Get, Param, Post, Put } from 'routing-controllers';
import { Inject } from 'typescript-ioc';

// Loading local dependencies.
import { IHasRepositoryController } from '@indyecm/defs/interfaces';
import { QueryModel } from '@indyecm/defs/models';

import { User } from '@indyecm/api/datasource/models';
import { UsersRepository } from '@indyecm/api/datasource/repositories';

@Controller()
export class UsersController implements IHasRepositoryController<UsersRepository> {
  @Inject
  public _repository: UsersRepository;

  /**
   * Reading user by login
   */
  @Get('/user/:login')
  public async Read(@Ctx() context: Context, @Param('login') login: string): Promise<Context> {
    context.body = await this._repository.Read(login);
    return context;
  }

  /**
   * Reading all users
   */
  @Get('/users')
  public async ReadAll(@Ctx() context: Context): Promise<Context> {
    context.body = await this._repository.ReadAll();
    return context;
  }

  /**
   * Reading all users
   */
  @Post('/Users')
  public async ReadAllPost(@Ctx() context: Context, @Body() entry: QueryModel): Promise<Context> {
    context.body = await this._repository.ReadAll(entry);
    return context;
  }

  /**
   * Creating user
   */
  @Post('/user')
  public async Create(@Ctx() context: Context, @Body() entry: User): Promise<Context> {
    context.body = await this._repository.Create(entry);
    return context;
  }

  /**
   * Updating user
   * @param id User login
   * @param entry User object
   */
  @Put('/user/:id')
  public async Update(@Ctx() context: Context, @Param('id') id: string, @Body() entry: any): Promise<Context> {
    context.body = await this._repository.Update(entry);
    return context;
  }

  /**
   * Deleting user
   * @param id User login
   */
  @Delete('/user/:id')
  public async Delete(@Ctx() context: Context, @Param('id') id: string): Promise<Context> {
    context.body = await this._repository.Delete(id);
    return context;
  }
}
