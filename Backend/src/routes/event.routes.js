import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);

export default router;
