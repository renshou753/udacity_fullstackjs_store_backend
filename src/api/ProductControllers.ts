import { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

export const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

export const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
};

export const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category_id,
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const product_by_category = async (req: Request, res: Response) => {
  const products = await store.product_by_category(req.params.category);
  res.json(products);
};

export const product_popular = async (_req: Request, res: Response) => {
  const products = await store.product_popular();
  res.json(products);
};
