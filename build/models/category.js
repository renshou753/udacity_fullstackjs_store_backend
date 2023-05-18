"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class CategoryStore {
    async create(b) {
        try {
            const sql = "INSERT INTO public.category (name) VALUES($1) RETURNING name";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [b.name]);
            const category = result.rows[0];
            conn.release();
            return category;
        }
        catch (err) {
            throw new Error(`Could not add new category. Error: ${err}`);
        }
    }
}
exports.CategoryStore = CategoryStore;
