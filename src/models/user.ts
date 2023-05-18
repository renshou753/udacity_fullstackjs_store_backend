// @ts-ignore
import Client from "../database";
import bcrypt from "bcrypt";

export type User = {
  first_name: string;
  last_name: string;
  password: string;
};

const { PEPPER, SALTROUND } = process.env;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM public.user";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM public.user WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(b: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO public.user (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *";

      const hash = bcrypt.hashSync(
        b.password + PEPPER,
        parseInt(SALTROUND as string)
      );

      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [b.first_name, b.last_name, hash]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user. Error: ${err}`);
    }
  }

  async authenticate(id: string, password: string): Promise<User | null> {
    // @ts-ignore
    const conn = await Client.connect();
    const sql = "SELECT id, password FROM public.user WHERE id=($1)";

    const result = await conn.query(sql, [id]);

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + PEPPER, user.password)) {
        return user;
      }
    }

    return null;
  }
}
