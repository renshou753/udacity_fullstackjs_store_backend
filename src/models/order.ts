// @ts-ignore
import Client from "../database";

export type Order = {
  user_id: number;
  status: string;
};

export class OrderStore {
  async current_order(id: string): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      console.log(id);
      const sql = `
      SELECT a.*, b.user_id FROM public."orderProduct" a left join public.order b
      on a.order_id = b.id
      WHERE b.user_id=($1)
      order by order_id
      `;

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async complete_order(id: string): Promise<Order> {
    try {
      const sql = `
      SELECT a.order_id, a.product_id, a.quantity, b.user_id, b.status FROM public."orderProduct" a left join public.order b
      on a.order_id = b.id
      WHERE b.user_id=($1) and b.status='complete'
      order by order_id
      `;
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
        "INSERT INTO public.order (user_id, status) VALUES($1, $2) RETURNING user_id, status";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [b.user_id, b.status]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }
}
