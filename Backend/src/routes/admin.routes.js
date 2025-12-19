import express from "express";
import { createAdmin, loginAdmin, getMe } from "../controllers/admin.controller.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.post("/create", createAdmin); // TEMPORARY

router.post("/login", loginAdmin);
router.get("/me", adminAuth, getMe);

export default router;
