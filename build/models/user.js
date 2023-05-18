"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { PEPPER, SALTROUND } = process.env;
class UserStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM public.user";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM public.user WHERE id=($1)";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async create(b) {
        try {
            const sql = "INSERT INTO public.user (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *";
            const hash = bcrypt_1.default.hashSync(b.password + PEPPER, parseInt(SALTROUND));
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [b.first_name, b.last_name, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`);
        }
    }
    async authenticate(id, password) {
        // @ts-ignore
        const conn = await database_1.default.connect();
        const sql = "SELECT id, password FROM public.user WHERE id=($1)";
        const result = await conn.query(sql, [id]);
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + PEPPER, user.password)) {
                return user;
            }
        }
        return null;
    }
}
exports.UserStore = UserStore;
