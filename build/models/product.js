"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "SELECT name, price, category_id FROM product";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT name, price, category_id FROM product WHERE id=($1)";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async create(b) {
        try {
            const sql = "INSERT INTO product (name, price, category_id) VALUES($1, $2, $3) RETURNING name, price, category_id";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [b.name, b.price, b.category_id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not add new product. Error: ${err}`);
        }
    }
    async product_by_category(category) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = `
      SELECT p.*, c.name FROM product p left join category c
      on p.category_id = c.id
      WHERE c.name =($1)
      `;
            const result = await conn.query(sql, [category]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get product by specified category. Error: ${err}`);
        }
    }
    async product_popular() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = `
      SELECT p.name, sum(o.quantity) as quantity_sum FROM "order" o
      left join product p
      on o.product_id = p.id
      group by p.name
      order by quantity_sum desc
      limit 5     
      `;
            const res = await conn.query(sql);
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get popular product. Error: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
