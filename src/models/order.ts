// @ts-ignore
import Client from "../database";

export type Order = {
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
};

export class OrderStore {
  async current_order(id: string): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      console.log(id);
      const sql = "SELECT * FROM public.order WHERE user_id=($1)";

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async complete_order(id: string): Promise<Order> {
    try {
      const sql = `SELECT * FROM public.order WHERE user_id=($1) and status='complete'`;
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order for user ${id}. Error: ${err}`);
    }
  }

  async create(b: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO public.order (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING product_id, quantity, user_id, status";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        b.product_id,
        b.quantity,
        b.user_id,
        b.status,
      ]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }
}
