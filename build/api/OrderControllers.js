"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.complete_order = exports.current_order = void 0;
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
const current_order = async (req, res) => {
    const orders = await store.current_order(req.params.id);
    res.json(orders);
};
exports.current_order = current_order;
const complete_order = async (req, res) => {
    const order = await store.complete_order(req.params.id);
    res.json(order);
};
exports.complete_order = complete_order;
