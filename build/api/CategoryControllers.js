"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const category_1 = require("../models/category");
const store = new category_1.CategoryStore();
const create = async (req, res) => {
    try {
        const category = {
            name: req.body.name,
        };
        const newCategory = await store.create(category);
        res.json(newCategory);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.create = create;
