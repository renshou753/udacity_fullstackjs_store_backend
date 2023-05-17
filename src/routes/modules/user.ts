import express from "express";
const router = express.Router();

import { index, show, create, authenticate } from "../../api/UserControllers";

router.get("/", index);
router.get("/:id", show);
router.post("/", create);
router.post("/login", authenticate);

export default router;
