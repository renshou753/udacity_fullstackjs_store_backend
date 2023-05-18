import express from "express";
const router = express.Router();

import { create } from "../../api/CategoryControllers";

router.post("/", create);

export default router;
