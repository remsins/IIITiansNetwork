import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controllers/event.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();


router.post(
  "/",
  upload.single("banner"), // 👈 THIS IS THE KEY
  createEvent
);
router.patch("/:id", upload.single("banner"), updateEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.delete("/:id", deleteEvent); // ✅ ADD THIS

export default router;
