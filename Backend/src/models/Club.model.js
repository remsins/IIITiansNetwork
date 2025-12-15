import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    // MongoDB auto-creates _id

    name: {
      type: String,
      required: true,
      trim: true,
    },

    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },

    logo: {
      type: String, // URL to club logo
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    leads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

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

export default mongoose.model("Club", clubSchema);
