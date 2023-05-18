// @ts-ignore
import Client from "../database";

export type Category = {
  name: string;
};

export class CategoryStore {
  async create(b: Category): Promise<Category> {
    try {
      const sql =
        "INSERT INTO public.category (name) VALUES($1) RETURNING name";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [b.name]);

      const category = result.rows[0];

      conn.release();

      return category;
    } catch (err) {
      throw new Error(`Could not add new category. Error: ${err}`);
    }
  }
}
