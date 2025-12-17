import express from "express";
import {upload} from "../middlewares/upload.middleware.js";
import {
  createClub,
  getClubs,
  getClubById,
} from "../controllers/club.controller.js";

const router = express.Router();

router.post("/", upload.single("logo"), createClub);
router.get("/", getClubs);
router.get("/:id", getClubById);

export default router;
