import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, UserStore } from "../models/user";

const store = new UserStore();

export const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

export const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};

export const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };

    const newUser = await store.create(user);

    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const authenticate = async (req: Request, res: Response) => {
  try {
    const user = await store.authenticate(req.body.id, req.body.password);

    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
