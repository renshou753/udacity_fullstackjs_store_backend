import express from "express";
import { verifyAuthToken } from "../../utils/auth";
const router = express.Router();

import { index, show, create, authenticate } from "../../api/UserControllers";

router.get("/", verifyAuthToken, index);
router.get("/:id", verifyAuthToken, show);
router.post("/", create);
router.post("/login", authenticate);

export default router;
