import { Request, Response } from "express";
import { Category, CategoryStore } from "../models/category";

const store = new CategoryStore();

export const create = async (req: Request, res: Response) => {
  try {
    const category: Category = {
      name: req.body.name,
    };

    const newCategory = await store.create(category);

    res.json(newCategory);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
