import express from "express";
import {
  createCollege,
  getColleges,
  getCollegeById,
  updateCollege,
  addCollegeGallery,
  updateCollegeLogo,
  getCollegeLogo, // 👈 ADD THIS
} from "../controllers/college.controller.js";

import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

// CREATE & READ
router.post("/", createCollege);
router.get("/", getColleges);

/* ===== SPECIFIC ROUTES FIRST ===== */

// GET LOGO
router.get("/:id/logo", getCollegeLogo);

// GET BY ID
router.get("/:id", getCollegeById);

// UPDATE DETAILS
router.patch("/:id", updateCollege);

// UPDATE LOGO
router.patch(
  "/:id/logo",
  upload.single("logo"),
  updateCollegeLogo
);

// UPDATE GALLERY
router.patch(
  "/:id/gallery",
  upload.array("images", 10),
  addCollegeGallery
);

export default router;
