import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index";

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // filter out public url path
  const { publicPath } = config;
  if (publicPath.some((item) => item.test(req.url))) {
    next();
    return;
  }

  try {
    const auth = req.headers.authorization;
    if (auth == undefined) {
      res.status(401).send("No token provided");
      return;
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Error processing jwt");
  }
};

export const createToken = (id: number): string => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET as string);
};
