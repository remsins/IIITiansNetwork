import express from "express";
import {
  createClub,
  getClubs,
  getClubById,
} from "../controllers/club.controller.js";

const router = express.Router();

router.post("/", createClub);
router.get("/", getClubs);
router.get("/:id", getClubById);

export default router;
