import express from "express";
import { verifyAuthToken } from "../../utils/auth";
const router = express.Router();

import { current_order, complete_order } from "../../api/OrderControllers";

router.get("/current/users/:id", verifyAuthToken, current_order);
router.get("/completed/users/:id", verifyAuthToken, complete_order);

export default router;
