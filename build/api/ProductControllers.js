"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.product_popular = exports.product_by_category = exports.create = exports.show = exports.index = void 0;
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
exports.index = index;
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
exports.show = show;
const create = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category_id: req.body.category_id,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.create = create;
const product_by_category = async (req, res) => {
    const products = await store.product_by_category(req.params.category);
    res.json(products);
};
exports.product_by_category = product_by_category;
const product_popular = async (_req, res) => {
    const products = await store.product_popular();
    res.json(products);
};
exports.product_popular = product_popular;
