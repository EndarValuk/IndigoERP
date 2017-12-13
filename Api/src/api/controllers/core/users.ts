import { Inject } from "typescript-ioc";
import { Controller, Param, Body, Get, Post, Put, Delete, OnUndefined } from "routing-controllers";

import { BaseController } from '@indigo/api/controllers/interfaces';
import { User } from '@indigo/datasource/models';
import { UsersRepository } from '@indigo/datasource/repositories';

@Controller()
export class UsersController implements BaseController<UsersRepository> {
  @Inject
  _repository: UsersRepository;

  /**
   * Reading user by login
   */
  @Get("/users/:login")
  @OnUndefined(204)
  Read(@Param("login") login: string): any {
    return this._repository.Read(login);
  }

  /**
   * Reading all users
   */
  @Get("/users")
  @OnUndefined(204)
  ReadAll(): any {
    return this._repository.ReadAll();
  }

  /**
   * Creating user
   */
  @Post("/users")
  Create(@Body() entry: User): any {
    return this._repository.Create(entry);
  }

  /**
   * Updating user
   * @param id User login
   * @param entry User object
   */
  @Put("/users/:id")
  Update(@Param("id") id: string, @Body() entry: any): any {
    return this._repository.Update(entry);
  }

  /**
   * Deleting user
   * @param id User login
   */
  @Delete("/users/:id")
  Delete(@Param("id") id: string): any {
    return this._repository.Delete(id);
  }
}