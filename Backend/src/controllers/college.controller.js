import College from "../models/College.model.js";
import cloudinary from "../config/cloudinary.js";

/* =========================
   CREATE COLLEGE
========================= */
export const createCollege = async (req, res) => {
  try {
    const college = await College.create(req.body);
    res.status(201).json(college);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* =========================
   GET ALL COLLEGES
========================= */
export const getColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET COLLEGE BY ID
========================= */
export const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    res.json(college);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   UPDATE COLLEGE (NO NAME CHANGE)
========================= */
export const updateCollege = async (req, res) => {
  try {
    if (req.body.name) {
      return res.status(400).json({
        message: "College name cannot be updated",
      });
    }

    const allowedFields = ["description", "website"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const college = await College.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    res.json(college);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   UPDATE COLLEGE LOGO (UPLOAD)
========================= */
export const updateCollegeLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Logo file is required" });
    }

    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "colleges/logos",
    });

    // Optional: delete old logo
    if (college.logo?.public_id) {
      await cloudinary.uploader.destroy(college.logo.public_id);
    }

    college.logo = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    await college.save();

    res.status(200).json({
      message: "College logo updated successfully",
      logo: college.logo,
    });
  } catch (error) {
    console.error("updateCollegeLogo error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* =========================
   ADD COLLEGE GALLERY
========================= */
export const addCollegeGallery = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images are required" });
    }

    const uploads = await Promise.all(
      req.files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: "colleges/gallery",
        })
      )
    );

    const images = uploads.map((img) => ({
      public_id: img.public_id,
      url: img.secure_url,
    }));

    const college = await College.findByIdAndUpdate(
      req.params.id,
      { $push: { gallery: { $each: images } } },
      { new: true }
    );

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    res.json(college);
  } catch (error) {
    console.error("addCollegeGallery error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET COLLEGE LOGO (READ)
========================= */
export const getCollegeLogo = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    if (!college.logo || !college.logo.url) {
      return res.status(404).json({ message: "Logo not available" });
    }

    return res.redirect(college.logo.url);
  } catch (error) {
    console.error("getCollegeLogo error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
