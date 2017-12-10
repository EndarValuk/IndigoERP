import { Controller, Param, Body, Get, Post, Put, Delete, OnUndefined } from "routing-controllers";

import { errorWrapper } from '@indigo/handlers';
import { Envelope, User, ObjectProperty } from '@indigo/datasource/models';

@Controller()
export class UsersController {
  /**
   * Reading all users
   */
  @Get("/users")
  @OnUndefined(204)
  async getAll() {
    try {
      let users = await User.all();
      return new Envelope(users, 1);
    }
    catch(e) {
      return errorWrapper(e);
    }
  }

  /**
   * Reading user by login
   */
  @Get("/users/:login")
  @OnUndefined(204)
  async getOne(@Param("login") login: string) {
    let predicate = {
      where: { login: login }
    };

    try {
      let user = await User.findOne(predicate);
      if(user) {
        user.setDataValue("object_properties", await ObjectProperty.all({ where: { ref_object: user.id, ref_object_type: 5 } }));
        return new Envelope(user, 1);
      }
      return undefined;
    }
    catch(e) {
      return errorWrapper(e);
    }
  }

  /**
   * Creating user
   */
  @Post("/users")
  async post(@Body() entry: User) {
    let q =  {
      query: `SELECT * FROM "core"."create_user"(?,?,?,?,?)`,
      values: [
        entry.login,
        entry.name,
        entry.patronymic,
        entry.surname,
        entry.password
      ]
    };

    try {
      let u = await User.sequelize.query(q);
      return new Envelope(u[0][0], 1);
    }
    catch(e) {
      return errorWrapper(e);
    }
  }

  @Put("/users/:id")
  put(@Param("id") id: number, @Body() user: any) {
      return "Updating a user...";
  }

  @Delete("/users/:id")
  remove(@Param("id") id: number) {
      return "Removing user...";
  }
}