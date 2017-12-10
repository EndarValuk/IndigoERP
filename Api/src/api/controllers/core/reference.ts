import { Controller, Get, Param, OnUndefined } from "routing-controllers";

import { Envelope, Reference } from '@indigo/datasource/models';
import { errorWrapper } from '@indigo/handlers';

@Controller()
export class ReferenceController {
  /**
   * Reading all rows from table "reference_${level1}"
   */
  @Get("/reference/:level1")
  @OnUndefined(204)
  getAll1(@Param("level1") level1: string) {
    return this.readDatabase(level1);
  }

  @Get("/reference/:level1/:level2")
  @OnUndefined(204)
  getAll2(@Param("level1") level1: string, @Param("level2") level2: string) {
    return this.readDatabase(level1, level2);
  }

  @Get("/reference/:level1/:level2/:level3")
  @OnUndefined(204)
  getAll3(@Param("level1") level1: string, @Param("level2") level2: string, @Param("level3") level3: string) {
    return this.readDatabase(level1, level2, level3);
  }

  @Get("/reference/:level1/:level2/:level3/:level4")
  @OnUndefined(204)
  getAll4(@Param("level1") level1: string, @Param("level2") level2: string, @Param("level3") level3: string, @Param("level4") level4: string) {
    return this.readDatabase(level1, level2, level3, level4);
  }

  async readDatabase(level1: string, level2?: string, level3?: string, level4?: string) {
    try {
      let table = "reference_";
      if(level1) {
        table += `${level1}`;
      }
      if(level2) {
        table += `_${level2}`;
      }
      if(level3) {
        table += `_${level3}`;
      }
      if(level4) {
        table += `_${level4}`;
      }

      let q = `SELECT * FROM "core"."${table}"`;
      let data = await Reference.sequelize.query(q).all();
      return new Envelope(data[0], 1);
    }
    catch(e) {
      return errorWrapper(e);
    }
  }
}