// @ts-ignore
import Client from '../database'


export type Product = {
    name: string;
    price: number;
    category_id: number;
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM product'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get books. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
    const sql = 'SELECT * FROM product WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find book ${id}. Error: ${err}`)
    }
  }

  async create(b: Product): Promise<Product> {
      try {
    const sql = 'INSERT INTO product (name, price, category_id) VALUES($1, $2, $3) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn
        .query(sql, [b.name, b.price, b.category_id])

    const product = result.rows[0]

    conn.release()

    return product
      } catch (err) {
          throw new Error(`Could not add new book. Error: ${err}`)
      }
  }

  async product_by_category(category: string): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM category WHERE name=($1)'

      const res = await conn.query(sql, [category])
      const category_id = res.rows[0].id

      const sql_product = `SELECT * FROM product WHERE category_id=($1)`

      const result = await conn.query(sql_product, [category_id])

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get product by specified category. Error: ${err}`)
    }
  }

}