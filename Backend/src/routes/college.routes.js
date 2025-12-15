import express from "express";
import {
  createCollege,
  getColleges,
  getCollegeById,
} from "../controllers/college.controller.js";

const router = express.Router();

router.post("/", createCollege);
router.get("/", getColleges);
router.get("/:id", getCollegeById);

export default router;
