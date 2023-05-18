import express from "express";
const rootRouter = express.Router();

import product from "./modules/product";
import user from "./modules/user";
import order from "./modules/order";
import category from "./modules/category";

rootRouter.use("/products", product);
rootRouter.use("/users", user);
rootRouter.use("/orders", order);
rootRouter.use("/categories", category);

export default rootRouter;
