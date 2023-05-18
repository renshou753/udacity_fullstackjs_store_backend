import { Request, Response } from "express";
import { OrderStore } from "../models/order";

const store = new OrderStore();

export const current_order = async (req: Request, res: Response) => {
  const orders = await store.current_order(req.params.id);
  res.json(orders);
};

export const complete_order = async (req: Request, res: Response) => {
  const order = await store.complete_order(req.params.id);
  res.json(order);
};
