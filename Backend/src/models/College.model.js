import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    // MongoDB auto-creates _id

    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    logo: {
      type: String, // URL to logo image
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    gallery: [
      {
        type: String, // image URLs
      },
    ],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false, // only createdAt as requested
    },
  }
);

export default mongoose.model("College", collegeSchema);
